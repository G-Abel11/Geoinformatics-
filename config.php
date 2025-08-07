<?php
$host = "localhost";
$username = "root";      // Default XAMPP username
$password = "";          // Default XAMPP password (empty)
$dbname = "map_explorer"; // Your database name

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    // Connection successful
} catch (mysqli_sql_exception $e) {
    die("Connection failed: " . $e->getMessage());
}
?>