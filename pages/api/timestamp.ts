import type { NextApiRequest, NextApiResponse } from 'next'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const upload = multer({ dest: '/tmp' })

export const config = {
    api: {
        bodyParser: false,
    },
}
const handler = async (req: NextApiRequest, res: NextApiResponse & express.Response) => {
    if (req.method === 'POST') {
        upload.single('document')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err)
                return res.status(500).json({ message: err.message })
            }

            const file = (req as any).file

            if (!file) {
                console.error('Missing document')
                return res.status(400).json({ message: 'Document is required' })
            }

            try {
                const document = await readFile(file.path, 'utf8')
                const timestamp = new Date().toISOString()
                const timestampedDocument = `${document}\n\nTimestamp: ${timestamp}`
                const timestampedFilePath = path.join('/tmp', `timestamped-${file.filename}`)

                await writeFile(timestampedFilePath, timestampedDocument)

                res.setHeader('Content-Disposition', `attachment; filename="timestamped-${file.originalname}"`)
                res.setHeader('Content-Type', 'text/plain')
                const stream = fs.createReadStream(timestampedFilePath)
                stream.pipe(res)
            } catch (error) {
                console.error('Error processing document:', error)
                return res.status(500).json({ message: error.message })
            } finally {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Error deleting temporary file:', err)
                })
            }
        })
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
