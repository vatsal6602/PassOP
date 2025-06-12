import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-10 h-14'>
        <div className='logo font-bold text-xl'>

            <span className='text-blue-500'>&lt;</span>
            Pass
            <span className='text-blue-500'>OP/&gt;</span>
            
            
            </div>
        {/* <ul>
            <li className='flex gap-4'> 
                <a className="hover:font-bold" href="#">Home</a>
                <a className="hover:font-bold" href="#">About</a>
                <a className="hover:font-bold" href="#">Contact</a>
            </li>
        </ul> */}
        <button className='text-white  flex justify-center items-center cursor-pointer'>
          <img className='p-1 w-7' src="/icons/github.png" alt="github logo" />
          <span className='text-black px-1'><a href="https://github.com/vatsal6602" target='_blank'>Github</a></span>
        </button>
    </nav>
  )
}

export default Navbar