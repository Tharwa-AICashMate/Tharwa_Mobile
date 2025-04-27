// import axiosInstance from "../config/axios";

// export const login = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     // Use axiosInstance to make the API call
//     const response = await axiosInstance.post("/login", {
//       email,
//       password,
//     });

//     // Return the response data
//     return response.data;
//   } catch (error: any) {
//     // Handle errors and throw a meaningful error message
//     if (error.response) {
//       // Server responded with a status code outside the 2xx range
//       throw new Error(error.response.data.message || "Login failed");
//     } else if (error.request) {
//       // Request was made but no response was received
//       throw new Error("No response from server. Please try again later.");
//     } else {
//       // Something else happened while setting up the request
//       throw new Error(error.message || "An unknown error occurred");
//     }
//   }
// };
