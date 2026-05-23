import { ImSearch } from "react-icons/im";

const SearchBar = ({ searchTerm, setSearchTerm }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        id=""
        name=""
        onSubmit={handleSubmit}
        className="max-w-sm border mx-auto p-2 flex justify-between items-center rounded-full"
      >
        <ImSearch className="text-3xl"/>
        <input
          placeholder="Search Role, Location, Company & Skills"
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="transition-all outline-none w-full bg-black px-4 py-2 text-white placeholder:italic"
        />
      </form>
    </>
  );
};

export default SearchBar;