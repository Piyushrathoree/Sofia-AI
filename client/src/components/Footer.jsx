import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Footer() {
  const handleClick = (e) => {
    e.preventDefault();
    toast.success("no content available");
  };

  return (
    <footer className="bg-darker border-t border-gray-dark -mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0 md:max-w-xs">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-gradient mb-4"
            >
              Sofia Ai
            </motion.div>
            <p className="text-text/60 text-sm">
              The next generation of AI conversation. Built with love by
              developers for developers.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-text font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/features"
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-text font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-text font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleClick}
                    className="text-text/60 hover:text-primary text-sm transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-dark">
          <p className="text-center text-sm text-text/60">
            © 2025 Sofia Ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
