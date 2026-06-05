import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkStyle = ({isActive}) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition-colors duration-300";

  return (
    <>
      <nav className="sticky z-50 top-0 w-full border-b px-4 py-4 bg-slate-950/80 border-slate-800 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" end className="flex justify-center items-center rounded-full cursor-pointer">
            <HiAcademicCap className="text-white text-4xl rotate-12 transition-all duration-500 hover:rotate-0" />
          </NavLink>

          <div className="hidden md:flex items-center gap-3 font-semibold">
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/saved-jobs" className={navLinkStyle}>Saved Job</NavLink>
            <a href="https://github.com/Hard1stf" target='_blank' rel="noopener noreferrer" className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>GitHub</a>
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
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/saved-jobs" className={navLinkStyle}>Saved Job</NavLink>
            <a href="https://github.com/Hard1stf" target='_blank' rel="noopener noreferrer" className='cursor-pointer'>GitHub</a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
