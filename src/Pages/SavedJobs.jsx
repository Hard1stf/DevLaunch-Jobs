import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';

const SavedJobs = () => {
  const savedJobsIds = localStorage.getItem('savedJobs') || []; //this is become actual array.
  const savedJobData = jobs.filter((job) => savedJobsIds.includes(job.id));

  return (
    <>
      <div className="w-full bg-black min-h-screen text-slate-100 flex justify-center">
        <div className="w-1/2 mt-10 p-4">
          <table className="table-auto w-full border-separate border-spacing-1">
            <thead className='bg-slate-700 text-white font-semibold'>
              <tr>
                <th>#JobId</th>
                <th>Role</th>
                <th>Posted</th>
                {/* <th>Time</th> - Show Time when use saved the job. */}
                <th>Detail</th>
              </tr>
            </thead>

            {savedJobData.map((job) => (
              <tbody className="text-white">
                <tr key={job.id} className='transition-all duration-300 hover:bg-gray-600'>
                  <td className='p-2 text-center'>{job.id}</td>
                  <td className='p-2 text-center'>{job.role}</td>
                  <td className='p-2 text-center'>{job.posted}</td>
                  {/* <td>Time When user saved the job</td>  */}
                  <td className='p-2 text-center'><Link to={`/jobs/${job.id}`} className='underline underline-offset-4'>View</Link></td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
