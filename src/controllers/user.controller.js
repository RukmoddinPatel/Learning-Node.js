import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOneCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/ApiResponse.js";

// Registering a new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, username, password } = req.body;

  // Validation for missing fields
  if ([fullName, email, username, password].some(field => !field?.trim())) {
    throw new apiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (existedUser) {
    throw new apiError(409, "User with email or username already exists");
  }

  // File path for avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }

  // Upload to Cloudinary
  const avatar = await uploadOneCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOneCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new apiError(400, "Failed to upload avatar image");
  }

  // Create user in DB
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
