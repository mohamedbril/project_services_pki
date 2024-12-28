'use client'

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";

export default function GenerateCertificate() {
    const [privateKey, setPrivateKey] = useState<string>('-----BEGIN RSA PRIVATE KEY-----\n\n-----END RSA PRIVATE KEY-----')
    const [commonName, setCommonName] = useState<string>('')
    const [organization, setOrganization] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [certificate, setCertificate] = useState<string>('') 
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('') 
    const [generateBtnContent, setGenerateBtnContent] = useState<string | JSX.Element>('Generate')

    const handleGenerateBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setErrorMessage('')
        setGenerateBtnContent(<Loader />)

        if (!privateKey || !commonName || !organization || !country) {
            setErrorMessage(<ErrorMessage>All certificate details are required</ErrorMessage>)
            setGenerateBtnContent('Generate')
            return
        }

        try {
            const res = await fetch('/api/generate-certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ privateKey, commonName, organization, country })
            })
            const status = res.status
            const contentType = res.headers.get('content-type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await res.json()
                if (status == 200) {
                    setCertificate(data.certificate)
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

        setGenerateBtnContent('Generate')
    }

    const handlePrivateKeyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setPrivateKey(event.target.value)
    const handleCommonNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCommonName(event.target.value)
    const handleOrganizationChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setOrganization(event.target.value)
    const handleCountryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCountry(event.target.value)

    const downloadCertificate = () => {
        const element = document.createElement("a")
        const file = new Blob([certificate], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = "certificate.pem"
        document.body.appendChild(element)
        element.click()
    }

    return (
        <Layout>
            <AlgorithmHeader name='Generate Certificate'>
                <p>
                    This service allows you to generate a certificate using a custom private key. You can download the generated certificate.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Private Key</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={privateKey}
                    onChange={handlePrivateKeyChange}
                />

                <label className='block mb-3 text-slate-300'>Common Name</label>
                
                <input 
                    type="text"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    value={commonName}
                    onChange={handleCommonNameChange}
                />

                <label className='block mb-3 text-slate-300'>Organization</label>
                
                <input 
                    type="text"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    value={organization}
                    onChange={handleOrganizationChange}
                />

                <label className='block mb-3 text-slate-300'>Country</label>
                
                <input 
                    type="text"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    value={country}
                    onChange={handleCountryChange}
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleGenerateBtnClick}
                >
                    {generateBtnContent}
                </button>

                {errorMessage}

                <label className='block mb-3 text-slate-300'>Certificate</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={certificate}
                    readOnly
                />

                {certificate && (
                    <button 
                        onClick={downloadCertificate}
                        className="block text-center border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5"
                    >
                        Download Certificate
                    </button>
                )}
            </div>
        </Layout>
    )
}
