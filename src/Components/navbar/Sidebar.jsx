import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const menuItems = [
    { name: "Home", id: "Homepage" },
    { name: "Projects", id: "FeaturedProj" },
    { name: "Skills", id: "Skills" },
    { name: "Contact", id: "Contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/MuhammadWaqar7615/",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammadwaqar7615/",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.227 0 22.225 0z" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (id) => {
    onClose();
    if (!isHome) {
      navigate("/");
      // Delay scroll slightly to allow navigation to Homepage first
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-[70] h-full w-full bg-[#0a0a1a]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full p-8">
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Navigation
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links with Staggered Animation */}
              <nav className="flex flex-col gap-6">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08 }}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left text-2xl font-semibold text-gray-200 hover:text-purple-400 transition-all hover:translate-x-2"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="mt-auto pt-8 border-t border-white/10">
                {/* Social Icons */}
                <div className="flex justify-center gap-8 mb-8">
                  {socialLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/resume");
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-lg font-medium text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
                >
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;