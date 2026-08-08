import { IoRocketSharp } from 'react-icons/io5';
import NotFound404 from '../assets/NotFound-404.png';
import Layout from '../components/layout/Layout';
import Button from '../components/UI/Button';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ savedJobs }) => {

  useEffect(() => {
    document.title = 'Page Not Found | DevLaunch Jobs';
  }, []);

  return (
    <>
      <Layout savedJobs={ savedJobs }>
        <section className="flex flex-col items-center justify-center px-4 py-20">
          <div className="group flex flex-col items-center gap-6">
            <img src={NotFound404} alt="404-not-found" className="w-full max-w-sm md:max-w-2xl" />
            <Link to={`/`} className="flex items-center gap-3">
              <Button className="bg-transparent rounded-lg transition-all duration-500 group-hover:bg-pink-800 group-hover:text-white uppercase text-pink-800 font-semibold tracking-widest border-2 border-pink-800">
              <span className='flex items-center gap-3'>
                <IoRocketSharp className="text-2xl" />
                Go back Home
              </span>
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
