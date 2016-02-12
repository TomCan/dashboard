<?php

/**
 * Created by PhpStorm.
 * User: Tom
 * Date: 20/01/2016
 * Time: 23:59
 */
namespace App\Controllers\Ajax;

use \App\Config;
use GuzzleHttp\Client;

class zabbixController
{

    private $guzzle = null;
    private $auth = null;

    private function doLogin() {

        $config = Config::get();
        $payload = '{ "jsonrpc": "2.0", "method": "user.login", "id": 1, "params": { "user": "' . $config["zabbix"]["username"] .'", "password": "' . $config["zabbix"]["password"] . '" }, "auth": null }';
        $result = json_decode($this->doRequest($payload));
        $this->auth = $result->result;

    }


    public function getActiveTriggersAction() {

        $this->doLogin();

        $payload = '
        {
            "jsonrpc": "2.0",
            "method": "trigger.get",
            "id": 1,
            "params": {
                    "output": ["triggerid", "state", "error", "url", "expression", "description", "priority", "lastchange"],
                    "selectHosts": ["hostid", "name"],
                    "selectLastEvent": ["eventid", "value", "objectid", "clock"],
                    "sortfield": "lastchange",
                    "only_true": "true",
                    "maintenance": "false",
                    "limit": 25
            },
            "auth": "' . $this->auth . '"
        }';

        echo $this->doRequest($payload);

    }

    private function doRequest($payload) {

        if ($this->guzzle == null) {

            $conf = Config::get();
            $baseurl = $conf["zabbix"]["url"];

            $this->guzzle = new Client(array('cookies' => true, 'base_uri' => $baseurl));
        }

//        var_dump($payload);
        $response = $this->guzzle->request('POST', 'api_jsonrpc.php', array('body' => $payload, 'headers' => array('content-type' => 'application/json-rpc') ));
        return $response->getBody()->getContents();

    }

}