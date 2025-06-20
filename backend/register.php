<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $class = $_POST['class'];
  $contact = $_POST['contact'];
  $timing = $_POST['timing'];

  // Save to database or send email
  $to = "your-email@example.com";
  $subject = "New Registration for Maths Magic";
  $message = "Name: $name\nClass: $class\nContact: $contact\nPreferred Timing: $timing";
  mail($to, $subject, $message);

  echo "Thank you for registering! We will contact you soon.";
}
?>