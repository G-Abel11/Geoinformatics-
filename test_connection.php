<?php
require 'config.php';

try {
    // Test query
    $result = $conn->query("SHOW TABLES");
    echo "Database connection successful! Found tables: ";
    while($row = $result->fetch_array()) {
        echo $row[0] . " ";
    }
    $conn->close();
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}

?>
