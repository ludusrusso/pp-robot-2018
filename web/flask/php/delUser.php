<?php
$FILENAME = "../website-contents.json";
$data = $_POST['jsonString'];

//get whole file content
$contents = file_get_contents($FILENAME);
//remove user string if match
$contents = str_replace($data . "\n", '', $contents);
$contents = str_replace("\n" . $data, '', $contents);
//remove any new lines left
//$contents = rtrim(preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $contents));
//$content = rtrim(ltrim(preg_replace("/\n+/","\n",$content)));
//$content = preg_replace('^\s+\r?\n$', '', $content);
//rewrite file content
file_put_contents($FILENAME, $contents);
?>