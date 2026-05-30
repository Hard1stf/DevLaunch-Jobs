import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [savedJobs, setSavedJobs] = useLocalStorage('savedJobs', []); 

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
    ;
  
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