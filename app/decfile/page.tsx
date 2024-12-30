"use client";

import { useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";

export default function DecFile() {
  const [file, setFile] = useState<File | null>(null);
  const [passphrase, setPassphrase] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | JSX.Element>("");
  const [decryptBtnContent, setDecryptBtnContent] = useState<string | JSX.Element>("Decrypt");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handlePassphraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassphrase(e.target.value);
  };

  const handleDecrypt = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrorMessage("");
    setDecryptBtnContent(<Loader />);

    if (!file) {
      setErrorMessage(<ErrorMessage>No file selected</ErrorMessage>);
      setDecryptBtnContent("Decrypt");
      return;
    }

    if (!passphrase) {
      setErrorMessage(<ErrorMessage>No passphrase provided</ErrorMessage>);
      setDecryptBtnContent("Decrypt");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("passphrase", passphrase);

    try {
      const response = await axios.post("/api/dec_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "decrypted_file");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>);
    }

    setDecryptBtnContent("Decrypt");
  };

  return (
    <Layout>
      <AlgorithmHeader name="File Decryption">
        <p className="text-center">
          Use our decryption service to access your encrypted files. Select a file, provide a passphrase, and click "Decrypt" to start.
        </p>
      </AlgorithmHeader>

      <div className="max-w-3xl m-auto text-center">
        <label className="block mb-3 text-slate-300">Select File</label>
        <input type="file" onChange={handleFileChange} className="block w-full text-slate-300 mb-5 mx-auto" />

        <label className="block mb-3 text-slate-300">Passphrase</label>
        <input type="text" value={passphrase} onChange={handlePassphraseChange} className="block w-full text-slate-300 mb-5 mx-auto" />

        <button
          className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5"
          onClick={handleDecrypt}
        >
          {decryptBtnContent}
        </button>

        {errorMessage}
      </div>
    </Layout>
  );
}