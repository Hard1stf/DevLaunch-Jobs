import { IoRocketSharp } from "react-icons/io5";
import NotFound404 from '../assets/NotFound-404.png';

const NotFound = () => {
    return(
        <>
            <div className='bg-black min-h-screen flex items-center justify-center'>
                <div className="relative group">
                    <img src={NotFound404} alt="404-not-found" className='max-w-2xl'/>
                    <button className='absolute bottom-24 transition-all duration-500 group-hover:bg-pink-800 group-hover:text-white left-56 uppercase text-pink-800 font-semibold tracking-widest border-2 border-pink-800 flex items-center gap-3 px-4 py-2 rounded-lg'>
                        <IoRocketSharp className="text-2xl"/>
                        Go back Home
                    </button>
                </div>
            </div>
        </>
    );
}

export default NotFound;