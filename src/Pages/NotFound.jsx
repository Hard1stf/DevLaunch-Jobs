import { IoRocketSharp } from 'react-icons/io5';
import NotFound404 from '../assets/NotFound-404.png';
import Layout from '../components/layout/Layout';
import Button from '../components/UI/Button';

const NotFound = () => {
  return (
    <>
      <Layout>
        <section className="flex flex-col items-center justify-center px-4 py-20">
          <div className="relative group">
            <img src={NotFound404} alt="404-not-found" className="max-w-2xl" />
            <Button className="bg-transparent rounded-lg absolute bottom-24 transition-all duration-500 group-hover:bg-pink-800 group-hover:text-white left-56 uppercase text-pink-800 font-semibold tracking-widest border-2 border-pink-800 px-4 py-2">
              <a href={`/`} className="flex items-center gap-3">
                <IoRocketSharp className="text-2xl" />
                Go back Home
              </a>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
