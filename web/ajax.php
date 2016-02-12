<?php

    namespace App;

    use Symfony\Component\Yaml\Yaml;

    spl_autoload_register('App\AutoLoader');
    function AutoLoader($className)
    {
        $file = __DIR__ . '/../src/' . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
        if (file_exists($file)) require_once $file;
    }

    require_once('../vendor/autoload.php');

    class Config {
        private static $config;
        public static function load() {
            $yaml = new Yaml();
            self::$config = $yaml->parse(file_get_contents("../app/config/config.yml"));
        }
        public static function get($key = null) {
            if ($key !== null) {
                return self::$config[$key];
            } else {
                return self::$config;
            }
        }
    }

    Config::load();

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