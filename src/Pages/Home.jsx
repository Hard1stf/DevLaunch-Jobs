import { useEffect, useState } from 'react';
import Filters from '../components/Filters/Filters';
import Hero from '../components/Hero/Hero';
import JobGrid from '../components/JobGrid/JobGrid';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import { jobs } from '../data/jobs';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [savedJobs, setSavedJobs] = useState(() => {
      const storedJobs = localStorage.getItem('savedJobs');

      return storedJobs ? JSON.parse(storedJobs) : [];
    }); // implementing lazy initialization, this will run once during initial renders.

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === "All" || job.type === selectedType;

        return matchesSearch && matchesType;
    });

    // Toggling the save job based on there id (job.id).
    const toggleSaveJobs = (jobId) => {
      if(savedJobs.includes(jobId)){
        setSavedJobs(savedJobs.filter(id => id !== jobId));
        // console.log("SavedJobs: ",savedJobs);
        // console.log("JobId: ",jobId);
      }else{
        setSavedJobs([...savedJobs, jobId])
        // console.log("SavedJobs: ",savedJobs);
        // console.log("JobId: ",jobId);
      }
    };

    // saving saved jobs in localstorage whenever savedJob changes.
    useEffect(() => {
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
    }, [savedJobs]);

  return (
    <>
      <div className="bg-black min-h-screen text-slate-300">
        <Navbar />
        <Hero />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters selectedType={selectedType} setSelectedType={setSelectedType} />
        <JobGrid jobs={filteredJobs} savedJobs={savedJobs} toggleSaveJobs={toggleSaveJobs}/>
      </div>
    </>
  );
};

export default Home;
