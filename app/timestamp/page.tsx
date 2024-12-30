'use client'

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";

export default function Timestamp() {
    const [file, setFile] = useState<File | null>(null)
    const [timestamp, setTimestamp] = useState<string>('') 
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('') 
    const [timestampBtnContent, setTimestampBtnContent] = useState<string | JSX.Element>('Generate Timestamp')

    const handleTimestampBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setErrorMessage('')
        setTimestampBtnContent(<Loader />)

        if (!file) {
            setErrorMessage(<ErrorMessage>File is required</ErrorMessage>)
            setTimestampBtnContent('Generate Timestamp')
            return
        }

        const formData = new FormData()
        formData.append('document', file)

        try {
            const res = await fetch('/api/timestamp', {
                method: 'POST',
                body: formData
            })

            if (res.status === 200) {
                const blob = await res.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.style.display = 'none'
                a.href = url
                a.download = `timestamped-${file.name}`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                setTimestamp('Timestamp added and file downloaded')
            } else {
                const data = await res.json()
                setErrorMessage(
                    <ErrorMessage>
                        {data.message}
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

        setTimestampBtnContent('Generate Timestamp')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    return (
        <Layout>
            <AlgorithmHeader name='Generate Timestamp'>
                <p>
                    This service allows you to upload a document and generate a timestamp for it.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Document</label>
                
                <input 
                    type="file"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    onChange={handleFileChange}
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleTimestampBtnClick}
                >
                    {timestampBtnContent}
                </button>

                {errorMessage}

                <label className='block mb-3 text-slate-300'>Timestamp</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={timestamp}
                    readOnly
                />
            </div>
        </Layout>
    )
}
