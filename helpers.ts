import { promises as fs } from "fs";

export const fileToString = async (filepath: string): Promise<string> => {
  const data = await fs.readFile(filepath);
  return Buffer.from(data).toString();
};
