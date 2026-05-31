import { Link } from "react-router-dom";
import Button from "../UI/Button";

const Hero = () => {
  return (
    <>
      <div className="min-h-screen w-full flex-col flex items-center gap-20">
        <div className="flex flex-col items-center gap-5 mt-40 text-zinc-300">
          <h1 className="text-7xl font-bold">Find Your Next Frontend Internship</h1>
          <h3 className="text-xl font-semibold">Discover internships and freelance opportunities built for developers.</h3>
        </div>
        <div className="min-w-80 flex justify-between items-center text-white font-semibold">
            <Link to={'/'}><button className="px-4 py-2 bg-white text-black border border-zinc-700 rounded-2xl">Explore Jobs</button></Link>
            <Link to={`/saved-jobs`}><Button variant="outline">View Saved Jobs</Button></Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
