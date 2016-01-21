<?php
/**
 * Created by PhpStorm.
 * User: Tom
 * Date: 20/01/2016
 * Time: 23:13
 */

require_once('vendor/autoload.php');

$loader = new Twig_Loader_Filesystem('src/resources/views');
$twig = new Twig_Environment($loader);

echo $twig->render('index.html.twig');