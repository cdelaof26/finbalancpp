<?php
class UserSession
{
    public function __construct()
    {
        session_start();
    }
    //guardar galardoano
    public function setSession($username, $email, $id)
    {
        $_SESSION["nombre"] = $username;
        $_SESSION["correo"] = $email;
        $_SESSION["id"] = $id;
    }

    public function getSession()
    {
        return $_SESSION["id"];
    }

    public function closeSession()
    {
        session_unset();
        session_destroy();
    }
}
