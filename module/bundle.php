<?php

interface BundleInterface
{
    
    /*
     * Export source code.
     *
     * @access Public
     *
     * @return Void
     */
    public function export(): Void;
    
}

abstract class AoE
{
    
    public function reader( String $file, Bool $decode = False ): Object | String | False
    {
        $fread = "";
        
        if( file_exists( $file ) )
        {
            // Opens file or URL.
            $fopen = fopen( $file, "r" );
            
            // Binary-safe file read.
            $fread = fread( $fopen, 10000000 );
            
            // Closes an open file pointer.
            fclose( $fopen );
            
            if( $decode )
            {
                return( json_decode( $fread ) );
            }
        }
        
        return( $fread );
    }
    
    public function writer( String $file, String $data, Bool $encode = False ): String
    {
        if( $encode )
        {
            $data = json_encode( $data, JSON_PRETTY_PRINT );
        }
        if( $this->reader( $file ) !== ( $data = preg_replace( "/\t/", "\x20\x20\x20\x20", $data ) ) )
        {
            // Opens file or URL.
            $fopen = fopen( $file, "w" );
            
            // Binary-safe file write.
            fwrite( $fopen, $data );
            
            // Closes an open file pointer.
            fclose( $fopen );
            
            echo f( "Updated {}\n", $file );
        }
        return( $data );
    }
    
    /*
     * Scanning directory.
     *
     * @access Public
     *
     * @params String $path
     *
     * @return Array|False
     */
    public function scandir( String $path ): Array | False
    {
        $result = False;
        
        // Tells whether the pathname is a directory.
        if( is_dir( $path ) )
        {
            $result = [];
            
            // List files and directories inside the specified path.
            $scandir = scandir( $path );
            
            // Computes the difference of arrays.
            $scandir = array_diff( $scandir, [ ".", ".." ] );
            
            foreach( $scandir As $i => $file )
            {
                // Looping
                $ref = $this->scandir( f( "{}/{}", $path, $file ) );
                
                // If $file is directory.
                if( $ref !== False )
                {
                    $result[$file] = $ref;
                } else {
                    $result[] = $file;
                }
            }
            
            // Sort an array by key in ascending order.
            ksort( $result );
            
        }
        
        return( $result );
    }
    
}

final class BundleAPI extends AoE
{
    
    /*
     * Configuration for native source code.
     *
     * @access Public ^Readonly
     *
     * @values Object
     */
    public Readonly Object $builtin;
    
    /*
     * Configuration for the required code.
     *
     * @access Public ^Readonly
     *
     * @values Object
     */
    public Readonly Object $require;
    
    /*
     * Onload configuration.
     *
     * @access Public ^Readonly
     *
     * @values Object
     */
    public Readonly Object $onloads;
    
    public function __construct()
    {
        
        // Take configuration as object.
        $this->onloads = $this->reader( "package.json", True )->onloads;
        
        // ....
        $this->builtin = $this->onloads->builtin;
        
        // ....
        $this->require = $this->onloads->require;
        
    }
    
}

final class Bundle extends AoE implements BundleInterface
{
    
    public Readonly BundleAPI $api;
    public Readonly String $pattern;
    
    public function __construct()
    {
        $this->api = new BundleAPI;
        $this->pattern = "/\n([\t|\s]*)(\<(required)\s*\/\>)/m";
    }
    
    /*
     * @inherit BundleInterface
     *
     */
    public function export(): Void
    {
        
        // Export the builtin script source code.
        $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->builtin->script ), $this->exportBuiltin( $this->api->builtin->script ) );
        
        // Export the require script source code.
        $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->require->script ), $this->exportRequire( $this->api->require->script ) );
        
        // Export the builtin style source code.
        $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->builtin->styles ), $this->exportBuiltin( $this->api->builtin->styles ) );
        
        // Export the require style source code.
        $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->require->styles ), $this->exportRequire( $this->api->require->styles ) );
        
    }
    
    protected function exportBuiltin( Object $config ): String
    {
        $i = 0;
        $import = "";
        
        foreach( $config->module->import As $group => $list )
        {
            if( $group === "." )
            {
                $group = $config->source;
            } else {
                $group = f( "{}/{}", $config->source, $group );
            }
            $import .= $this->readls( $group, $list );
            $import .= "\n";
            $i++;
        }
        if( property_exists( $config->module, "main" ) )
        {
            return( preg_replace_callback( $this->pattern, subject: $this->reader( f( "{}/{}", $config->source, $config->module->main ) ), callback: function( $m ) use( $import )
            {
                return( preg_replace( "/\n/", $m[1] , $import ) );
            }));
        }
        return( $import );
    }
    
    protected function exportRequire( Object $config ): String
    {
        $import = "";
        $counts = count( $config->module );
        
        for( $i = 0; $i < $counts; $i++ )
        {
            if( $this->api->onloads->environment == "development" )
            {
                $import .= $this->reader( f( "{}/{}", $config->source, $config->module[$i]->devl !== Null ? $config->module[$i]->devl : $config->module[$i]->prod ) );
            } else {
                $import .= $this->reader( f( "{}/{}", $config->source, $config->module[$i]->prod !== Null ? $config->module[$i]->prod : $config->module[$i]->devl ) );
            }
            if( $i +1 !== $counts )
            {
                $import .= "\n";
            }
        }
        return( $import );
    }
    
    protected function readls( String $group, Array $list ): String
    {
        $bundle = "";
        
        if( ( $counts = count( $list ) ) === 0 )
        {
            $counts = count( $list = $this->scandir( $group ) );
        }
        for( $i = 0; $i < $counts; $i++ )
        {
            $bundle .= $this->reader( f( "{}/{}", $group, $list[$i] ) );
            
            if( $i +1 !== $counts )
            {
                $bundle .= "\n\n";
            }
        }
        return( $bundle );
    }
    
}


/*
 * String formater.
 *
 * @params String $string
 * @params String $format
 *
 * @return String
 */
function f( String $string, Mixed ...$format ): String
{
    return( preg_replace_callback( "/\{([^\}]*)\}/", subject: $string, callback: function() use( $format )
    {
        // Statically Variable
        static $i = 0;
        
        if( isset( $format[$i] ) )
        {
            // Replace by $i.
            return( $format[$i++] );
        }
    }));
}

$i = 0;

system( "clear" );

while( True )
{
    echo f( "[{}] => {}\n", time(), $i );
    
    $bundle = new Bundle;
    $bundle->export();
    
    sleep( 1 );
    $i++;
}

?>