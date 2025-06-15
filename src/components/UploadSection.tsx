// src/components/UploadSection.tsx
import { type ChangeEvent, useState, useCallback } from "react";
import { extractTextFromPDF } from "../utils/pdfUtils";

interface Props {
  setResumeText: (text: string) => void;
}

const UploadSection = ({ setResumeText }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      const text = await extractTextFromPDF(file);
      setResumeText(text);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type === "application/pdf") {
        setFileName(file.name);
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } else {
        alert("Please upload a PDF file.");
      }
    },
    [setResumeText]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          <div className="flex justify-center">
            <svg
              className={`w-12 h-12 transition-colors duration-300 ${
                isDragging ? "text-blue-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {fileName ? fileName : "Upload your resume"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag and drop your PDF file here, or click to browse
            </p>
          </div>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
