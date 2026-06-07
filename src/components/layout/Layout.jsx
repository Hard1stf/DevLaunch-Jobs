import Footer from "../Footer/Footer";
import MobileBottomNav from "../Navbar/MobileBottomNav";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children, savedJobs }) => {
  return <>
    <div className="bg-black min-h-screen text-slate-300 flex flex-col pb-20 lg:pb-0">
        <Navbar savedJobs={savedJobs}/>
        <main className="flex-grow w-full">
            {children}
        </main>
        <Footer />
        <MobileBottomNav savedJobs={savedJobs}/>
    </div>
  </>;
};

export default Layout;