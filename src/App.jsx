import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";

const App = () => {
  const [savedJobs, setSavedJobs] = useState(() => {
        const storedJobs = localStorage.getItem('savedJobs');
  
        return storedJobs ? JSON.parse(storedJobs) : [];
  }); // implementing lazy initialization, this will run once during initial renders.

  // Toggling the save job based on there id (job.id).
    const toggleSaveJobs = (jobId) => {
      const isSaved = savedJobs.some(job => job.id === jobId);
      if(isSaved){
        setSavedJobs(prev => prev.filter(job => job.id !== jobId))
      }else{
        setSavedJobs(prev => [
          ...prev,
          {
            id: jobId, 
            savedAt: new Date().toString(),
          }
        ]);
      }
      };

    // saving saved jobs in localstorage whenever savedJob changes.
    useEffect(() => {
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs))
    }, [savedJobs]);
  
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home savedJobs={savedJobs} toggleSaveJobs={toggleSaveJobs}/>}/>
      <Route path="/jobs/:id" element={<JobDetails savedJobs={savedJobs} toggleSaveJobs={toggleSaveJobs}/>}/>
      <Route path="/saved-jobs" element={<SavedJobs savedJobs={savedJobs}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;