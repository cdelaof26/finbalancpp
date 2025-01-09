<?php

class DbConnection{
    private $host = 'localhost';
    private $dbname = 'finbalancpp';
    private $user = 'root';
    private $password = '';
    private $utf8 = "utf8";
    
    public function connect(){
        try{
            $sgdb = "mysql:host=".$this->host.";dbname=".$this->dbname.";charset=".$this->utf8; 
            
            $conn = new PDO($sgdb, $this->user, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }catch(\Exception $e){
            // Captura y logueo del erro
            echo "Error de conexión: " . $e->getMessage();      
        }
    }
    
}
