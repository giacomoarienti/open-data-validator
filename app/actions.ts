"use server";

import fs from "fs/promises";
import path from "path";

const datasetDir = path.join(process.cwd(), "public/dataset");
const validatedDir = path.join(process.cwd(), "validated");

export type ImageData = {
  imagePath: string;
  imageSrc: string;
  label: string;
};

export async function getRandomImage(): Promise<ImageData | null> {
  const labels = await getLabels();
  // select random label
  const label = labels[Math.floor(Math.random() * labels.length)];

  const labelDir = path.join(datasetDir, label);
  const images = await fs.readdir(labelDir);

  if (images.length > 0) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const imagePath = path.join(labelDir, randomImage);
    const imageSrc = path.relative(
      path.join(process.cwd(), "public"),
      imagePath
    );
    return { imagePath, imageSrc, label };
  }

  // If no images are found in any label directory
  return null;
}

  export async function validateImage(imagePath: string, label: string) {
    const filename = path.basename(imagePath);
    const destDir = path.join(validatedDir, label);
    try {
      await fs.mkdir(destDir, { recursive: true });
      await fs.copyFile(imagePath, path.join(destDir, filename));
      await fs.unlink(imagePath);
    } catch (error) {
      console.error("Error moving file:", error);
      // If the file is not present, we'll just ignore it and let the client load a new image
    }
  }

export async function getLabels() {
  const files = await fs.readdir(datasetDir, { withFileTypes: true });
  const labels = files
    .filter((file) => file.isDirectory())
    .map((dir) => dir.name);
  return labels;
}
