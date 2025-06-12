import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {
  

  return (
    <>
      <div className="relative overflow-x-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-blue-90 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
        </div>

        {/* App Content */}
        <Navbar />
        <div className='min-h-[85vh] relative overflow-x-hidden'>
          <Manager />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
