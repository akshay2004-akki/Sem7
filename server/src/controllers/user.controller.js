import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const getAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = await user.getAccessToken();
  const refreshToken = await user.getRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { refreshToken, accessToken };
};

export const registerUSer = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if ([fullName, email, password, role].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  console.log("existing user : ",existingUser);
  
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    fullName,
    email,
    password,
    role,
    avatar: "",
  });

  return res
    .status(200)
    .json({ newUser, message: "User registered successfully" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid email or password");
  }

  const { refreshToken, accessToken } = await getAccessAndRefreshToken(
    user?._id
  );

  user.refreshToken = refreshToken;
  await user.save();

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: false,
    secure: true,
    // sameSite : "strict",
    // sameSite:"strict"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ loggedInUser, message: "User logged Successfully", token : accessToken });
});

export const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: false,
    // sameSite : "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ data: {}, message: "User logged out successfully" }); 
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const { user } = req;
  
  if (!req.file) {
    throw new ApiError(400, "Please upload an image");
  }
  console.log("req.file", req.file);

  const uploadedImage = await uploadOnCloudinary(
    req.file.path,
    `avatars/${user._id}`
  );

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      avatar: uploadedImage.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json({ updatedUser, message: "Avatar uploaded successfully" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "User not found");
  }

  const user = await User.findById(userId).select("-password -refreshToken").populate("wishlist enrolledCourses");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json({ user, message: "User profile fetched successfully" });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ user, message: "User fetched successfully" });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -refreshToken");
  if (!users || users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res.status(200).json({ users, message: "Users fetched successfully" });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ message: "User deleted successfully" });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const { fullName, email, role } = req.body;

  if ([fullName, email, role].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      fullName,
      email,
      role,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json({ updatedUser, message: "User updated successfully" });
});

export const changeUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const { oldPassword, newPassword } = req.body;

  if ([oldPassword, newPassword].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isOldPasswordValid = await user.comparePassword(oldPassword);
  if (!isOldPasswordValid) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({ message: "Password changed successfully" });
});
