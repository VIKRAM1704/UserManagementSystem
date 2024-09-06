async function checkPhoneNumberUnique() {
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const messageElement = document.getElementById("phoneNumber-message");

  if (!phoneNumber) {
    messageElement.textContent = "";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/check-number?phoneNumber=${encodeURIComponent(
        phoneNumber
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();

    if (result.exists) {
      messageElement.textContent = "This phone number already exists.";
      messageElement.className = "message red";
    } else {
      messageElement.textContent = "This phone number is available.";
      messageElement.className = "message green";
    }
  } catch (error) {
    console.error("Error:", error);
    messageElement.textContent = "Failed to check phone number.";
    messageElement.className = "message red";
  }
}

async function checkEmailUnique() {
  const email = document.getElementById("email").value.trim();
  const messageElement = document.getElementById("email-message");

  if (!email) {
    messageElement.textContent = "";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/check-email?email=${encodeURIComponent(email)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();

    if (result.exists) {
      messageElement.textContent = "This email already exists.";
      messageElement.className = "message red";
    } else {
      messageElement.textContent = "This email is available.";
      messageElement.className = "message green";
    }
  } catch (error) {
    console.error("Error:", error);
    messageElement.textContent = "Failed to check email.";
    messageElement.className = "message red";
  }
}

async function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const dob = document.getElementById("dob").value;
  const age = document.getElementById("age-display").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const course = document.getElementById("course").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const language = [
    ...document.querySelectorAll('input[name="language"]:checked'),
  ]
    .map((el) => el.value)
    .join(", ");

  if (!name) {
    alert("Name is required.");
    return;
  }

  if (!email || !validateEmail(email)) {
    alert("A valid email is required.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!dob) {
    alert("Date of Birth is required.");
    return;
  }

  if (!age) {
    alert("Age is required.");
    return;
  }

  if (!gender) {
    alert("Gender is required.");
    return;
  }

  if (!course) {
    alert("Course selection is required.");
    return;
  }

  if (language.length === 0) {
    alert("At least one language must be selected.");
    return;
  }

  if (phoneNumber.length !== 10) {
    alert("Phone Number must be exactly 10 digits.");
    return;
  }

  const phoneMessage = document.getElementById(
    "phoneNumber-message"
  ).textContent;
  if (phoneMessage.includes("exists")) {
    alert("Phone number is already taken. Please choose another one.");
    return;
  }

  const emailMessage = document.getElementById("email-message").textContent;
  if (emailMessage.includes("exists")) {
    alert("Email is already taken. Please choose another one.");
    return;
  }

  const user = {
    phoneNumber,
    name,
    email,
    password,
    confirmPassword,
    dob,
    age,
    gender,
    course,
    language,
  };

  try {
    console.log("Submitting form with data:", user);
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    console.log("Server response:", result);

    if (response.ok) {
      alert("Registration Completed Successfully");
    } else {
      alert("Registration Failed: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Registration Failed");
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function calculateAndDisplayAge() {
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    document.getElementById("age-display").value = "";
    return;
  }

  const age = calculateAge(dobInput);
  document.getElementById("age-display").value = age;
}

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("dob")
    .addEventListener("input", calculateAndDisplayAge);
  document
    .getElementById("phoneNumber")
    .addEventListener("blur", checkPhoneNumberUnique);
  document.getElementById("email").addEventListener("input", checkEmailUnique);
  document
    .getElementById("registration-form")
    .addEventListener("submit", submitForm);
});
