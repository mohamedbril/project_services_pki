"use client";
import * as Accordion from "@radix-ui/react-accordion";
import PlusIcon from "../../public/assets/Plus.svg";
import Image from "next/image";
import Minus from "../../public/assets/Minus.svg";
import { useState } from "react";
const items = [
  {
    question: "Quels algorithmes de chiffrement proposez-vous?",
    answer:
      "Nous proposons une variété d'algorithmes de chiffrement, y compris AES, RSA, et ECC. Chaque algorithme a ses propres avantages et est utilisé en fonction des besoins spécifiques de sécurité.",
  },
  {
    question: "Comment puis-je déchiffrer des données chiffrées?",
    answer:
      "Pour déchiffrer des données, vous devez utiliser la clé privée correspondante au chiffrement asymétrique ou la même clé secrète pour le chiffrement symétrique. Notre service fournit des outils pour faciliter ce processus.",
  },
  {
    question: "Offrez-vous des services de génération de certificats?",
    answer:
      "Oui, nous offrons des services de génération de certificats. Vous pouvez générer des certificats SSL/TLS pour sécuriser vos communications en ligne. Nous supportons également la génération de certificats pour la signature de code et d'autres usages.",
  },
  {
    question: "Comment puis-je m'assurer que mes données sont sécurisées?",
    answer:
      "Nous utilisons des protocoles de sécurité avancés et des algorithmes de chiffrement robustes pour garantir que vos données sont protégées contre les accès non autorisés. De plus, nous recommandons l'utilisation de mots de passe forts et l'activation de l'authentification à deux facteurs.",
  },
  {
    question: "Quels autres services de sécurité proposez-vous?",
    answer:
      "En plus du chiffrement et de la génération de certificats, nous offrons des services de gestion des clés, des audits de sécurité, et des conseils en matière de conformité réglementaire pour vous aider à maintenir un haut niveau de sécurité.",
  },
];
const Faq = () => {
  const [value, setValue] = useState("item-1");

  const handleTrigger = (item: any) => {
    const itemVal = `item-${item}`;
    if (itemVal === value) {
      setValue("");
    } else {
      setValue(itemVal);
    }
  };

  return (
    <div className="px-5 lg:px-0 lg:container pt-14 sm:pt-32" id="faq">
      <div className="flex flex-col lg:flex-row lg:gap-x-6">
      <div className="lg:w-1/3">
        <p className="text-[#EB2891] font-medium text-[14px] lg:text[16px] my-4">
        Questions Fréquemment Posées
        </p>
        <h1 className="text-medium text-info text-[24px] lg:text-[42px] mb-4">
        Clarifions certaines de vos questions
        </h1>
        <p className="text-[16px] lg:text-[18px] text-[#36485C] mb-6">
        Bienvenue dans notre section FAQ. Ici, nous répondons aux questions les plus fréquemment posées concernant nos services de chiffrement et de sécurité. Si vous avez d'autres questions, n'hésitez pas à nous contacter.
        </p>
      </div>
      <div className="lg:w-2/3">
        <Accordion.Root
        collapsible
        defaultValue="item-1"
        type="single"
        className="flex flex-col gap-y-4"
        >
        {items?.map((item, index) => (
          <div key={index} className="bg-[#E3F1FF] p-4">
          <Accordion.Item value={`item-${index + 1}`}>
            <Accordion.Header onClick={() => handleTrigger(index + 1)}>
            <Accordion.Trigger className="flex justify-between w-full items-center font-medium text-[16px] lg:text-[18px]">
              <p className="text-left">{item.question}</p>
              <span className="font-medium">
              <Image
                className="h-6 w-6"
                src={value === `item-${index + 1}` ? Minus : PlusIcon}
                alt="icône plus"
              />
              </span>
            </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
            <p className="mt-2 text-[16px] lg:text-[18px] text-[#36485C]">
              {item.answer}
            </p>
            </Accordion.Content>
          </Accordion.Item>
          </div>
        ))}
        </Accordion.Root>
      </div>
      </div>
    </div>
  );
};

export default Faq;
