import React from 'react'
import Image from 'next/image'
import Logo from "../../public/assets/Logo.svg" // Ensure the correct path to the logo image

function LogoIcon() {
  return (
    <Image src={Logo} alt="Logo" />
  )
}

export default LogoIcon