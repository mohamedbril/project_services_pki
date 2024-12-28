'use client'
import '../styles/globals.css'
import AsymmetricEncryptionCard from "../components/ui/AsymmetricEncryptionCard";
import CardsContainer from "../components/ui/CardsContainer";
import Divider from "../components/ui/Divider";
import HashCard from "../components/ui/HashCard";
import HomeHeader from "../components/ui/HomeHeader";
import SymmetricEncryptionCard from "../components/ui/SymmetricEncryptionCard";
import Layout from "../app/layout";

export default function services() {

  return (
    <>
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
      </CardsContainer>
      
      <Divider />

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
      <Divider/>
      <CardsContainer>
      <AsymmetricEncryptionCard 
            destination='/pass'
            shortName='Auto-Password'
            name='auto genrate password'
            keyBits='all'
            securityLevel='Très élevé'
          />
      </CardsContainer>
    </>
  )

}
