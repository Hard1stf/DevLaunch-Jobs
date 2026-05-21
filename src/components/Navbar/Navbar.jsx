const Navbar = () => {
  return (
    <>
      <nav className="sticky z-50 top-5 max-w-7xl max-h-24 mx-auto px-4 py-4 border-2 border-zinc-700 rounded-xl backdrop-blur-xl text-yellow-50">
        <div className="flex justify-between items-center">
            <span>Logo</span> 
            
            <span>Desktop-Links</span> 

            <span>Mobile-Menu-Button</span>
        </div>
        Mobile Menu
      </nav>
    </>
  );
};

export default Navbar;
