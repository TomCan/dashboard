<?php

    namespace App;

    spl_autoload_register('App\AutoLoader');
    function AutoLoader($className)
    {
        if (file_exists('../src/' . $className . '.php')) require_once '../src/'.$className.'.php';
    }

    $path = explode('/', (($_SERVER["PATH_INFO"]) ? $_SERVER["PATH_INFO"] : "/default"));
    array_shift($path);

    $ctrl = array_shift($path);
    if (count($path)) {
        $action = array_shift($path);
    } else {
        $action = "index";
    }

    try {

        $ctrlClass = "App\\Controllers\\Ajax\\" . $ctrl . "Controller";
        $ctrlAction = $action . "Action";

        $controller = new $ctrlClass();
        echo $controller->$ctrlAction();

    } catch (Exception $e) {

    }