import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../library/utils.js";
import { ENV_VARS } from "../library/env.js";
import uploadService from "../services/upload.service.js";

const signUp = async (request, response, next) => {
  try {
    const { fullName, email, password } = request.body;
    if (!fullName || !email || !password) {
      return response
        .status(400)
        .json({ message: "Please fill all the fields" });
    }

    if (password.length < 8) {
      return response
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ message: "Invalid email address" });
    }

    const user = await User.findOne({ email: { $eq: email } });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, response);
      await newUser.save();

      return response.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    }

    return response.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, response);

    response.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (_, response, next) => {
  try {
    response.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: ENV_VARS.NODE_ENV === "production",
      path: "/",
    });
    response.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (request, response, next) => {
  try {
    const { profilePic, about, phone, fullName } = request.body;
    const userId = request.user._id;
    console.log(userId);

    let updatedFields = {};

    if (about !== undefined) updatedFields.about = about;
    if (phone !== undefined) updatedFields.phone = phone;
    if (fullName !== undefined) updatedFields.fullName = fullName;

    if (profilePic) {
      const isBase64Image =
        typeof profilePic === "string" && profilePic.startsWith("data:");
      if (isBase64Image) {
        const uploadImage = await uploadService(profilePic);
        updatedFields.profilePic =
          uploadImage?.secure_url || uploadImage?.url || uploadImage;
      } else if (
        typeof profilePic === "string" &&
        profilePic.startsWith("http")
      ) {
        updatedFields.profilePic = profilePic;
      } else {
        return response
          .status(400)
          .json({ success: false, message: "Invalid profile picture format" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");

    response.status(200).json({
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (request, response, next) => {
  try {
    response.status(200).json(request.user);
  } catch (error) {
    next(error);
  }
};

// implement guest login functionality

const guestLogin = async (_, response, next) => {
  try {
    const randomNum = Math.floor(Math.random() * 9000);
    const guestName = `Guest ${randomNum}`;

    const randomEmailUser = `guest_${Date.now()}@guest.com`;
    const password = `guest_${Date.now()}`;
    // Hash the password for the guest user
    // genSaltSync is used to generate a salt for hashing the password, and hashSync is used to hash the password with the generated salt. This ensures that even if multiple guest users are created, they will have unique hashed passwords due to the use of a unique salt for each user.
    const genSalt = bcrypt.genSaltSync(10);
    // Hash the password for the guest user
    // hashSync is used to hash the password with the generated salt. This ensures that even if multiple guest users are created, they will have unique hashed passwords due to the use of a unique salt for each user.
    // random password = assume guest_1701300000000, genSalt = $2b$10$abcdefg1234567890, hashedPassword = $2b$10$abcdefg1234567890hijklmnopqrstuvwxyz1234567890
    const hashedPassword = bcrypt.hashSync(password, genSalt);

    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiration time to 24 hours from now

    const guestUser = new User({
      fullName: guestName,
      email: randomEmailUser,
      password: hashedPassword,
      profilePic: "",
      isGuest: true,
      expireAt: expireAt,
    });
    // Save the guest user to the database
    await guestUser.save();
    // Generate a dummy token for the guest user and send it in the response
    generateToken(guestUser._id, response);

    return response.status(200).json({
      _id: guestUser._id,
      fullName: guestUser.fullName,
      email: guestUser.email,
      profilePic: guestUser.profilePic,
      isGuest: guestUser.isGuest,
      expireAt: guestUser.expireAt,
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, login, logout, updateProfile, checkAuth, guestLogin };
