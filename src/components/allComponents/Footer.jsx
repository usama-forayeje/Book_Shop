function Footer() {
  return (
    <footer className="text-gray-400 bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-6 py-8 mx-auto">
        {/* Footer Content */}
        <p className="text-sm font-medium text-center">
          &copy; 2024{" "}
          <span className="transition-colors duration-300 text-primaryGreen hover:text-green-500">
            Usama Forayaje
          </span>
          . All rights reserved.
        </p>

        {/* Optional Social Links or Actions */}
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="#"
            aria-label="Follow Usama Forayaje on Twitter"
            className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
          >
            Twitter
          </a>
          <a
            href="#"
            aria-label="Follow Usama Forayaje on GitHub"
            className="text-gray-400 transition-colors duration-200 hover:text-gray-300"
          >
            GitHub
          </a>
          <a
            href="#"
            aria-label="Connect with Usama Forayaje on LinkedIn"
            className="text-gray-400 transition-colors duration-200 hover:text-blue-700"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-4 mt-6 border-t border-gray-700">
        <p className="text-xs text-center text-gray-500">
          Crafted with 💙 by Usama Forayaje. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
