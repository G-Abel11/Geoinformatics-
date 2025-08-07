<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate passwords match
    if ($password !== $confirm_password) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match!']);
        exit();
    }

    // Check if username already exists
    $check_sql = "SELECT id FROM users WHERE username = ?";
    $check_stmt = $conn->prepare($check_sql);
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Username already exists!']);
        exit();
    }
    $check_stmt->close();

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user
    $insert_sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    $insert_stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if ($insert_stmt->execute()) {
        $user_id = $insert_stmt->insert_id;
        echo json_encode([
            'success' => true,
            'redirect' => 'explore.html',
            'username' => $username
        ]);
        exit();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $insert_stmt->error]);
        exit();
    }
    
    $insert_stmt->close();
}
$conn->close();
?>