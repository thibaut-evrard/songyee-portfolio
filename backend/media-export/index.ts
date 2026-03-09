import { Storage } from "@google-cloud/storage";
import * as fs from "fs";
import * as path from "path";
import { BUCKET_NAME } from "../constants";

const MEDIA_OUTPUT_PATH = "../frontend/public/media";
const REGEX = {
  mediaFormats: /\.(jpg|jpeg|png|gif|webp|webm|mp4)$/i,
};

const storage = new Storage();

async function downloadBucketImages() {
  fs.rmSync(MEDIA_OUTPUT_PATH, { recursive: true, force: true });

  try {
    if (!fs.existsSync(MEDIA_OUTPUT_PATH)) {
      fs.mkdirSync(MEDIA_OUTPUT_PATH, { recursive: true });
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const [files] = await bucket.getFiles();

    console.log(`Found ${files.length} files. Starting download...`);
    for (const file of files) {
      console.log(`File: ${file.name}`);
    }

    for (const file of files) {
      if (REGEX.mediaFormats.test(file.name)) {
        const localFilePath = path.join(MEDIA_OUTPUT_PATH, file.name);
        const localDirPath = path.dirname(localFilePath);
        if (!fs.existsSync(localDirPath)) {
          fs.mkdirSync(localDirPath, { recursive: true });
        }

        const destination = path.join(MEDIA_OUTPUT_PATH, file.name);
        console.log(`Downloading: ${file.name} -> ${destination}`);
        await file.download({ destination });
      } else {
        console.log(`Skipping non-image file: ${file.name}`);
      }
    }

    console.log("Successfully downloaded all images!");
  } catch (error) {
    console.error("Error downloading images:", error);
  }
}

downloadBucketImages();
