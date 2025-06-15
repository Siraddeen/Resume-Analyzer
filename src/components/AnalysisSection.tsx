import React, { useState, useEffect } from "react";

interface AnalysisProps {
  text: string;
}

const Analysis: React.FC<AnalysisProps> = ({ text }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedMode ? savedMode === "true" : prefersDark;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100";
    toast.textContent = "Analysis copied to clipboard!";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = "translateY(100%)";
      toast.style.opacity = "0";
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const formatText = (text: string) => {
    return text
      .replace(
        /\*\*(.*?)\*\*/g,
        "<span class='font-semibold text-indigo-600 dark:text-indigo-400'>$1</span>"
      )
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-600 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700">
        <div className="p-6 border-b border-indigo-100 dark:border-gray-700 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white">
                Analysis Results
              </h2>
              <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-white/90 dark:bg-white/10 dark:text-white rounded-full">
                AI Powered
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-white hover:text-indigo-100 rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-800 dark:to-gray-900">
          <div
            className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed space-y-4 overflow-y-auto max-h-[600px] whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatText(text) }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
