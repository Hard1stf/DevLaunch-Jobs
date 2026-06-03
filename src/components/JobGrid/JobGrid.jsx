import JobCard from '../JobCard/JobCard';
import EmptyState from '../UI/EmptyState';

const JobGrid = ({jobs, savedJobs, toggleSaveJobs }) => {

  if(jobs.length === 0){
    return(
      <>
        <EmptyState 
          title={"No Job found"} 
          desc={"We couldn't find any jobs matching your current search and filters."}
        />
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
