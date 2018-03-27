<?php
$FILENAME = "../website-contents.json";
$data = $_POST['jsonString'];
//set mode of file to writable.
//chmod($FILENAME,0777);
$HANDLE = fopen($FILENAME, "a+") or die("CANT OPEN FILE");

if ( filesize($FILENAME) == 0 ){
	// First line
	fwrite($HANDLE, $data );
} else {
	// Other lines
	fwrite($HANDLE, PHP_EOL . $data );
}
fclose($HANDLE);
?>