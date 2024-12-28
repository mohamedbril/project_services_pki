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
            const publicKey = req.body.publicKey
            const signature = req.body.signature

            if (!file || !publicKey || !signature) {
                console.error('Missing document, public key, or signature')
                return res.status(400).json({ message: 'Document, public key, and signature are required' })
            }

            try {
                const document = await readFile(file.path, 'utf8')
                const verify = crypto.createVerify('SHA256')
                verify.update(document)
                verify.end()
                const isValid = verify.verify(publicKey, signature, 'hex')
                console.log('Verification result:', isValid)
                return res.status(200).json({ isValid })
            } catch (error) {
                console.error('Error verifying document:', error)
                return res.status(500).json({ message: error.message })
            }
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
