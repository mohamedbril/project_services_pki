'use client'

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";

export default function Sign() {
    const [file, setFile] = useState<File | null>(null)
    const [privateKey, setPrivateKey] = useState<string>('-----BEGIN RSA PRIVATE KEY-----\n\n-----END RSA PRIVATE KEY-----')
    const [signature, setSignature] = useState<string>('') 
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('') 
    const [signBtnContent, setSignBtnContent] = useState<string | JSX.Element>('Sign')

    const [verifyFile, setVerifyFile] = useState<File | null>(null)
    const [publicKey, setPublicKey] = useState<string>('-----BEGIN RSA PUBLIC KEY-----\n\n-----END RSA PUBLIC KEY-----')
    const [verificationResult, setVerificationResult] = useState<string>('') 
    const [verifyErrorMessage, setVerifyErrorMessage] = useState<string | JSX.Element>('') 
    const [verifyBtnContent, setVerifyBtnContent] = useState<string | JSX.Element>('Verify')

    const handleSignBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setErrorMessage('')
        setSignBtnContent(<Loader />)

        if (!file) {
            setErrorMessage(<ErrorMessage>File is required</ErrorMessage>)
            setSignBtnContent('Sign')
            return
        }

        const formData = new FormData()
        formData.append('document', file)
        formData.append('privateKey', privateKey)

        try {
            const res = await fetch('/api/sign', {
                method: 'POST',
                body: formData
            })
            const status = res.status
            const contentType = res.headers.get('content-type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await res.json()
                if (status == 200) {
                    setSignature(data.signature)
                } else {
                    setErrorMessage(
                        <ErrorMessage>
                            {data.message}
                        </ErrorMessage>
                    )
                }
            } else {
                setErrorMessage(
                    <ErrorMessage>
                        Unexpected response format
                    </ErrorMessage>
                )
            }
        } catch (e) {
            setErrorMessage(
                <ErrorMessage>
                    {e.toString()}
                </ErrorMessage>
            )
        }

        setSignBtnContent('Sign')
    }

    const handleVerifyBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setVerifyErrorMessage('')
        setVerifyBtnContent(<Loader />)

        if (!verifyFile) {
            setVerifyErrorMessage(<ErrorMessage>File is required</ErrorMessage>)
            setVerifyBtnContent('Verify')
            return
        }

        const formData = new FormData()
        formData.append('document', verifyFile)
        formData.append('publicKey', publicKey)
        formData.append('signature', signature)

        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                body: formData
            })
            const status = res.status
            const contentType = res.headers.get('content-type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await res.json()
                if (status == 200) {
                    setVerificationResult(data.isValid ? 'Valid' : 'Invalid')
                } else {
                    setVerifyErrorMessage(
                        <ErrorMessage>
                            {data.message}
                        </ErrorMessage>
                    )
                }
            } else {
                setVerifyErrorMessage(
                    <ErrorMessage>
                        Unexpected response format
                    </ErrorMessage>
                )
            }
        } catch (e) {
            setVerifyErrorMessage(
                <ErrorMessage>
                    {e.toString()}
                </ErrorMessage>
            )
        }

        setVerifyBtnContent('Verify')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const handleVerifyFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setVerifyFile(event.target.files[0])
        }
    }

    const handlePrivateKeyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setPrivateKey(event.target.value)
    const handlePublicKeyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setPublicKey(event.target.value)
    const handleSignatureChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setSignature(event.target.value)

    return (
        <Layout>
            <AlgorithmHeader name='Sign Document'>
                <p>
                    This service allows you to sign a document using a private key. The signature can be used to verify the authenticity and integrity of the document.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Document</label>
                
                <input 
                    type="file"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    onChange={handleFileChange}
                />

                <label className='block mb-3 text-slate-300'>Private Key</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={privateKey}
                    onChange={handlePrivateKeyChange}
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleSignBtnClick}
                >
                    {signBtnContent}
                </button>

                {errorMessage}

                <label className='block mb-3 text-slate-300'>Signature</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={signature}
                    onChange={handleSignatureChange}
                />

                <hr className="my-8" />

                <AlgorithmHeader name='Verify Signature'>
                    <p>
                        This service allows you to verify the signature of a document using a public key.
                    </p>
                </AlgorithmHeader>

                <label className='block mb-3 text-slate-300'>Document</label>
                
                <input 
                    type="file"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    onChange={handleVerifyFileChange}
                />

                <label className='block mb-3 text-slate-300'>Public Key</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={publicKey}
                    onChange={handlePublicKeyChange}
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleVerifyBtnClick}
                >
                    {verifyBtnContent}
                </button>

                {verifyErrorMessage}

                <label className='block mb-3 text-slate-300'>Verification Result</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={verificationResult}
                    readOnly
                />
            </div>
        </Layout>
    )
}
