import { LuFolderGit2 } from "react-icons/lu";
import Button from "../UI/Button";

const Footer = () => {
    return(
        <>
            <footer className="group min-h-fit flex flex-col justify-center items-center gap-5 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                <p>
                    Build with React & Tailwind CSS
                </p>
                <Button className="border-2 bg-transparent border-transparent font-semibold transition-all duration-500 group-hover:border-pink-700 hover:bg-pink-700 text-white hover:text-white rounded-full px-4 py-2">
                    <a href={`https://github.com/Hard1stf/DevLaunch-Jobs`} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center group-hover:text-white">
                        <LuFolderGit2 className="text-lg"/> <span>Repository</span>
                    </a>
                </Button>
            </footer>
        </>
    );
}

export default Footer;