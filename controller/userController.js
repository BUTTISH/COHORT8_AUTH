const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * CRUD
 * CREATE USER (POST)
 * READ USER (GET): GENERAL GET, SINGLE GET
 * UPDATE USER (PUT)
 * DELETE USER (DELETE)
 */

//CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    user.password = undefined;

    return res
      .status(200)
      .json({ message: "Login successful", token: token, user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//GENERAL GET
const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    res.status(200).json({
      message: "All users fetched successfully",
      data: getAll,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//single GET

const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const getSingle = await userModel.findById(userId);
    if (!getSingle) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "Single user fetched successfully",
      data: getSingle,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    const update = await userModel.findByIdAndUpdate(
      userId,
      { name, password },
      { new: true },
    );

    return res.status(200).json({
      message: "User updated successfully",
      data: update,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(userId);
    return res.status(200).json({
      message: "User deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
