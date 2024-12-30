import Image from "next/image";
import CyberSecurityImage from "../../public/assets/ensa.jpg";
import Check from "../../public/assets/check.svg";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="px-5 lg:px-0 lg:container pt-14 sm:pt-32" id="aboutus">
      <div className="text-center mb-14">
        <h1 className="text-info font-medium text-[24px] lg:text-[42px] mb-6">
          À Propos de Nous
        </h1>
        <div className="w-1/2 mx-auto">
          <Image className="m-auto rounded-[60px]" src={CyberSecurityImage} alt="Cyber Security" />
        </div>
        <p className="text-primary text-[16px] lg:max-w-[800px] lg:text-[18px] mt-6 mb-6 mx-auto">
          Bienvenue sur notre site dédié aux services de cybersécurité. Développé par des étudiants de l'ENSA Marrakech, SecPlus offre des solutions complètes pour protéger vos données et vos systèmes contre les menaces numériques. Notre équipe d'experts utilise les technologies les plus avancées pour garantir la sécurité de vos informations sensibles. Faites confiance à notre expertise pour sécuriser votre environnement numérique.
        </p>
        <Link
          className="mt-6 flex items-center justify-center gap-3 font-medium text-[#0085FF] text-[16px]"
          href="https://ensa-marrakech.uca.ma/"
        >
          En savoir plus <Image src={Check} alt="check" />
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
