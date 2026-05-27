import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';

const SavedJobs = ({ savedJobs }) => {
  const savedJobData = jobs.filter((job) =>
    savedJobs.some((savedJob) => savedJob.id === job.id),
  );

  if(savedJobData.length === 0){
    return(
      <div className="min-h-screen bg-black flex justify-center items-center text-slate-400">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">
          No Saved Jobs
        </h2>

        <p className="mt-2">
          Save jobs to view them later.
        </p>
      </div>
    </div>
    );
  }

  return (
    <>
      <div className="w-full bg-black min-h-screen text-slate-100 flex justify-center">
        <div className="w-full lg:w-3/4 mt-10 p-4 overflow-x-auto">
          <table className="table-auto w-full border-separate border-spacing-1">
            <thead className="bg-slate-700 text-white font-semibold">
              <tr>
                <th>#JobId</th>
                <th>Role</th>
                <th>Posted</th>
                <th>Time</th>
                <th>Detail</th>
              </tr>
            </thead>

            <tbody className="text-white">
              {savedJobData.map((job) => {
                const savedInfo = savedJobs.find(savedJob => savedJob.id === job.id)
                return(
                <tr
                  key={job.id}
                  className="transition-all duration-300 hover:bg-gray-600"
                >
                  <td className="p-2 text-center">{job.id}</td>
                  <td className="p-2 text-center">{job.role}</td>
                  <td className="p-2 text-center">{job.posted}</td>
                  <td className='p-2 text-center flex flex-col'>
                    <span>
                      {new Date(savedInfo.savedAt).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(savedInfo.savedAt).toLocaleTimeString()}
                    </span>
                  </td> 
                  <td className="p-2 text-center">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="underline underline-offset-4"
                    >
                      View
                    </Link>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
