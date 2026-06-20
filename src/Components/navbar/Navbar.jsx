// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../../assets/name_logo.png'

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsScrolled(true);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollToSection = (sectionId) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed left-1/2 z-50 w-[calc(100%-var(--page-gutter)*2)] max-w-[var(--page-max-width)] -translate-x-1/2 transition-all duration-300 ${
        isScrolled ? "top-2" : "top-6"
      }`}
    >
      <nav className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="md:hidden interactive p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Open Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo & Mobile Resume Icon */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection("Homepage")}
              className="interactive flex items-center gap-2 group"
            >
              <img
                src={logo}
                alt="M.Waqar Logo"
                className="h-9 w-9 rounded-full object-contain object-center border-2 border-purple-400/50 transition-transform duration-300 group-hover:scale-110 shadow-sm bg-gray-800/20"
              />
              <span className="text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105">
                M. Waqar
              </span>
            </button>

            <Link
              to="/resume"
              className="md:hidden interactive rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-110"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("Homepage")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("About")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("FeaturedProj")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("Skills")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("Education")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection("Experience")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl  text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("Goals")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Goals
            </button>
            <button
              onClick={() => scrollToSection("Contact")}
              className="nav-link text-sm cursor-pointer font-medium px-4 py-1.5 rounded-xl text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:border-transparent"
            >
              Contact
            </button>
          </div>

          {/* Desktop Socials + Resume */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://github.com/MuhammadWaqar7615/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/muhammadwaqar7615/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.227 0 22.225 0z" />
              </svg>
            </motion.a>
            <Link
              to="/resume"
              className="interactive rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105"
            >
              Resume
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}