'use client'

import { SetStateAction, useState } from "react";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";
import { ChangeEvent } from "react";
    

export default function PasswordGenerator() {
    const [length, setLength] = useState<number>(12);
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('');
    const [generateBtnContent, setGenerateBtnContent] = useState<string | JSX.Element>('Generate');
    const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => setLength(Number(event.target.value));
const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value);
    const handleGenerateBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setErrorMessage('');
        setGenerateBtnContent(<Loader />);

        try {
            const res = await fetch(`/api/pass?length=${length}`);
            const data = await res.json();
            const status = res.status;

            if (status == 200) {
                setPassword(data.password);
            } else {
                setErrorMessage(
                    <ErrorMessage>
                        {data.message}
                    </ErrorMessage>
                );
            }
        } catch (e) {
            setErrorMessage(
                <ErrorMessage>
                    {e.toString()}
                </ErrorMessage>
            );
        }

        setGenerateBtnContent('Generate');
    };

   

    return (
        <Layout>
            <AlgorithmHeader name='Password Generator'>
                <p>
                    This tool generates a random password based on the specified length. 
                    <br />
                    You can use it to create strong and secure passwords for your accounts.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Length</label>
                
                <input 
                    type="number"
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 mb-5'
                    value={length}
                    onChange={handleLengthChange}
                    min="1"
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleGenerateBtnClick}
                >
                    {generateBtnContent}
                </button>

                {errorMessage}

                <label className='block mb-3 text-slate-300'>Generated Password</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
        </Layout>
    );
}
