<?php
include 'php/config.php';

if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
} else {
    echo "Successfully connected to the database!";
    
    // Test query
    $result = $conn->query("SHOW TABLES LIKE 'users'");
    if ($result->num_rows > 0) {
        echo "<br>Users table exists!";
    } else {
        echo "<br>Users table doesn't exist!";
    }
}
$conn->close();
?>