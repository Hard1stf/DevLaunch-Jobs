const Filters = ({ selectedType, setSelectedType}) => {
  const filtersByType = ['All', 'Internship', 'Full-time'];

  return (
    <>
      <div className="">
        <div className="max-w-md mx-auto flex justify-evenly rounded-full mt-10 text-lg">
          {filtersByType.map((filter) => (
            <button
              onClick={() => setSelectedType(filter)}
              className={`border font-semibold cursor-pointer bg-slate-800 py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${selectedType === filter ? 'text-slate-900 bg-cyan-500' : 'text-white'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filters;