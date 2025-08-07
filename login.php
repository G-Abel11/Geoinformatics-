<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id, username, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            
            // Return success response with redirect info
            echo json_encode([
                'success' => true,
                'redirect' => 'explore.html',
                'username' => $user['username']
            ]);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password!']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found!']);
        exit();
    }
    
    $stmt->close();
}
$conn->close();
?>