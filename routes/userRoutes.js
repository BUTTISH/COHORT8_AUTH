const express = require("express");

const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/userController");

userRouter.post("/login", loginUser);
userRouter.post("/user", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/:userId", getSingleUser);
userRouter.put("/:userId", updateUser);
userRouter.patch("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

module.exports = userRouter;
