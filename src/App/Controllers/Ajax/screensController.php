<?php

/**
 * Created by PhpStorm.
 * User: Tom
 * Date: 20/01/2016
 * Time: 23:59
 */
namespace App\Controllers\Ajax;

use \App\Config;

class screensController
{

    public function indexAction() {

        header('Content-type: application/json');

        $screens = Config::get('screens');

        $ret = [];

        foreach ($screens as $screen) {
            $obj = new \stdClass();
            $obj->type = $screen;
            $ret[] = $obj;
        }

        return json_encode(array("screens" => $ret));

    }

}