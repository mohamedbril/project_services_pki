'use client'
import '../styles/globals.css'
import AsymmetricEncryptionCard from "../components/ui/AsymmetricEncryptionCard";
import CardsContainer from "../components/ui/CardsContainer";
import Divider from "../components/ui/Divider";
import HashCard from "../components/ui/HashCard";
import HomeHeader from "../components/ui/HomeHeader";
import SymmetricEncryptionCard from "../components/ui/SymmetricEncryptionCard";
import Layout from "../app/layout";
import Navbar from '../components/layout/Navbar';
import Link from 'next/link';

export default function services() {
  return (
    <>
    <div className="container m-auto p-2 px-4 sm:px-6 md:px-8">
      <Navbar/>
    </div>
    
      <HomeHeader />
      <CardsContainer>
        <SymmetricEncryptionCard 
            destination='/des'
            shortName='DES'
            name='Système de chiffrement des données'
            keyBits='56 bits'
            securityLevel='Faible'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/des',
              query: {triple: true}
            }}
            shortName='TDES'
            name='Triple DES'
            keyBits='168 bits'
            securityLevel='Moyen'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '128'}
            }}
            shortName='AES-128'
            name='Norme de chiffrement avancée'
            keyBits='128 bits'
            securityLevel='Élevé'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '192'}
            }}
            shortName='AES-192'
            name='Norme de chiffrement avancée'
            keyBits='192 bits'
            securityLevel='Élevé'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '256'}
            }}
            shortName='AES-256'
            name='Norme de chiffrement avancée'
            keyBits='256 bits'
            securityLevel='Très élevé'
          />

          <AsymmetricEncryptionCard 
            destination='/rsa'
            shortName='RSA'
            name='Rivest, Shamir, Adleman'
            keyBits='≥512 bit'
            securityLevel='Très élevé'
          />
          <SymmetricEncryptionCard 
            destination={{
              pathname: '/encfile',
              query: {bits: '128'}
            }}
            shortName='File Encryption'
            name='AES-256-enc'
            keyBits='128 bits'
            securityLevel='Élevé'
          />
          <SymmetricEncryptionCard 
            destination={{
              pathname: '/decfile',
              query: {bits: '128'}
            }}
            shortName='File Decryption'
            name='AES-256-dec'
            keyBits='128 bits'
            securityLevel='Élevé'
          />
      </CardsContainer>
      
      <Divider />
      <div className='container m-auto p-2'>
      <header className='relative'>
        <div className='relative mt-1 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
            <h1 className='font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center'>
            Appliquez facilement un hachage à vos textes grâce aux algorithmes les plus connus.
            </h1>
        </div>
      </header>
    </div>
      <CardsContainer>
            <HashCard 
              destination='/md5'
              shortName='MD5'
              name='Algorithme de résumé de message'
              securityLevel='Moyen'
              blockSize='128 bit'
              bruteforceTime='8 Heures'
            />

            <HashCard 
              destination={{
                pathname: '/sha',
                query: {v: 'SHA-1'}
              }}
              shortName='SHA-1'
              name='Algorithme de hachage sécurisé'
              securityLevel='Faible'
              blockSize='160 bit'
              bruteforceTime='Infini'
            />

            <HashCard 
              destination={{
                pathname: '/sha',
                query: {v: 'SHA-2'}
              }}
              shortName='SHA-2'
              name='Algorithme de hachage sécurisé'
              securityLevel='Élevé'
              blockSize='256 bit'
              bruteforceTime='Infini'
            />
      </CardsContainer>
      <Divider />
      <div className='container m-auto p-2'>
      <header className='relative'>
        <div className='relative mt-1 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
            <h1 className='font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center'>
            Générez facilement des certificats numériques et signez vos documents avec les algorithmes les plus reconnus.
            </h1>
        </div>
      </header>
    </div>
      <CardsContainer>

        <AsymmetricEncryptionCard 
            destination='/generate-certificate'
            shortName='Generate Certificate'
            name='Generate a certificate with a custom private key'
            keyBits='2048 bits'
            securityLevel='Très élevé'
          />
        <AsymmetricEncryptionCard 
            destination='/sign'
            shortName='Sign Document'
            name='Sign a document with a private key'
            keyBits='2048 bits'
            securityLevel='Très élevé'
          />
      </CardsContainer>
      <Divider />
      <div className='container m-auto p-2'>
      <header className='relative'>
        <div className='relative mt-1 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
            <h1 className='font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center'>
            Profitez facilement de nos autres services grâce aux algorithmes les plus fiables et performants.
            </h1>
        </div>
      </header>
    </div>
    <CardsContainer>
        <AsymmetricEncryptionCard 
            destination='/pass'
            shortName='Auto-Password'
            name='auto genrate password'
            keyBits='all'
            securityLevel='Très élevé'
          />
           <AsymmetricEncryptionCard 
            destination='/timestamp'
            shortName='timeStamp'
            name='Generating a timestamp.'
            keyBits='all'
            securityLevel='Très élevé'
          />
      </CardsContainer>
    </>
  )
}
