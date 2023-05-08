import axios from "axios";
// import API_URL from "../../../config";
import LocalStore from "../../store/localStore";

export const login = async (API_URL, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    if (response.status === 401) {
      throw new Error("Email or Password is Incorrect");
    }
    const result = response.data;
    console.log(result);
    console.log(password);
    const token = response.headers.get("Authorization");
    if (token) {
      LocalStore.save("token", token);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (API_URL, name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.status === 422) {
      throw new Error("User with this email already exists");
    }

    const token = response.headers.get("Authorization");
    if (token) {
      LocalStore.save("token", token);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const logout = async (API_URL) => {
//   const token = LocalStore.get("token");
//   const response = await fetch(`${API_URL}/users/sign_out`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       Authorization: token,
//     },
//   });
//   const result = await response.json();
//   if (response.ok) {
//     LocalStore.remove("token");
//   }
//   return result;
// };
