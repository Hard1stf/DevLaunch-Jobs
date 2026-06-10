import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import Layout from '../components/layout/Layout';
import EmptyState from '../components/UI/EmptyState';
import { useEffect } from 'react';

const SavedJobs = ({ savedJobs }) => {
  // Clone the saved jobs array and sort it in descending order by savedAt date,
  // so the most recently saved jobs appear first in the rendered list.
  const sortedSavedJobs = [...savedJobs].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  // For each saved job reference (each item here has only an `id` and `savedAt`),
  // look up the full job object from the main `jobs` array by matching the `id`.
  // The `.map(...)` call returns either the matching job object or `undefined` if
  // no job with that id exists anymore. The `.filter(Boolean)` step then removes
  // any falsy values (like `undefined`) so that we only keep the real job objects.
  // Because we started from `sortedSavedJobs`, the resulting `savedJobData` array
  // preserves that order (most recently saved first).
  const savedJobData = sortedSavedJobs
    .map((savedJob) => jobs.find((job) => job.id === savedJob.id))
    .filter(Boolean);
  
    useEffect(() => {
      document.title = 'Saved Jobs | DevLaunch Job';
    }, []);

  if (savedJobData.length === 0) {
    return (
      <Layout savedJobs={savedJobs}>
        <EmptyState
          title={'No Saved Jobs Yet'}
          desc={"Start saving jobs you're interested in and they'll appear here."}
          action={{
            button: (
              <Link to="/" className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black">
                Browse Jobs
              </Link>
            )
          }}
        />
      </Layout>
    );
  }

  return (
    <>
      <Layout savedJobs={savedJobs}>
        <section className="w-full flex justify-center px-4 py-10">
          <div className="w-full lg:w-3/4 mt-10 p-4 overflow-x-auto">
            <table className="min-w-[700px] table-auto w-full border-separate border-spacing-1">
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
                  const savedInfo = savedJobs.find(
                    (savedJob) => savedJob.id === job.id,
                  );
                  return (
                    <tr
                      key={job.id}
                      className="transition-all duration-300 hover:bg-gray-600"
                    >
                      <td className="p-2 text-center whitespace-nowrap">{job.id}</td>
                      <td className="p-2 text-center whitespace-nowrap">{job.role}</td>
                      <td className="p-2 text-center whitespace-nowrap">{job.posted}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <div className=" flex flex-col">
                          <span>
                            {new Date(savedInfo.savedAt).toLocaleDateString()}
                          </span>
                          <span>
                            {new Date(savedInfo.savedAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">
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
