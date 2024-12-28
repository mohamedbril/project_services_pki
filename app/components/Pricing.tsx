import Image from "next/image";
import Check from "../../public/assets/check.svg";
import CheckWhite from "../../public/assets/check-white.svg";
const Pricing = () => {
  return (
    <div className="px-5 lg:px-0 lg:container pt-14 sm:pt-32 mb-11" id="pricing">
      <h1 className="text-[#172026] text-[24px] font-medium text-center mb-4">
        Plans flexibles pour vous
      </h1>
      <p className="text-center text-[#36485C] text-[16px] mb-10">
        Pas de frais cachés!
      </p>
      <div className="flex flex-col lg:flex-row gap-y-7 lg:gap-x-6">
        <div className="w-full bg-[#F5F4FF] p-6 rounded flex flex-col lg:justify-between">
          <div>
          <h1 className="text-[#4328EB] text-[18px] mb-3 font-medium">
            Essai Gratuit
          </h1>
          <p className="text-[#36485C] text-[16px] mb-3 font-medium">
            Parfait pour tester les eaux
          </p>
          <h1 className="text-[#172026] text-[24px] mb-3 font-medium">
            0 DH <span className="text-[#5F7896]">/mo</span>
          </h1>
          <ul className="space-y-2">
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Chiffrement
            </li>
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Déchiffrement
            </li>
            <li className="flex items-start gap-4 text-[16px] lg:text-[18px] text-primary">
              <Image src={Check} alt="check" /> Certificat
            </li>
          </ul>
          </div>
          <button className="text-[#4328EB] text-[16px] font-medium bg-[#fff] py-[14px] w-full mt-7">
            Commencer l'essai
          </button>
        </div>
        <div className="w-full bg-[#4328EB] p-6 rounded flex flex-col lg:justify-between">
          <div>
          <h1 className="text-[#FFFFFF] text-[18px] mb-3 font-medium">
            Business
          </h1>
          <p className="text-[#F4F8FA] text-[16px] mb-3 font-medium">
            Parfait pour tester les eaux
          </p>
          <h1 className="text-[#FFFFFF] text-[24px] mb-3 font-medium">
            500 DH <span className="text-[#F4F8FA]">/mo</span>
          </h1>
          <ul className="space-y-2">
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-[#F4F8FA]">
              <Image src={CheckWhite} alt="check" /> Coffre-fort
            </li>
            <li className="flex items-center gap-4 text-[16px] lg:text-[18px] text-[#F4F8FA]">
              <Image src={CheckWhite} alt="check" /> Auto génération de mot de passe
            </li>
            <li className="flex items-start gap-4 text-[16px] lg:text-[18px] text-[#F4F8FA]">
              <Image src={CheckWhite} alt="check" /> Plus de services de sécurité
            </li>
          </ul>
          </div>
          <button className="text-[#4328EB] text-[16px] font-medium bg-[#fff] py-[14px] w-full mt-7">
            Commencer
          </button>
        </div>
        <div className="w-full h-full relative bg-[#F5F4FF] p-6 rounded flex flex-col lg:justify-between">
          <div>
            <h1 className="text-[#4328EB] text-[18px] mb-3 font-medium">
              Entreprise
            </h1>
            <p className="text-[#36485C] text-[16px] mb-3 font-medium">
              Parfait pour tester les eaux
            </p>
            <h1 className="text-[#172026] text-[24px] mb-3 font-medium">
              Sur mesure <span className="text-[#5F7896]"></span>
            </h1>
            <p className="text-[16px] text-[#36485C] mb-3">
              Signature
            </p>
            <p className="text-[16px] text-[#36485C]">
              Plus de services de sécurité
            </p>
          </div>
          <button className="text-[#4328EB] text-[16px] font-medium bg-[#fff] py-[14px] w-full mt-7">
            Commencer l'essai
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
