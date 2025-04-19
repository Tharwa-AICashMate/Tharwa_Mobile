<<<<<<< HEAD
// import UserService from "../services/users.service.js";

// export const getUsers = async (req, res) => {
//   const data = await UserService.getUsers();
//   res.json(data);
// };
=======
import UserService from "../services/users.service.js";

export const getUsers = async (req, res) => {
  const data = await UserService.getUsers();
  res.json(data);
};
>>>>>>> HomePage
