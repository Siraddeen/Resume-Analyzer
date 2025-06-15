// // // src/utils/pdfUtils.ts
// // import * as pdfjsLib from "pdfjs-dist";
// // import worker from "pdfjs-dist/build/pdf.worker.entry";

// // (pdfjsLib as any).GlobalWorkerOptions.workerSrc = worker;

// // export const extractTextFromPDF = async (file: File): Promise<string> => {
// //   const arrayBuffer = await file.arrayBuffer();
// //   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
// //   let fullText = "";

// //   for (let i = 1; i <= pdf.numPages; i++) {
// //     const page = await pdf.getPage(i);
// //     const textContent = await page.getTextContent();
// //     const pageText = textContent.items.map((item: any) => item.str).join(" ");
// //     fullText += pageText + "\n";
// //   }

// //   return fullText;
// // };
// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs";

// (pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export const extractTextFromPDF = async (file: File): Promise<string> => {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//   let fullText = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item: any) => item.str).join(" ");
//     fullText += pageText + "\n";
//   }

//   return fullText;
// };
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};
