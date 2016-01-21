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
        return "{screens: [ {type: \"zabbix\"}, {type: \"kayako\"}, {type: \"jira\"}]}";

    }

}