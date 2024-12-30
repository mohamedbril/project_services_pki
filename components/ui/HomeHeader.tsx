import Link from 'next/link'
import React from 'react'

function HomeHeader() {
  return (
    <div className='container m-auto p-2'>
      <header className='relative'>
        <div className='relative mt-9 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
            <h1 className='font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center'>
            Chiffrez facilement vos textes en utilisant les algorithmes les plus connus.
            </h1>

            <p className='mt-6 text-lg text-center max-w-3xl mx-auto text-slate-400'>
            Découvrez notre service de cybersécurité pour le chiffrement et le déchiffrement de vos données sensibles. <br />
            Pour des instructions détaillées, <Link href="https://github.com/mohamedbril/" className='underline'>lisez la documentation</Link>!
            </p>
          
          <p className='mt-3 text-sm text-center max-w-3xl mx-auto text-slate-500'>
            Created by <a href='https://github.com/mohamedbril/' className="underline" target="_blank" rel="noopener noreferrer">SecPlus</a>.
          </p>
        </div>
      </header>
    </div>
  )
}

export default HomeHeader