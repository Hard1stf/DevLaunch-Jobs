import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";

const App = () => {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/jobs/:id" element={<JobDetails />}/>
      <Route path="/saved-jobs" element={<SavedJobs />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;