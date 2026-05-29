import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return <>
    <div className="bg-black min-h-screen text-slate-300 flex flex-col">
        <Navbar />
        <main className="flex-grow w-full">
            {children}
        </main>
        <Footer />
    </div>
  </>;
};

export default Layout;