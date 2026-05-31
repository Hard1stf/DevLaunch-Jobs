import { useState } from 'react';
import Filters from '../components/Filters/Filters';
import Hero from '../components/Hero/Hero';
import JobGrid from '../components/JobGrid/JobGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import Layout from '../components/layout/Layout';
import { filterJobs } from '../utils/filterJobs';
import { jobs } from '../data/jobs';

const Home = ({savedJobs, toggleSaveJobs}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    
    // passing jobs(jobs.js), searchTerm and selectedType to the filterJob.js utility function.
    const filteredJobs = filterJobs(jobs, searchTerm, selectedType);

  return (
    <>
      <Layout>
        <Hero />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters selectedType={selectedType} setSelectedType={setSelectedType} />
        <JobGrid jobs={filteredJobs} savedJobs={savedJobs} toggleSaveJobs={toggleSaveJobs}/>
      </Layout>
    </>
  );
};

export default Home;