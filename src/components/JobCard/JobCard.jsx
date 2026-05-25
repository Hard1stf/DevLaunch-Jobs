import { FaRegClock, FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

const JobCard = ({ job, savedJobs, toggleSaveJobs }) => {
  const isSaved = savedJobs.includes(job.id);

  return (
    <>
      <div className="bg-slate-900 h-full flex flex-col items-start gap-4 hover:shadow-md hover:shadow-slate-700 transition-all duration-500 ease-in-out hover:-translate-y-2 rounded-2xl p-4 text-slate-400 border">
        <div className="w-full flex justify-between">
          <div className="bg-black flex items-center gap-2 text-white px-3 py-1 rounded-2xl">
            <FaRegClock />
            <span>{job.posted}</span>
          </div>
          <p className="bg-slate-950 text-white border uppercase font-semibold text-md px-2 py-1 rounded-2xl flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
            <span>{job.location}</span>
          </p>
        </div>
        <div className="w-full flex flex-col flex-grow">
          <div>
            <h3 className="text-xl font-semibold">
              <span className="text-wrap text-white uppercase">{job.role}</span>
            </h3>
            <div className="flex gap-2 text-slate-200 font-semibold">
              <h1>
                <span>{job.company}</span>
              </h1>
              •<span className="font-normal">{job.type}</span>
            </div>
          </div>
          <div className="my-4 flex flex-col gap-4">
            <p>{job.salary}</p>
            <p className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  className="font-semibold text-md px-4 py-1 rounded-2xl bg-slate-800 text-white"
                  key={index}
                >
                  {skill}
                </span>
              ))}
            </p>
          </div>
          <div className="h-full flex justify-center items-center gap-4">
            <button className="w-full mt-auto px-3 py-2 bg-slate-400 text-slate-900 font-semibold rounded-2xl">
              Apply now
            </button>
            <button
              onClick={() => toggleSaveJobs(job.id)}
              className="w-fit mt-auto px-3 py-2 bg-slate-400 text-slate-900 font-semibold rounded-2xl"
            >
              {isSaved ? (
                <FaHeart className="text-2xl" />
              ) : (
                <FaRegHeart className="text-2xl" />
              )}
            </button>
            <button className="w-fit mt-auto group bg-slate-400 px-3 py-2 rounded-2xl">
              <Link to={`/jobs/${job.id}`}>
                <MdArrowOutward className="font-black text-slate-900 text-2xl transition-all duration-300 group-hover:translate-x-1"/>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;