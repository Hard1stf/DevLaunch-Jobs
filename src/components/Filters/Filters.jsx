const Filters = ({
  selectedType,
  setSelectedType,
  selectedCompany,
  setSelectedCompany,
  selectedSkill,
  setSelectedSkill,
}) => {
  const filtersByType = ['All', 'Internship', 'Full-time'];
  const filtersByCompany = [
    'All',
    'Arcadia Labs',
    'CloudNine',
    'QuantumLeap',
    'ByteFlow',
    'GreenGrid',
    'DataSphere',
    'TechWave',
    'CodeVibe',
    'NovaStack',
    'PixelForge',
  ];
  const filtersBySkill = [
    'All',
    'React',
    'TailwindCSS',
    'CSS',
    'HTML',
    'JavaScript',
    'Figma',
    'Python',
    'REST APIs',
    'Linux',
    'Django',
    'PostgresSQL',
    'Docker',
    'Prototyping',
    'Adobe',
    'Adobe XD',
    'AWS',
    'Kubernetes',
    'Node.js',
    'Git',
    'Testing',
    'Selenium',
    'Java',
    'Automation',
    'Pandas',
    'SQL',
    'Data Visualization',
    'React Native',
    'Firebase',
    'Go',
    'MongoDB',
  ];

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
        <div className="max-w-4xl gap-4 mx-auto flex justify-evenly flex-wrap rounded-full mt-10 text-lg">
          {filtersBySkill.map((filter) => (
            <button
              onClick={() => setSelectedSkill(filter)}
              className={`border font-semibold cursor-pointer bg-slate-800 py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${selectedSkill === filter ? 'text-slate-900 bg-cyan-500' : 'text-white'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="max-w-4xl gap-2 mx-auto flex justify-evenly flex-wrap rounded-full mt-10 text-lg">
          {filtersByCompany.map((filter) => (
            <button
              onClick={() => setSelectedCompany(filter)}
              className={`border font-semibold cursor-pointer bg-slate-800 py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${selectedCompany === filter ? 'text-slate-900 bg-cyan-500' : 'text-white'}`}
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
// bg-slate-800 text-slate-300
