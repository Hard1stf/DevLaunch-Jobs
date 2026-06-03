const ErrorMessage = ({ message }) => {
  return (
    <>
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-400">
          Something went wrong
        </h2>
        <p className="mt-2 text-slate-400">{message}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
