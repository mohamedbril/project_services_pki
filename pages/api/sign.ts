import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import multer from 'multer'
import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const upload = multer({ dest: '/tmp' })

export const config = {
    api: {
        bodyParser: false,
    },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        upload.single('document')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err)
                return res.status(500).json({ message: err.message })
            }

            const file = (req as any).file
            const privateKey = req.body.privateKey

            if (!file || !privateKey) {
                console.error('Missing document or private key')
                return res.status(400).json({ message: 'Document and private key are required' })
            }

            try {
                const document = await readFile(file.path, 'utf8')
                const sign = crypto.createSign('SHA256')
                sign.update(document)
                sign.end()
                const signature = sign.sign(privateKey, 'hex')
                console.log('Signature:', signature)
                return res.status(200).json({ signature })
            } catch (error) {
                console.error('Error signing document:', error)
                return res.status(500).json({ message: error.message })
            }
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
