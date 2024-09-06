let isLoggedIn = false;

async function fetchAllUsers() {
  const user = document.getElementById("phoneNumberOrEmail").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const respons = await fetch(
      `http://localhost:8080/api/getByPhoneNumberOrEmail/${encodeURIComponent(
        user
      )}`
    );
    if (respons.ok) {
      const responseUser = await respons.json();
      if (responseUser.password != password) {
        alert("Incorrect password.");
        return;
      }
      try {
        const response = await fetch("http://localhost:8080/api/getAll");
        if (response.ok) {
          const users = await response.json();
          if (users.length === 0) {
            document.getElementById("all-users").innerHTML = "No users found.";
          } else {
            const usersHTML = users
              .map(
                (user) => `
                                          <div>
                                              <strong>Phone Number:</strong> ${user.phoneNumber}<br />
                                              <strong>Name:</strong> ${user.name}<br />
                                              <strong>Email:</strong> ${user.email}<br />
                                              <strong>Password:</strong> ${user.password}<br />
                                              <strong>Date of Birth:</strong> ${user.dob}<br />
                                              <strong>Gender:</strong> ${user.gender}<br />
                                              <strong>Course:</strong> ${user.course}<br />
                                              <strong>Languages:</strong> ${user.language}<br />
                                              <hr />
                                          </div>
                                      `
              )
              .join("");
            document.getElementById("all-users").innerHTML = usersHTML;

            document.getElementById("all-users").classList.add("show");
            document.getElementById("logout-button").style.display = "block";
            document.getElementById("manage-form").style.display = "none";
            isLoggedIn = true;
          }
        } else {
          alert("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch users.");
      }
    } else {
      alert("Failed to fetch...Admin Username incorrect");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch users.");
  }
}

function logout() {
  document.getElementById("all-users").innerHTML = "";
  document.getElementById("all-users").classList.remove("show");
  document.getElementById("all-users").style.display = "none";
  document.getElementById("logout-button").style.display = "none";
  document.getElementById("manage-form").style.display = "block";
  isLoggedIn = false;
  window.location.reload();
}
