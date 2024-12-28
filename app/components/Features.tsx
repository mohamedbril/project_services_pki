import Image from "next/image";
import Feature1 from "../../public/assets/Hero13.png";
import Feature2 from "../../public/assets/Hero12.png";
import Feature3 from "../../public/assets/Hero11.png";
import Check from "../../public/assets/check.svg";
import bluebutton from "../../public/assets/blue-button.svg";
import greenButton from "../../public/assets/green-button.svg";
import pinkButton from "../../public/assets/pink-button.svg";
import Link from "next/link";
const Features = () => {
  return (
    <div className="px-5 lg:px-0 lg:container pt-14 sm:pt-32" id="features">
      <div className="sm:flex items-center mb-14">
        <div className="sm:w-1/2">
          <p className="text-[#0085FF] font-medium text-[16px] mb-2">
            Surveillance des ventes
          </p>
          <h1 className="text-info font-medium text-[24px] lg:max-w-[572px] lg:text-[42px]  mb-6">
            Simplifiez la surveillance de vos ventes
          </h1>
          <Image className="m-auto sm:hidden" src={Feature1} alt="Feature1" />
          <p className="text-primary text-[16px] lg:max-w-[500px] lg:text-[18px] mt-6 mb-6">
            Restez au top des choses et réorganisez votre processus de travail avec notre fonctionnalité révolutionnaire. Obtenez une vue d'ensemble avec notre tableau de bord personnalisable.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Surveillance des ventes en temps réel
            </li>
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Rapports détaillés et analytiques
            </li>
            <li className="flex items-start gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Intégration facile avec d'autres outils
            </li>
          </ul>
          <Link
            className="mt-6 flex items-center gap-3 font-medium text-[#0085FF] text-[16px]"
            href="#"
          >
            En savoir plus <Image src={bluebutton} alt="bluebutton" />
          </Link>
        </div>
        <div className="sm:w-1/2 hidden sm:block">
          <Image className="w-full" src={Feature1} alt="Feature1" />
        </div>
      </div>
      <div className="sm:flex sm:flex-row-reverse sm:gap-6 items-center sm:mt-20 mb-14">
        <div className="sm:w-1/2 sm:px-14">
          <p className="text-[#00A424] font-medium text-[16px] mb-2">
            Support client
          </p>
          <h1 className="text-info font-medium text-[24px] lg:text-[42px] mb-6">
            Restez en contact avec vos clients
          </h1>
          <Image className="m-auto sm:hidden" src={Feature2} alt="Feature2" />
          <p className="text-primary text-[16px] lg:max-w-[500px] lg:text-[18px] mt-6 mb-6">
            Restez au top des choses et réorganisez votre processus de travail avec notre fonctionnalité révolutionnaire. Obtenez une vue d'ensemble avec notre tableau de bord personnalisable.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Assistance 24/7
            </li>
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Réponses rapides et efficaces
            </li>
            <li className="flex items-start gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Support multicanal
            </li>
          </ul>
          <Link
            className="mt-6 flex items-center gap-3 font-medium text-[#00A424] text-[16px]"
            href="#"
          >
            En savoir plus <Image src={greenButton} alt="greenbutton" />
          </Link>
        </div>
        <div className="sm:w-1/2 hidden sm:block">
          <Image className="w-full" src={Feature2} alt="Feature2" />
        </div>
      </div>
      <div className="sm:flex items-center sm:mt-20 sm:mb-20 mb-14">
        <div className="sm:w-1/2 sm:pr-20">
          <p className="text-[#EB2891] font-medium text-[16px] mb-2">
            Surveillance de la croissance
          </p>
          <h1 className="text-info font-medium text-[24px] lg:text-[42px] mb-6">
            Surveillez les nouveaux abonnés de votre site
          </h1>
          <Image className="m-auto sm:hidden" src={Feature3} alt="Feature3" />
          <p className="text-primary text-[16px] lg:max-w-[500px] lg:text-[18px] mt-6 mb-6">
            Restez au top des choses et réorganisez votre processus de travail avec notre fonctionnalité révolutionnaire. Obtenez une vue d'ensemble avec notre tableau de bord personnalisable.
          </p>
          <div className="flex gap-6 items-center lg:mb-8">
            <div className="w-1/2">
                <h1 className="font-medium lg:text-[32px] text-[20px]">100+</h1>
                <p className="text-[16px] lg:text[18px] text-[#5F7896]">Nouveaux abonnés par jour</p>
            </div>
            <div className="w-1/2">
                <h1 className="font-medium lg:text-[32px] text-[20px]">800+</h1>
                <p className="text-[16px] lg:text[18px] text-[#5F7896]">Abonnés actifs</p>
            </div>
          </div>
          <Link
            className="mt-6 flex items-center gap-3 font-medium text-[#EB2891] text-[16px]"
            href="#"
          >
            En savoir plus <Image src={pinkButton} alt="pinkButton" />
          </Link>
        </div>
        <div className="sm:w-1/2 hidden sm:block">
          <Image className="w-full" src={Feature3} alt="Feature3" />
        </div>
      </div>
    </div>
  );
};

export default Features;
const EncryptionFeatures = () => {
  return (
    <div className="sm:flex items-center sm:mt-20 sm:mb-20 mb-14">
      <div className="sm:w-1/2 sm:pr-20">
        <p className="text-[#FF5733] font-medium text-[16px] mb-2">
          Service de chiffrement
        </p>
        <h1 className="text-info font-medium text-[24px] lg:text-[42px] mb-6">
          Protégez vos données avec notre service de chiffrement
        </h1>
        <Image className="m-auto sm:hidden" src={Feature3} alt="Feature3" />
        <p className="text-primary text-[16px] lg:max-w-[500px] lg:text-[18px] mt-6 mb-6">
          Assurez la sécurité de vos informations sensibles grâce à notre technologie de chiffrement avancée. Gardez vos données protégées contre les accès non autorisés.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
            <Image src={Check} alt="check" /> Chiffrement de bout en bout
          </li>
          <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
            <Image src={Check} alt="check" /> Algorithmes de chiffrement robustes
          </li>
          <li className="flex items-start gap-4 text-[16px] lg:text-[18px] text-primary">
            <Image src={Check} alt="check" /> Protection des données en transit et au repos
          </li>
        </ul>
        <Link
          className="mt-6 flex items-center gap-3 font-medium text-[#FF5733] text-[16px]"
          href="#"
        >
          En savoir plus <Image src={pinkButton} alt="pinkButton" />
        </Link>
      </div>
      <div className="sm:w-1/2 hidden sm:block">
        <Image className="w-full" src={Feature3} alt="Feature3" />
      </div>
    </div>
  );
};

export { EncryptionFeatures };