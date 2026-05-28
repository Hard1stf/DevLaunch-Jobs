import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import Layout from '../components/layout/Layout';

const SavedJobs = ({ savedJobs }) => {
  const savedJobData = jobs.filter((job) =>
    savedJobs.some((savedJob) => savedJob.id === job.id),
  );

  if(savedJobData.length === 0){
    return(
      <Layout>
        <div className="flex flex-col items-center text-slate-400">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              No Saved Jobs
            </h2>
            <p className="mt-2">
              Save jobs to view them later.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
    <Layout>
      <section className="w-full flex justify-center px-4 py-10">
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
                  <td className='p-2 text-center'>
                  <div className=' flex flex-col'>
                    <span>
                      {new Date(savedInfo.savedAt).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(savedInfo.savedAt).toLocaleTimeString()}
                    </span>
                  </div>
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
      </section>
    </Layout>
    </>
  );
};

export default SavedJobs;
