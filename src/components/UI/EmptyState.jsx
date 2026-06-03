
const EmptyState = ({ title, desc, action }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-24 text-center">
      {action?.icon}
        <h1 className="mt-4 text-3xl font-bold text-white">
            {title}
        </h1>
        <p className="mt-2 text-slate-400">{desc}</p>

        {action?.button}
      </div>
    </>
  );
};

export default EmptyState;
