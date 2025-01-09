<?php
    const HOST = 'localhost';
    const DBNAME = 'finbalancpp';
    const USER = 'root';
    const PASSWORD = '';
    const UTF8 ="utf8";

    const SGDB = "mysql:host=".HOST.";dbname=".DBNAME.";charset=".UTF8; 

    class DbConnection{
        protected function connection(){
            $pdo= new PDO(SGDB,USER,PASSWORD);
            return $pdo;
        }
    }
?>
