<?php

/**
 * Created by PhpStorm.
 * User: Tom
 * Date: 20/01/2016
 * Time: 23:59
 */
namespace App\Controllers\Ajax;

class screensController
{

    public function indexAction() {

        header('Content-type: application/json');

        $ret = [];
/*
        $obj = new \stdClass();
        $obj->type = "zabbix";
        $ret[] = $obj;
*/
/*
        $obj = new \stdClass();
        $obj->type = "jira";
        $ret[] = $obj;
*/
        $obj = new \stdClass();
        $obj->type = "kayako-stats";
        $ret[] = $obj;

        return json_encode(array("screens" => $ret));

    }

}