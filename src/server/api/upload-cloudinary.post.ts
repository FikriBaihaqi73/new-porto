import { defineEventHandler, createError } from 'h3';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { promises as fs } from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default defineEventHandler(async (event) => {
  try {
    // Nonaktifkan body parsing default h3
    const form = formidable({
      uploadDir: '/tmp', // Direktori sementara untuk menyimpan file yang diunggah
      keepExtensions: true,
      multiples: false,
    });

    const { files } = await new Promise<{ files: formidable.Files }>((resolve, reject) => {
      form.parse(event.req, (err, fields, files) => {
        if (err) {
          reject(createError({ statusCode: 500, statusMessage: 'Error parsing form data' }));
          return;
        }
        resolve({ files });
      });
    });

    const uploadedFile = files.file?.[0]; // Ambil file pertama dari input bernama 'file'

    if (!uploadedFile) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded',
      });
    }

    // Upload file ke Cloudinary
    const result = await cloudinary.uploader.upload(uploadedFile.filepath);

    // Hapus file sementara setelah diunggah ke Cloudinary
    await fs.unlink(uploadedFile.filepath);

    return {
      status: 200,
      url: result.secure_url, // URL aman dari gambar yang diunggah
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to upload image to Cloudinary',
    });
  }
});
