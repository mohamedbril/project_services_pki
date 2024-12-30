import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
// import { Multer } from "multer"; // This import is not needed
import fs from "fs";
import crypto from "crypto";
import path from "path";

const upload = multer({ dest: "/tmp" });

export const config = {
  api: {
    bodyParser: false,
  },
};
import type { File } from "multer";

interface MulterRequest extends NextApiRequest {
  file?: File;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  upload.single("file")(req as MulterRequest, res, async (err: any) => {
    if (err) {
      res.status(500).json({ error: "Error uploading the file" });
      return;
    }
    const multerReq = req as MulterRequest;
    if (!multerReq.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const filePath = multerReq.file.path;
    const passphrase = req.body.passphrase;
    if (!passphrase) {
      res.status(400).json({ error: "No passphrase provided" });
      return;
    }

    try {
      const fileData = fs.readFileSync(filePath);
      const algorithm = "aes-256-ecb";
      const key = crypto.createHash('sha256').update(passphrase).digest();

      const cipher = crypto.createCipheriv(algorithm, key, null);
      let encrypted = cipher.update(fileData);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      const encryptedFilePath = path.join("/tmp", `${multerReq.file.filename}.enc`);
      fs.writeFileSync(encryptedFilePath, encrypted);
      res.setHeader("Content-Disposition", `attachment; filename=${multerReq.file.filename}.enc`);
      const fileStream = fs.createReadStream(encryptedFilePath);
      fileStream.pipe(res).on('finish', () => {
        res.status(200).end();
      });
    } catch (error) {
      res.status(500).json({ error: "Error encrypting the file" });
    }
  });
};

export default handler;
