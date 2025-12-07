import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 5MB

    fileFilter: (req, file, cb) => {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

      if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed!"), false);
      }

      cb(null, true);
    },
  }).single("image");



export const generateUniqueFileName = (path, userId) => {
  const timestamp = Date.now();
  return `${path}-${userId}-${timestamp}`;
};
