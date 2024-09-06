let userFetched = false;

async function fetchDetails() {
  const phoneNumberOrEmail = document
    .getElementById("phoneNumberOrEmail")
    .value.trim();
  const password = document.getElementById("password").value.trim();
  if (!phoneNumberOrEmail || !password) {
    alert("Email/Phone number and password are required.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/getByPhoneNumberOrEmail/${encodeURIComponent(
        phoneNumberOrEmail
      )}`
    );
    if (response.ok) {
      const user = await response.json();

      if (user.password !== password) {
        alert("Incorrect password.");
        return;
      }

      document.getElementById("result").innerHTML = `
                        <div><strong>Phone Number:</strong> ${user.phoneNumber}</div>
                        <div><strong>Name:</strong> ${user.name}</div>
                        <div><strong>Email:</strong> ${user.email}</div>
                        <div><strong>Date of Birth:</strong> ${user.dob}</div>
                        <div><strong>Gender:</strong> ${user.gender}</div>
                        <div><strong>Course:</strong> ${user.course}</div>
                        <div><strong>Languages:</strong> ${user.language}</div>
                    `;

      // Store user data in session storage
      sessionStorage.setItem("user", JSON.stringify(user));

      // Show the action buttons and logout button
      document.getElementById("action-buttons").style.display = "block";
      document.getElementById("logoutButton").style.display = "block";

      // Hide the registration link
      document.getElementById("registration-link").style.display = "none";

      userFetched = true;
    } else {
      alert("No details found for this email/phone number.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch details.");
  }
}
async function deleteDetails() {
  if (!userFetched) {
    alert("Please fetch user details before attempting to delete.");
    return;
  }

  const phoneNumberOrEmail = document
    .getElementById("phoneNumberOrEmail")
    .value.trim();
  const password = document.getElementById("password").value.trim();
  if (!phoneNumberOrEmail || !password) {
    alert("Email/Phone number and password are required.");
    return;
  }

  if (!confirm("Are you sure you want to delete this user?")) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/getByPhoneNumberOrEmail/${encodeURIComponent(
        phoneNumberOrEmail
      )}`
    );
    if (response.ok) {
      const user = await response.json();

      if (user.password !== password) {
        alert("Incorrect password.");
        return;
      }

      const deleteResponse = await fetch(
        `http://localhost:8080/api/deleteByNumber/${encodeURIComponent(
          phoneNumberOrEmail
        )}`,
        { method: "DELETE" }
      );
      if (deleteResponse.ok) {
        document.getElementById("result").innerHTML =
          "User details deleted successfully.";
        document.getElementById("action-buttons").style.display = "none";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("registration-link").style.display = "none";
        userFetched = false;
        sessionStorage.removeItem("user"); // Clear session storage
      } else {
        alert("Failed to delete details.");
      }
    } else {
      alert("No details found for this email/phone number.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to delete details.");
  }
}

function updateDetails() {
  if (!userFetched) {
    alert("Please fetch user details before attempting to update.");
    return;
  }
  // Redirect to the update page
  window.location.href = "update.html";
}

function logout() {
  document.getElementById("action-buttons").style.display = "none";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("registration-link").style.display = "block"; // Show registration link again

  userFetched = false;

  document.getElementById("phoneNumberOrEmail").value = "";
  document.getElementById("password").value = "";

  // Clear session storage
  sessionStorage.removeItem("user");

  window.location.reload();
}
