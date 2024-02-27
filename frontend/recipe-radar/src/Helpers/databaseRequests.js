// This file contains functions that make requests to the database.
// All requests return null if there is an error, otherwise they return the data from the request.

export async function makeGetRequest(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Makes a POST request to the specified URL with the provided data.
 * @param {string} url - The URL to make the POST request to.
 * @param {*} data - The data to send in the request body.
 * @returns {Promise} - A Promise that resolves to the response data if the request is successful, otherwise null.
 */
export async function makePostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Makes a DELETE request to the specified URL with the provided data.
 * @param {string} url - The URL to make the DELETE request to.
 * @param {*} data - The data to send in the request body.
 * @returns {Promise} - A Promise that resolves to the response data if the request is successful, otherwise null.
 */
export async function makeDeleteRequest(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    if (response.ok) {
      // If the response status is 204, return null
      return response.status === 204 ? null : await response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

/**
 * Makes a PATCH request to the specified URL with the provided data.
 * @param {string} url - The URL to make the PATCH request to.
 * @param {*} data - The data to send in the request body.
 * @returns {Promise} - A Promise that resolves to the response data if the request is successful, otherwise null.
 */
export async function makePatchRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.status === 204 ? null : await response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
