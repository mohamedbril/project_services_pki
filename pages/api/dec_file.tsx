import type { NextApiRequest, NextApiResponse } from "next";
// import { IncomingMessage } from "http";

interface MulterRequest extends NextApiRequest {
  file: multer.File;
}
import multer from "multer";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import type { Express } from "express";

const upload = multer({ dest: "/tmp" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: MulterRequest, res: NextApiResponse) => {
  upload.single("file")(req as any, res as any, async (err: any) => {
    if (err) {
      res.status(500).json({ error: "Error uploading the file" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;
    const passphrase = req.body.passphrase;

    if (!passphrase) {
      res.status(400).json({ error: "No passphrase provided" });
      return;
    }

    try {
      const fileData = fs.readFileSync(filePath);
      const algorithm = "aes-256-ecb";
      const key = crypto.createHash('sha256').update(passphrase).digest();

      const decipher = crypto.createDecipheriv(algorithm, key, null);
      let decrypted = decipher.update(fileData);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      const decryptedFilePath = path.join("/tmp", `${req.file.filename}.dec`);
      fs.writeFileSync(decryptedFilePath, decrypted);

      res.setHeader("Content-Disposition", `attachment; filename=${req.file.filename}.dec`);
      res.setHeader("Content-Type", "application/octet-stream");
      const fileStream = fs.createReadStream(decryptedFilePath);
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json({ error: "Error decrypting the file" });
    }
  });
};

export default handler;
