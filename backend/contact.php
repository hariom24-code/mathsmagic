<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $message = $_POST['message'];

  // Save to database or send email
  $to = "your-email@example.com";
  $subject = "New Contact Inquiry";
  $message = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";
  mail($to, $subject, $message);

  echo "Thank you for contacting us! We will get back to you soon.";
}
?>