const Hero = () => {
  return (
    <>
      <div className="min-h-screen w-full flex-col flex items-center gap-20">
        <div className="flex flex-col items-center gap-5 mt-40 text-zinc-300">
          <h1 className="text-7xl font-bold">Find Your Next Frontend Internship</h1>
          <h3 className="text-xl font-semibold">Discover internships and freelance opportunities built for developers.</h3>
        </div>
        <div className="min-w-80 flex justify-between items-center text-white font-semibold">
            <button className="px-4 py-2 bg-white text-black border border-zinc-700 rounded-3xl">Explore Jobs</button>
            <button className="px-4 py-2 bg-transparent hover:bg-white hover:text-black rounded-3xl border">View Saved Jobs</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
