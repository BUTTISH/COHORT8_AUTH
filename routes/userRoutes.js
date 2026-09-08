const express = require("express");

const userRouter = express.Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.put("/:id", updateUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
