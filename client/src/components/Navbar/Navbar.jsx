import { HiAcademicCap } from 'react-icons/hi2';
import { NavLink } from "react-router-dom";

const Navbar = ({ savedJobs = [] }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkStyle = ({isActive}) => isActive ? "text-cyan-400" : "hover:text-cyan-400 transition-colors duration-300";

  return (
    <>
      <nav className="hidden lg:block sticky z-50 top-0 w-full border-b px-4 py-2 bg-slate-950/80 border-slate-800 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <NavLink to="/" end className="flex justify-center items-center rounded-full cursor-pointer">
            <HiAcademicCap className="text-white text-4xl rotate-12 transition-all duration-500 hover:rotate-0" />
          </NavLink>

          <div className="flex items-center gap-3 font-semibold">
            <NavLink to="/" end className={navLinkStyle}>Home</NavLink>
            <NavLink to="/saved-jobs" className={navLinkStyle}>
              Saved Jobs
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-cyan-500 text-black font-bold">{savedJobs?.length || 0}</span></NavLink>
            <a href="https://github.com/Hard1stf" target='_blank' rel="noopener noreferrer" className='cursor-pointer hover:text-cyan-400 transition-color duration-300'>GitHub</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
