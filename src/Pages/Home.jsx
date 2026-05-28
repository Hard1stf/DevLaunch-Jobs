import { useState } from 'react';
import Filters from '../components/Filters/Filters';
import Hero from '../components/Hero/Hero';
import JobGrid from '../components/JobGrid/JobGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import { jobs } from '../data/jobs';
import Layout from '../components/layout/Layout';

const Home = ({savedJobs, toggleSaveJobs}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    
    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === "All" || job.type === selectedType;

        return matchesSearch && matchesType;
    });

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