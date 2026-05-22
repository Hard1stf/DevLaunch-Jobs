import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {

  const handleSubmittedSearch = (searchTerm) => {
    if (searchTerm === ""){
      alert('No jobs found.\nTry adjusting your search or filters.')
      setSearchTerm("");
    }
  };

  return (
    <>
      <form
        id=""
        name=""
        className="max-w-sm border mx-auto p-2 flex justify-between rounded-full"
      >
        <input
          placeholder="Search Role & Location •••"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="transition-all outline-none w-80 bg-black px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-zinc-800 text-white rounded-full"
          onClick={() => handleSubmittedSearch(searchTerm) }
        >
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
