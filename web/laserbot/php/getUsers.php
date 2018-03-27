<?php
$FILENAME = "../website-contents.json";
$HANDLE = fopen($FILENAME,'r') or die ('CANT OPEN FILE');

if ( filesize($FILENAME) != 0 ){
	$DATA = fread($HANDLE,filesize($FILENAME));
	fclose($HANDLE);
	echo $DATA;
}

?>