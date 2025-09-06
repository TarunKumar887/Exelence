import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { useTheme } from "../Context/themeContext";
import { useUser } from "../Context/userContext";
import { ChartBar, Lock, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Homepage = () => {
  const { isDark } = useTheme();
  const { user } = useUser();

  const features = [
    {
      main: "Advanced Analytics",
      sub: "Automatic statistical analysis, trend detection, and predictive insights from your spreadsheet data.",
      icon: <LineChart className="h-8 w-8 text-green-400" />,
    },
    {
      main: "Beautiful Visualizations",
      sub: "Transform rows of data into interactive charts and graphs that make patterns instantly visible.",
      icon: <ChartBar className="h-8 w-8 text-green-400" />,
    },
    {
      main: "Secure Processing",
      sub: "Your data is encrypted during upload and processing. We never store your files longer than necessary.",
      icon: <Lock className="h-8 w-8 text-green-400" />,
    },
  ];

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen pt-[8vh] ${
          isDark
            ? "bg-gray-900"
            : "bg-gradient-to-br from-green-50 via-green-100 to-blue-50"
        }`}
      >
        {/* Hero Section */}
        <section
          className={`py-16 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            {user && (
              <h2 className="text-2xl md:text-3xl font-semibold text-green-500 mb-4">
                Hi{" "}
                {user.name ||
                  user.username ||
                  user.email?.split("@")[0] ||
                  "User"}{" "}
                👋
              </h2>
            )}

            <h1
              className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Simplify Your{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Excel Data
              </span>{" "}
              Into Clear Insights
            </h1>
            <p
              className={`text-lg md:text-xl mb-8 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Upload your files and watch them transform into visual dashboards,
              trends, and summaries in moments.
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Upload Your Files Here
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 
      010 1.414l-4 4a1 1 0 
      01-1.414-1.414L12.586 11H5a1 1 0 
      110-2h7.586l-2.293-2.293a1 1 0 
      010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Excel Icon with Animation */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.img
              src="/assets/excel.png"
              alt="Excel data visualization"
              className="w-[80%] max-w-lg rounded-3xl shadow-2xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`py-20 px-6 lg:px-12 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-12 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Powerful Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600 shadow-xl"
                      : "bg-gradient-to-br from-green-50 via-green-100 to-blue-50 border border-gray-200 shadow-md hover:shadow-2xl"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.main}
                  </h3>
                  <p
                    className={`text-base ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`py-20 px-6 text-center ${
            isDark
              ? "bg-gray-900"
              : "bg-gradient-to-r from-green-400 to-blue-400"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to unlock insights from your data?
            </h2>
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Footer Section */}
        <footer
          className={`py-6 text-center ${
            isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}
        >
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-500 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-500 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-green-500 transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Exelence. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
