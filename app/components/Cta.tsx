import Image from "next/image";
import Link from "next/link";
import React from "react";
import RedArrow from "../../public/assets/RedArrow.svg";

const Cta = () => {
  return (
    <div className="px-4 lg:px-0 lg:container my-24 lg:my28">
      <div
        className="px-[32px] py-[56px]  bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-xl"
        id=""
      >
        <h1 className="text-center text-[32px] lg:text-[56px] font-medium text-white lg:max-w-[628px] m-auto">
          Protégez votre site web avec notre service de cybersécurité
        </h1>
        <p className="text-center text-[16px] lg:text-[18px] text-white my-10 lg:my-11">
          {/* Rejoignez plus de 800 propriétaires de sites heureux en boostant la productivité et l'efficacité ! */}
        </p>
        <div className="flex justify-center items-center gap-x-6 lg:gap-x-10">
          <button className="bg-[#fff] py-3 px-6 text-[16px] lg:text-[18px] font-medium text-[#EB2891] rounded">
            Essayez gratuitement
          </button>

          <Link
            className="flex items-center gap-x-3 font-medium text-[#fff] text-[16px] lg:text-[18px]"
            href="#pricing"
          >
            Voir les tarifs <Image src={RedArrow} alt="RedArrow" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cta;
