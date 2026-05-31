
export const filterJobs = (jobs, searchTerm, selectedType) => {
    
    // return the filter jobs(from jobs.js) based on searchTerm and selectedType values.
    return jobs.filter((job) => {
        const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === "All" || job.type === selectedType;

        return matchesSearch && matchesType;
    });
};