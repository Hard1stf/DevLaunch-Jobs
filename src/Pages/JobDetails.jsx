import { useParams } from 'react-router-dom';
import { jobs } from '../data/jobs';
import {
  IoTime,
  IoLocationSharp,
  IoBookmark,
  IoBookmarkOutline,
} from 'react-icons/io5';
import Layout from '../components/layout/Layout';

const JobDetails = ({ savedJobs, toggleSaveJobs }) => {
  const { id } = useParams();

  const job = jobs.find((job) => job.id === Number(id));
  
  if(!job){
    return(
      <>
      <Layout>
        <div className="flex justify-center items-center text-white">
          <h1 className="text-3xl font-bold">
            Job not found
          </h1>
        </div>
      </Layout>
      </>
    );
  }

  const isJobSaved = savedJobs.some(savedJob => savedJob.id === job.id)
  
  return (
    <>
    <Layout>
      <section className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl h-fit mt-10 relative border-slate-700 border px-4 p-8 flex flex-col gap-4">
          <div className="w-fit absolute flex items-center justify-center top-10 right-5">
            <button onClick={() => toggleSaveJobs(job.id)}>
              {isJobSaved ? <IoBookmark className="text-3xl" /> : <IoBookmarkOutline className="text-3xl" />}
            </button>
          </div>
          {/* Head section */}
          <div className="flex flex-col gap-1 pb-8 border-b border-slate-700 text-slate-200 text-lg">
            <h1 className="font-bold uppercase text-4xl">{job.role}</h1>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex gap-2">
                <span className="font-semibold">{job.company}</span>•
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-fir flex py-1 px-3 justify-between border gap-2 rounded-full items-center">
                  <IoTime />
                  <span className="font-semibold text-base tracking-tighter">
                    {job.posted}
                  </span>
                </div>
                <div className="w-fit flex py-1 px-3 justify-between border gap-2 rounded-full items-center">
                  <IoLocationSharp />
                  <span className="font-semibold text-base tracking-tighter">
                    {job.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Neck section */}
          <div className="flex flex-col gap-2 border-b pb-8 border-slate-700">
            <span className="font-semibold">{job.salary}</span>
            <p className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="border-2 font-semibold rounded-full py-2 px-4">
                  {skill}
                </span>
              ))}
            </p>
          </div>
          {/* Body section */}
          <div className="group flex flex-col gap-2">
            <h2 className="font-semibold text-2xl">About the job</h2>
            <p className="border-transparent border-l-2 group-hover:border-slate-400 pl-2">{job.description}</p>
            <p className="ml-2 flex flex-col gap-2">
              <span className="font-semibold text-lg">Requirements:</span>
              {job.requirements.map((req, idx) => (
                <span key={idx} className="border-transparent border-l-2 transition-all duration-300 px-2 hover:border-slate-400">
                  {req}
                </span>
              ))}
            </p>
          </div>
          {/* Lower Section */}
          <div className="flex justify-center items-center gap-4">
            <button className="w-full mt-auto px-3 py-2 bg-slate-400 text-slate-900 font-semibold rounded-2xl">
              Apply now
            </button>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default JobDetails;
