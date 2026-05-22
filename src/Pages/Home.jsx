import { useState } from 'react';
import Filters from '../components/Filters/Filters';
import Hero from '../components/Hero/Hero';
import JobGrid from '../components/JobGrid/JobGrid';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import { jobs } from '../data/jobs';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState("All");

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "All" || job.type === selectedType;
        const matchesCompany = selectedCompany === "All" || job.company === selectedCompany;
        const matchesSkill = selectedSkill === "All" || job.skills.includes(selectedSkill);

        return matchesSearch && matchesType && matchesCompany && matchesSkill;
    });

  return (
    <>
      <div className="bg-black min-h-screen text-slate-300">
        <Navbar />
        <Hero />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters selectedType={selectedType} setSelectedType={setSelectedType} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
        <JobGrid jobs={filteredJobs}/>
      </div>
    </>
  );
};

export default Home;
