<?php
$FILENAME = "../website-contents.json";
$data = $_POST['jsonString'];
//set mode of file to writable.
//chmod($FILENAME,0777);
//$HANDLE = fopen($FILENAME, "a+") or die("CANT OPEN FILE");

$contents = file_get_contents($FILENAME);
$contents = str_replace($data, '', $contents);
file_put_contents($FILENAME, $contents);

//fclose($HANDLE);
?>