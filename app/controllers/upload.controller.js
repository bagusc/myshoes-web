const admin = require("firebase-admin");

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://myshoes-6f8a2.appspot.com",
});

const uploadImage = async (req, res, next) => {
  try {
    const fileBuffer = req.file.buffer;
    const bucket = admin.storage().bucket();
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(fileName);

    await file.save(fileBuffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
    req.imageUrl = url; // Menyimpan URL gambar ke dalam req untuk diakses oleh controller lain
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { uploadImage };
