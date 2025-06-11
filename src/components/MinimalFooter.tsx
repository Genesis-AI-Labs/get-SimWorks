const MinimalFooter = () => {
  return (
    <footer className="bg-black py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} SimWorks. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition-colors duration-300">About</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Contact</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter; 