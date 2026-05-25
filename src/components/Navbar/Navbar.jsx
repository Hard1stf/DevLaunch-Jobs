import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky z-50 top-0 max-w-7xl mx-auto px-4 py-4 border-2 bg-slate-950/80 border-slate-800 rounded-b-xl backdrop-blur text-yellow-50">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center rounded-full cursor-pointer">
            <HiAcademicCap className="text-white text-4xl rotate-12 transition-all duration-500 hover:rotate-0" />
          </div>

          <div className="hidden md:flex items-center gap-3 font-semibold">
            <span className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>Home</span>
            <span className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>Saved Job</span>
            <span className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>GitHub</span>
          </div>

          <div className="md:hidden flex gap-4 items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <FaTimes className="size-6" />
                ) : (
                  <FaBars className="size-6" />
                )}
              </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className='md:hidden flex flex-col mt-4 gap-4 border-t border-slate-800 pt-4'>
            <span className='cursor-pointer'>Home</span>
            <span className='cursor-pointer'>Saved Job</span>
            <span className='cursor-pointer'>GitHub</span>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
