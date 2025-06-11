import React from 'react'

const footer = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='logo font-bold text-xl'>
        <span className='text-blue-500'>&lt;</span>
        Pass
        <span className='text-blue-500'>OP/&gt;</span>


      </div>
      <div className='flex justify-center items-center'>
        Created with <img className='w-7 mx-2' src="./Icons/heart.png" alt="" /> by Vatsal_Gupta
      </div>
    </div>
      
    </>
  )
}

export default footer