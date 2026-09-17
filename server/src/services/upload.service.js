import cloudinary from "./cloudinary.service.js";

const uploadService =  (profilePic) => {
  return cloudinary.uploader.upload(profilePic, {
    folder: "chat-app/profile-pics",
  });
};

export default uploadService;
