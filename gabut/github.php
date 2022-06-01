<?php

/*
 * Project importer program.
 *
 * @author hxAri
 * @create 01.06-2022
 * @update 02.06-2022
 * @github https://github.com/hxAri/{hxAri}
 *
 * All source code license under MIT.
 * Please see the MIT documentation for details.
 *
 * Copyright (c) 2022 hxAri <ari160824@gmail.com>
 *
 */
final class Github
{
    
    /*
     * Storage target for the project to be imported.
     *
     * @access Protected: Static
     *
     * @values String
     */
    protected const TARGET = "/data/data/com.termux/files/home/Github";
    
    /*
     * Source of storage for the project to be imported.
     *
     * @access Protected: Static
     *
     * @values String
     */
    protected const SOURCE = "/sdcard/project/personal/coding";
    
    public static function __init__( String $project )
    {
        if( is_dir( self::TARGET ) === False )
        {
            mkdir( self::TARGET );
        }
        
        self::import( self::slice( $project ), $project, self::scanls( self::format( "{}/{}", self::SOURCE, $project ) ) );
        self::delete( self::slice( $project ), $project, self::scanls( self::format( "{}/{}", self::TARGET, self::slice( $project ) ) ) );
    }
    
    /*
     * String formater.
     *
     * @access Protected: Static
     *
     * @params String $string
     * @params String $format
     *
     * @return String
     */
    protected static function format( String $string, Mixed ...$format ): String
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
    
    /*
     * Retrieve the last slice of directory name.
     *
     * @access Protected: Static
     *
     * @params String $string
     *
     * @return String
     */
    protected static function slice( String $string ): String
    {
        $reference = explode( "/", $string );
        
        return( array_pop( $reference ) );
    }
    
    protected static function import( String $path, String $real, Array $scanls ): Void
    {
        if( is_dir( self::format( "{}/{}", self::TARGET, $path ) ) === False )
        {
            mkdir( self::format( "{}/{}", self::TARGET, $path ) );
        }
        foreach( $scanls As $i => $file )
        {
            if( is_string( $i ) )
            {
                self::import( self::format( "{}/{}", $path, $i ), self::format( "{}/{}", $real, $i ), $file );
            } else {
                if( file_exists( self::format( "{}/{}/{}", self::TARGET, $path, $file ) ) )
                {
                    $target = self::reader( self::format( "{}/{}/{}", self::TARGET, $path, $file ) );
                    $source = self::reader( self::format( "{}/{}/{}", self::SOURCE, $real, $file ) );
                    
                    if( $target === $source )
                    {
                        continue;
                    }
                }
                self::writer(
                    self::format( "{}/{}/{}", self::TARGET, $path, $file ),
                    self::reader(
                        self::format( "{}/{}/{}", self::SOURCE, $real, $file )
                    )
                );
            }
        }
    }
    
    protected static function reader( String $file ): String
    {
        
        $fopen = fopen( $file, "r" );
        $fread = fread( $fopen, 108000000 );
        
        fclose( $fopen );
        
        return( str_replace( "\t", "    ", $fread ) );
    }
    
    protected static function writer( String $file, String $data ): Void
    {
        $fopen = fopen( $file, "w" );
        
        fwrite( $fopen, $data );
        fclose( $fopen );
    }
    
    protected static function delete( String $path, String $real, Array $scanls ): Void
    {
        foreach( $scanls As $i => $file )
        {
            if( is_string( $i ) )
            {
                if( is_dir( self::format( "{}/{}/{}", self::SOURCE, $real, $i ) ) )
                {
                    self::delete( self::format( "{}/{}", $path, $i ), self::format( "{}/{}", $real, $i ), $file );
                } else {
                    var_dump( self::remove( self::format( "{}/{}/{}", self::TARGET, $path, $i ) ) );
                }
            } else {
                if( file_exists( self::format( "{}/{}/{}", self::SOURCE, $real, $file ) ) )
                {
                    continue;
                }
                var_dump( unlink( self::format( "{}/{}/{}", self::TARGET, $path, $file ) ) );
            }
        }
    }
    
    /*
     * Scan the directory thoroughly.
     *
     * @access Protected: Static
     *
     * @params String $path
     *
     * @return Array
     */
    protected static function scanls( String $path ): Array
    {
        $result = [];
        
        if( is_dir( $path ) )
        {
            $list = array_diff( scandir( $path ), [ ".", ".." ] );
            
            foreach( $list As $file )
            {
                switch( $file )
                {
                    case ".git":
                    case "vendor":
                    case "yume.sh":
                    case "composer.lock":
                        break;
                    default:
                        if( is_dir( self::format( "{}/{}", $path, $file ) ) )
                        {
                            $result[$file] = self::scanls( self::format( "{}/{}", $path, $file ) );
                        } else {
                            $result[] = $file;
                        }
                        break;
                }
            }
        }
        return( $result );
    }
    
    /*
     * Force delete directory.
     *
     * @access Protected: Static
     *
     * @params String $path
     *
     * @return Bool
     */
    protected static function remove( String $path ): Bool
    {
        if( file_exists( $path ) )
        {
            return( True );
        }
        if( is_dir( $path ) )
        {
            return( unlink( $path ) );
        }
        foreach( scandir( $path ) as $item )
        {
            if( $item == "" || $item == "" )
            {
                continue;
            }
            if( self::remove( $path . DIRECTORY_SEPARATOR . $item ) !== True )
            {
                return( False );
            }
        }
        return( rmdir( $path ) );
    }
    
}

Github::__init__( $_SERVER['argv'][1] );

?>
