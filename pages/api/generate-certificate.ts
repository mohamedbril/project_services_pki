import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const writeFile = promisify(fs.writeFile)

export const config = {
    api: {
        bodyParser: true,
    },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { publicKey, commonName, organization, country, expirationDate } = req.body

        if (!publicKey || !commonName || !organization || !country || !expirationDate) {
            console.error('Missing certificate details')
            return res.status(400).json({ message: 'All certificate details are required' })
        }

        try {
            const { certificate } = generateCertificate(publicKey, { commonName, organization, country, expirationDate })
            console.log('Certificate generated:', certificate)
            return res.status(200).json({ certificate })
        } catch (error) {
            console.error('Error generating certificate:', error)
            return res.status(500).json({ message: error.message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const generateCertificate = (publicKey: string, details: { commonName: string, organization: string, country: string, expirationDate: string }) => {
    const { publicKey: generatedPublicKey, privateKey: privateKeyObj } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    })

    const sign = crypto.createSign('SHA256')
    sign.update(JSON.stringify(details))
    sign.end()

    const signature = sign.sign(privateKeyObj, 'base64')

    const certificate = `-----BEGIN CERTIFICATE-----\n${signature}\n-----END CERTIFICATE-----`

    return {
        certificate,
    }
}

export default handler
