<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set header for JSON response
header('Content-Type: application/json');

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate phone number (10 digits)
function validatePhone($phone) {
    return preg_match('/^[0-9]{10}$/', $phone);
}

// Function to validate pincode (6 digits)
function validatePincode($pincode) {
    return preg_match('/^[0-9]{6}$/', $pincode);
}

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Initialize response array
    $response = array();
    $errors = array();
    
    // Validate and sanitize Personal Information
    $fullName = isset($_POST['fullName']) ? sanitizeInput($_POST['fullName']) : '';
    if (empty($fullName)) {
        $errors[] = "Full name is required";
    }
    
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!validateEmail($email)) {
        $errors[] = "Invalid email format";
    }
    
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
    if (empty($phone)) {
        $errors[] = "Phone number is required";
    } elseif (!validatePhone($phone)) {
        $errors[] = "Phone number must be 10 digits";
    }
    
    $dob = isset($_POST['dob']) ? sanitizeInput($_POST['dob']) : '';
    if (empty($dob)) {
        $errors[] = "Date of birth is required";
    }
    
    $gender = isset($_POST['gender']) ? sanitizeInput($_POST['gender']) : '';
    if (empty($gender)) {
        $errors[] = "Gender is required";
    }
    
    $address = isset($_POST['address']) ? sanitizeInput($_POST['address']) : '';
    if (empty($address)) {
        $errors[] = "Address is required";
    }
    
    $city = isset($_POST['city']) ? sanitizeInput($_POST['city']) : '';
    if (empty($city)) {
        $errors[] = "City is required";
    }
    
    $state = isset($_POST['state']) ? sanitizeInput($_POST['state']) : '';
    if (empty($state)) {
        $errors[] = "State is required";
    }
    
    $pincode = isset($_POST['pincode']) ? sanitizeInput($_POST['pincode']) : '';
    if (empty($pincode)) {
        $errors[] = "Pincode is required";
    } elseif (!validatePincode($pincode)) {
        $errors[] = "Pincode must be 6 digits";
    }
    
    // Validate and sanitize Educational Information
    $qualification = isset($_POST['qualification']) ? sanitizeInput($_POST['qualification']) : '';
    if (empty($qualification)) {
        $errors[] = "Highest qualification is required";
    }
    
    $institution = isset($_POST['institution']) ? sanitizeInput($_POST['institution']) : '';
    if (empty($institution)) {
        $errors[] = "Institution name is required";
    }
    
    $yearOfPassing = isset($_POST['yearOfPassing']) ? sanitizeInput($_POST['yearOfPassing']) : '';
    if (empty($yearOfPassing)) {
        $errors[] = "Year of passing is required";
    }
    
    $percentage = isset($_POST['percentage']) ? sanitizeInput($_POST['percentage']) : '';
    if (empty($percentage)) {
        $errors[] = "Percentage/CGPA is required";
    }
    
    // Validate and sanitize Course Selection
    $course = isset($_POST['course']) ? sanitizeInput($_POST['course']) : '';
    if (empty($course)) {
        $errors[] = "Course selection is required";
    }
    
    $batch = isset($_POST['batch']) ? sanitizeInput($_POST['batch']) : '';
    if (empty($batch)) {
        $errors[] = "Batch selection is required";
    }
    
    // Process interests (checkbox array)
    $interests = array();
    if (isset($_POST['interests']) && is_array($_POST['interests'])) {
        foreach ($_POST['interests'] as $interest) {
            $interests[] = sanitizeInput($interest);
        }
    }
    
    // Optional fields
    $comments = isset($_POST['comments']) ? sanitizeInput($_POST['comments']) : '';
    $terms = isset($_POST['terms']) ? true : false;
    
    if (!$terms) {
        $errors[] = "You must agree to the terms and conditions";
    }
    
    // Check if there are any errors
    if (!empty($errors)) {
        $response['success'] = false;
        $response['message'] = implode(', ', $errors);
        echo json_encode($response);
        exit;
    }
    
    // If validation passes, prepare data for display
    $formData = array(
        'fullName' => $fullName,
        'email' => $email,
        'phone' => $phone,
        'dob' => $dob,
        'gender' => $gender,
        'address' => $address,
        'city' => $city,
        'state' => $state,
        'pincode' => $pincode,
        'qualification' => $qualification,
        'institution' => $institution,
        'yearOfPassing' => $yearOfPassing,
        'percentage' => $percentage,
        'course' => $course,
        'batch' => $batch,
        'interests' => $interests,
        'comments' => $comments,
        'terms' => $terms
    );
    
    // Optional: Save to database or file here
    // For this example, we'll just return the data
    
    // Optional: Save to a text file for record keeping
    $recordFile = 'registrations.txt';
    $recordData = "\n=== New Registration ===\n";
    $recordData .= "Date/Time: " . date('Y-m-d H:i:s') . "\n";
    $recordData .= "Name: " . $fullName . "\n";
    $recordData .= "Email: " . $email . "\n";
    $recordData .= "Phone: " . $phone . "\n";
    $recordData .= "Course: " . $course . "\n";
    $recordData .= "=======================\n";
    
    // Append to file  
    file_put_contents($recordFile, $recordData, FILE_APPEND);
    
    // Return success response with form data
    $response['success'] = true;
    $response['message'] = "Registration successful!";
    $response['formData'] = $formData;
    
    echo json_encode($response);
    
} else {
    // Not a POST request
    $response['success'] = false;
    $response['message'] = "Invalid request method. Please use POST.";
    echo json_encode($response);
}
?>
