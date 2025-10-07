// src/utils/FileHelper.js
import fs from 'fs/promises';
import path from 'path';

export class FileHelper {
  static async readJSON(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  static async writeJSON(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  static async createScreenshotDir() {
    const dir = path.join(process.cwd(), 'screenshots');
    await fs.mkdir(dir, { recursive: true });
    return dir;
  }

  static async cleanDirectory(dirPath) {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error(`Error cleaning directory: ${error}`);
    }
  }
}