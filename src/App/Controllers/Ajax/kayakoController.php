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
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Cookie\SessionCookieJar;

class kayakoController
{

    public function getStatsAction() {

        $config = Config::get("kayako");

        $db = new \PDO("mysql:dbname=".$config["database"].";host=".$config["host"], $config["username"], $config["password"]);

        $sql = "
                SELECT ticketstatusid, ticketstatustitle, ownerstaffid, ownerstaffname, count(*) as cnt FROM `swtickets`
                WHERE departmentid in (3,4)
                GROUP BY ticketstatusid, ownerstaffid, ownerstaffname
              ";

        $stats = array(
            "status" => array("total" => 0),
            "user" => array("total" => 0));

        foreach ($db->query($sql) as $row) {
            $stats['status']["total"] += $row["cnt"];

            if (!isset($stats['status'][$row["ticketstatustitle"]])) $stats['status'][$row["ticketstatustitle"]] = 0;
            $stats['status'][$row["ticketstatustitle"]] += $row["cnt"];

            if (!isset($stats['user'][$row["ownerstaffname"]])) $stats['user'][$row["ownerstaffname"]] = array("total" => 0);
            $stats['user'][$row["ownerstaffname"]]["total"] += $row["cnt"];
            if (!isset($stats['user'][$row["ownerstaffname"]][$row["ticketstatustitle"]])) $stats['user'][$row["ownerstaffname"]][$row["ticketstatustitle"]] = 0;
            $stats['user'][$row["ownerstaffname"]][$row["ticketstatustitle"]] += $row["cnt"];

        }

        if (isset($stats['user'][''])) {
            $stats['user']['Unassigned'] = $stats['user'][''];
            unset($stats['user']['']);
        }

        header('Content-type: application/json');
        echo json_encode($stats);

    }



}