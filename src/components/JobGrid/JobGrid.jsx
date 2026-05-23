import JobCard from '../JobCard/JobCard';

const JobGrid = ({jobs, savedJobs, toggleSaveJobs }) => {

  if(jobs.length === 0){
    return(
      <>
        <div className='text-center py-20 text-slate-400'>
          <h2 className='text-3xl font-semibold'>No Job found</h2>
          <p className='mt-2'>
            Try adjusting your search and filter.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
    <div className='max-w-7xl mx-auto px-4 py-10 mt-16'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 items-stretch">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} savedJobs={savedJobs} toggleSaveJobs={toggleSaveJobs} />
        ))}
      </div>
    </div>
    </>
  );
};

export default JobGrid;
