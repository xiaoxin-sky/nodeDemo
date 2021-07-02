import fs from "fs/promises";
import path from "path";

const readFile = async (fileName: string) => {
  const filePath = path.join(process.cwd(), "./public/", fileName);
  try {
    const fsBuffer = await fs.readFile(filePath);
    return fsBuffer;
  } catch (error) {
    console.error(error);
  }
};

export { readFile };
