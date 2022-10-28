import React from 'react'

export default function CardsContainer(props) {
  return (
    <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto p-7 lg:px-16 xl:px-24 mt-10 gap-12 '>
        {props.children}
    </div>
  )
}
