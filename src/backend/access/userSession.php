<?php
class UserSession
{
    public function __construct()
    {
        session_start();
    }
    //guardar galardoano
    public function setSession($username, $email)
    {
        $_SESSION["nombre"] = $username;
        $_SESSION["correo"] = $email;
    }

    public function getSession()
    {
        return [$_SESSION["nombre"], $_SESSION["correo"]];
    }

    public function closeSession()
    {
        session_unset();
        session_destroy();
    }
}
