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

/* Validates the login data.
 *
 * @param {*} data - The login data to be validated.
 * @returns {Object} - An object containing the form errors and a boolean indicating the validity of the data.
 */
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

export function validateRecipeData(
  recipeName,
  recipeDifficulty,
  recipeImage,
  recipeCategory,
  ingredients,
  instructions
) {
  instructions = instructions.split("\n");

  const formData = new FormData();
  formData.append("file", recipeImage);

  if (recipeName === "") {
    return {
      formErrors: { recipeName: "Please enter a recipe name!" },
      isValid: false,
    };
  }
  if (recipeCategory === "") {
    return {
      formErrors: { recipeCategory: "Please select a category!" },
      isValid: false,
    };
  }
  if (ingredients.length <= 0) {
    return {
      formErrors: { ingredients: "Please provide at least one ingredient!" },
      isValid: false,
    };
  }
  if (instructions.length <= 0) {
    return {
      formErrors: { instructions: "Please provide at least one instruction!" },
      isValid: false,
    };
  }

  return { formErrors: {}, isValid: true };
}
