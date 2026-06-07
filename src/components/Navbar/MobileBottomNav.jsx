import { GoHomeFill, GoBookmarkFill } from 'react-icons/go';
import { IoLogoGithub } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const MobileBottomNav = ({savedJobs = []}) => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-cyan-400'
      : 'hover:text-cyan-400 transition-colors duration-300';

  return (
    <>
      <nav className="lg:hidden fixed z-50 bottom-0 left-0 right-0 w-full border-t-2 px-4 py-2 bg-slate-950/80 border-slate-800 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-2 flex justify-evenly items-center">
          <NavLink to="/" end className={navLinkStyle}>
            <GoHomeFill className="size-6" />
          </NavLink>
          <NavLink to="/saved-jobs" className={navLinkStyle}>
            <div className='relative flex items-center justify-center'>
                <GoBookmarkFill className="size-6" />
                <span className="absolute -top-2 -right-2 min-w-4 h-4 flex justify-center items-center px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-bold self-center">{savedJobs?.length || 0}</span>
            </div>
            </NavLink>
          <a
            href="https://github.com/Hard1stf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoGithub className="size-6" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;
