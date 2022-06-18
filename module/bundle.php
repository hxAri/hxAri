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
        // Readed file.
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
            
            $this->console( __METHOD__, "Writing", str_replace( [ "/sdcard/project/personal/coding/JS/", "/sdcard/project/personal/module/" ], "", "Updating $file" ) );
            
        }
        
        return( $data );
    }
    
    public function console( String $method, String $execute, String $message ): Void
    {
        // Explode strings.
        $explode = explode( "::", $method );
        
        // Console Structure.
        echo( f( "\e[1;32m{} \e[1;37m{} \e[1;38;5;214m{}\n", $execute, $message, date( "H:i.s" ) ) );
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
    
    public function __construct( DateTime $dT )
    {
        // Set DateTime instance class.
        $this->dT = $dT;
        
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
    
    public function __construct( DateTime $dT )
    {
        // Set BundleAPI instance class.
        $this->api = new BundleAPI( $dT );
        
        // Set Pattern replace.
        $this->pattern = "/\n([\t|\s]*)(\<(required)\s*\/\>)/m";
        
        // Set DateTime instance class.
        $this->dT = $dT;
        
        $this->console( __METHOD__, "Start", "Starting export." );
    }
    
    /*
     * @inherit BundleInterface
     *
     */
    public function export(): Void
    {
        
        // Iteration start.
        $i = 0;
        
        while( True )
        {
            
            // Export the builtin script source code.
            $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->builtin->script ), $this->exportBuiltin( $this->api->builtin->script ) );
            
            // Export the require script source code.
            $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->require->script ), $this->exportRequire( $this->api->require->script ) );
            
            // Export the builtin style source code.
            $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->builtin->styles ), $this->exportBuiltin( $this->api->builtin->styles ) );
            
            // Export the require style source code.
            $this->writer( f( "{}/{}", $this->api->onloads->onsaved->source, $this->api->onloads->onsaved->require->styles ), $this->exportRequire( $this->api->require->styles ) );
            
            sleep( 1 );
            $i++;
        }
        
    }
    
    protected function exportBuiltin( Object $config ): String
    {
        // Iteration start.
        $i = 0;
        
        // File imported stack.
        $import = "";
        
        foreach( $config->module->import As $group => $list )
        {
            // If on the same source.
            if( $group === "." )
            {
                $group = $config->source;
            } else {
                
                // Format string group with source.
                $group = f( "{}/{}", $config->source, $group );
            }
            
            // Read per group.
            $import .= $this->readls( $group, $list );
            
            // New line.
            $import .= "\n";
            
            $i++;
        }
        
        // If the code has a main file.
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
        
        // File imported stack.
        $import = "";
        
        for( $i = 0; $i < count( $config->module ); $i++ )
        {
            
            // If the environment is on development.
            if( $this->api->onloads->environment == "development" )
            {
                // Read non-minimized files ( If any ).
                $import .= $this->reader( f( "{}/{}", $config->source, $config->module[$i]->devl !== Null ? $config->module[$i]->devl : $config->module[$i]->prod ) );
            } else {
                
                // Read minimized files ( If any ).
                $import .= $this->reader( f( "{}/{}", $config->source, $config->module[$i]->prod !== Null ? $config->module[$i]->prod : $config->module[$i]->devl ) );
            }
            
            // Adding new line.
            if( $this->api->onloads->environment !== "production" )
            {
                if( $i +1 !== count( $config->module ) )
                {
                    $import .= "\n";
                }
            }
        }
        return( $import );
    }
    
    protected function readls( String $group, Array $list ): String
    {
        
        // Iteration start.
        $i = 0;
        
        // File readed stack.
        $bundle = "";
        
        // Scanning group directory.
        $scanls = $this->scandir( $group );
        
        foreach( $list As $k => $file )
        {
            // Reading file.
            $bundle .= $this->reader( f( "{}/{}", $group, $file ) );
            
            // Adding new line.
            if( $this->api->onloads->environment !== "production" )
            {
                if( $k +1 !== count( $list ) )
                {
                    $bundle .= "\n\n";
                }
            }
            
            // Remove file name from scan list.
            unset( $scanls[array_search( $file, $scanls )] );
        }
        
        foreach( $scanls As $k => $file )
        {
            // If the file is a directory.
            if( is_array( $file ) )
            {
                // Remove directory.
                unset( $scanls[$k] );
            } else {
                
                if( $file === $this->api->builtin->script->module->main ||
                    $file === $this->api->builtin->styles->module->main )
                {
                    continue;
                }
                
                // Reading file.
                $bundle .= $this->reader( f( "{}/{}", $group, $file ) );
                
                // Adding new line.
                if( $this->api->onloads->environment !== "production" )
                {
                    if( $i +1 !== count( $scanls ) )
                    {
                        $bundle .= "\n\n";
                    }
                }
            }
            $i++;
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
    return( preg_replace_callback( "/\{\}/", subject: $string, callback: function() use( $format )
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
date_default_timezone_set( "Asia/Tokyo" );

$dTZ = new DateTimeZone( "Asia/Tokyo" );
$dT = new DateTime( "now", $dTZ );
$bd = new Bundle( $dT );
$bd->export();

?>