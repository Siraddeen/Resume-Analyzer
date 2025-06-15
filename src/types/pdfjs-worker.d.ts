// // src/types/pdfjs-worker.d.ts
// declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
//   const workerSrc: string;
//   export default workerSrc;
// }

declare module "pdfjs-dist/build/pdf.worker.min.mjs?url" {
  const src: string;
  export default src;
}
