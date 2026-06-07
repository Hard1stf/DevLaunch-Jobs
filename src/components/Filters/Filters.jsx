import Button from "../UI/Button";

const Filters = ({ selectedType, setSelectedType }) => {
  const filtersByType = ['All', 'Internship', 'Full-time'];

  return (
    <>
      <div className="max-w-md mx-auto flex justify-evenly rounded-full mt-10 text-lg">
        {filtersByType.map((filter) => (
          <Button 
            key={filter}
            onClick={() => setSelectedType(filter)}
            className={`border font-semibold cursor-pointer py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${selectedType === filter ? 'text-cyan-500 border-cyan-500' : 'text-white'}`}
            variant="secondary"
          >
            {filter}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Filters;
