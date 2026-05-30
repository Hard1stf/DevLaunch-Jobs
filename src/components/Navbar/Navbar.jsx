import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky z-50 top-0 w-full border-b px-4 py-4 bg-slate-950/80 border-slate-800 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={`/`} className="flex justify-center items-center rounded-full cursor-pointer">
            <HiAcademicCap className="text-white text-4xl rotate-12 transition-all duration-500 hover:rotate-0" />
          </Link>

          <div className="hidden md:flex items-center gap-3 font-semibold">
            <Link to={`/`} className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>Home</Link>
            <Link to={`/saved-jobs`} className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>Saved Job</Link>
            <a href={`https://github.com/Hard1stf`} target='_blank' rel="noopener noreferrer" className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>GitHub</a>
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
            <Link to={`/`} className='cursor-pointer'>Home</Link>
            <Link to={`/saved-jobs`} className='cursor-pointer'>Saved Job</Link>
            <a href={`https://github.com/Hard1stf`} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>GitHub</a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
