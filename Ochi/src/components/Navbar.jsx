import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = ["Home", "Problem Statement", "About Us", "Dashboard", "Contact us"];
  const paths = ["/Home", "/Problem_Statement", "/about-us", "http://localhost:5000", "/contact-us"];

  // ✅ Improved Scroll Behavior (Debounced)
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Auto-close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ Links Component
  const NavLinks = ({ isMobile = false }) => (
    <>
      {links.map((item, index) => {
        const isActive = location.pathname === paths[index];
        const isExternal = paths[index].startsWith("http");

        const linkContent = (
          <div
            className={`group relative text-lg font-semibold capitalize cursor-pointer px-3 py-1 rounded-md
              transition-all duration-300
              ${isMobile ? "block py-4 text-center border-b border-black/10 last:border-b-0" : ""}
              ${isActive ? "active-link" : "hover-underline"}
              hover:bg-black/5`}
          >
            <span
              className={`inline-block transition-transform duration-500 ${
                !isMobile && "group-hover:animate-rollIn"
              }`}
            >
              {item}
            </span>
          </div>
        );

        return isExternal ? (
          <a
            key={index}
            href={paths[index]}
            target="_self" // ✅ Changed to _self so it doesn't open in new tab
            rel="noopener noreferrer"
            className={isMobile ? "block" : ""}
          >
            {linkContent}
          </a>
        ) : (
          <Link key={index} to={paths[index]} className={isMobile ? "block" : ""}>
            {linkContent}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: show ? 0 : -100,
          opacity: show ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-[99] w-full px-5 md:px-20 py-4 md:py-6 font-[Neue Montreal] flex justify-between items-center
                   bg-white/70 backdrop-blur-md border-b border-white/40 shadow-md"
      >
        {/* ✅ Logo */}
        <div className="logo flex items-center space-x-2">
          
          <span className="hidden md:inline-block text-2xl font-bold text-green-800 tracking-wide">
            Dr.<span className="text-lime-600">Kissan</span>
          </span>
        </div>

        {/* ✅ Desktop Links */}
        <div className="hidden lg:flex links gap-10">
          <NavLinks />
        </div>

        {/* ✅ Mobile Hamburger Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative z-[100]"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            className="w-6 h-0.5 bg-green-900 mb-1.5 transition-all duration-300"
          />
          <motion.span
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-green-900 mb-1.5 transition-all duration-300"
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            className="w-6 h-0.5 bg-green-900 transition-all duration-300"
          />
        </button>
      </motion.div>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[98] lg:hidden"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-[99] w-80 h-full bg-white/95 backdrop-blur-xl border-l border-white/20 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full pt-24 pb-8">
                <NavLinks isMobile={true} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ CSS */}
      <style>{`
        .hover-underline {
          position: relative;
          color: inherit;
          text-decoration: none;
        }
        .hover-underline::after,
        .active-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease-in-out;
          border-radius: 1px;
        }
        .hover-underline::after {
          width: 0%;
        }
        .hover-underline:hover::after {
          width: 100%;
        }
        .active-link::after {
          width: 100%;
        }
        @keyframes rollIn {
          0% {
            transform: rotateX(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        .animate-rollIn {
          animation: rollIn 0.5s forwards;
        }
      `}</style>
    </>
  );
};
export default Navbar;