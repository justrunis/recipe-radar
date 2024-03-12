// This file contains functions that validate user input.

/* Validates the registration data.
 *
 * @param {*} data - The registration data to be validated.
 * @returns {Object} - An object containing the form errors and a boolean indicating the validity of the data.
 */
export function validateRegistrationData(data) {
  const formErrors = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  let isValid = true;

  if (data.username === "") {
    formErrors.username = "Username field cannot be empty!";
    isValid = false;
  }
  if (data.email === "") {
    formErrors.email = "Email field cannot be empty!";
    isValid = false;
  }
  if (data.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    formErrors.email = "Invalid email format!";
    isValid = false;
  }
  if (data.confirmPassword === "") {
    formErrors.confirmPassword = "Confirm Password field cannot be empty!";
    isValid = false;
  }
  if (data.password !== data.confirmPassword) {
    formErrors.confirmPassword = "Passwords do not match!";
    isValid = false;
  }
  // Uncomment later
  //   if (data.password.length < 8) {
  //     formErrors.password = "Password must be at least 8 characters long!";
  //     isValid = false;
  //   }
  //   if (!/[A-Z]/.test(data.password)) {
  //     formErrors.password = "Password must contain an uppercase letter!";
  //     isValid = false;
  //   }
  //   if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(data.password)) {
  //     formErrors.password = "Password must contain a special symbol or a number!";
  //     isValid = false;
  //   }
  if (data.password === "") {
    formErrors.password = "Password field cannot be empty!";
    isValid = false;
  }

  return { formErrors, isValid };
}

export function validateLoginData(data) {
  const formErrors = {
    username: "",
    password: "",
  };

  let isValid = true;

  if (data.username === "") {
    formErrors.username = "Username field cannot be empty!";
    isValid = false;
  }
  if (data.password === "") {
    formErrors.password = "Password field cannot be empty!";
    isValid = false;
  }

  return { formErrors, isValid };
}
