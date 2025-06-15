// src/App.tsx
import { useState } from "react";
import UploadSection from "./components/UploadSection";
import AnalysisSection from "./components/AnalysisSection";
import { analyzeResumeWithGemini } from "./utils/geminiUtils";

function App() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeResumeWithGemini(resumeText);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            Resume Analyzer
          </h1>
          <h5 className="text-4xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-purple-400 mb-4">
            by
          </h5>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-red-800 dark:from-blue-200 dark:to-rose-800 mb-4">
            Siraddeen
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered analysis and feedback
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300 hover:shadow-2xl">
            <UploadSection setResumeText={setResumeText} />
          </div>

          {resumeText && (
            <div className="text-center my-8">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`relative inline-flex items-center px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            </div>
          )}

          {analysis && (
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <AnalysisSection text={analysis} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
