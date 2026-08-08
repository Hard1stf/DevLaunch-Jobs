import SkeletonCard from './SkeletonCard';

const SkeletonGrid = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SkeletonGrid;
