document.addEventListener("DOMContentLoaded", function () {
  //  validation on input change
  document.getElementById("name").addEventListener("input", validateName);
  document.getElementById("email").addEventListener("input", validateEmail);
  document.getElementById("subject").addEventListener("input", validateSubject);
  document.getElementById("message").addEventListener("input", validateMessage);

  // event listener submit button
  document
    .getElementById("submitButton")
    .addEventListener("click", validateForm);
});

function validateForm() {
  // Call validation functions
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();

  // Check if criterias met
  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    alert("Message Submitted");
    resetForm();
  }
}

function validateName() {
  const name = document.getElementById("name").value;
  const errorElement = document.getElementById("nameError");
  errorElement.textContent =
    name.length <= 5 ? "Name must be more than 5 characters." : "";
  return name.length > 5;
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorElement = document.getElementById("emailError");
  errorElement.textContent = !emailRegex.test(email)
    ? "Please enter a valid email address."
    : "";
  return emailRegex.test(email);
}

function validateSubject() {
  const subject = document.getElementById("subject").value;
  const errorElement = document.getElementById("subjectError");
  errorElement.textContent =
    subject.length <= 15 ? "Subject must be more than 15 characters." : "";
  return subject.length > 15;
}

function validateMessage() {
  const message = document.getElementById("message").value;
  const errorElement = document.getElementById("messageError");
  errorElement.textContent =
    message.length <= 25 ? "Message must be more than 25 characters." : "";
  return message.length > 25;
}

function resetForm() {
  document.getElementById("contactForm").reset();
}
