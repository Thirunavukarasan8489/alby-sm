import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables if present
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

/**
 * Uploads a file (Buffer or Base64 string / Data URI) to Cloudinary.
 * Falls back to Data URI if Cloudinary credentials are not yet set up.
 */
export async function uploadToCloudinary(
  fileBufferOrDataUri: Buffer | string,
  folder: string = "alby_sm_gallery"
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // If Cloudinary API credentials exist, upload using SDK
  if (cloudName && apiKey && apiSecret) {
    return new Promise((resolve, reject) => {
      if (typeof fileBufferOrDataUri === "string" && fileBufferOrDataUri.startsWith("data:")) {
        cloudinary.uploader.upload(
          fileBufferOrDataUri,
          { folder },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("Cloudinary upload failed"));
            }
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );
      } else if (Buffer.isBuffer(fileBufferOrDataUri)) {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("Cloudinary upload failed"));
            }
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );
        uploadStream.end(fileBufferOrDataUri);
      } else {
        reject(new Error("Unsupported upload payload format"));
      }
    });
  }

  // Fallback: If Cloudinary env vars are missing, return data URI or string directly
  const secure_url = typeof fileBufferOrDataUri === "string"
    ? fileBufferOrDataUri
    : `data:image/jpeg;base64,${fileBufferOrDataUri.toString("base64")}`;

  return {
    secure_url,
    public_id: `fallback_${Date.now()}`,
  };
}

/**
 * Destroys an asset in Cloudinary by its public_id.
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!publicId || publicId.startsWith("fallback_")) {
    return true;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting asset from Cloudinary:", error);
    return false;
  }
}
