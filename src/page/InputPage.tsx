import {
  DropzoneInputProps,
  DropzoneRootProps,
  FileWithPath,
} from "react-dropzone";
import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import FileIcon from "../assets/Group 1.svg";
import UploadIcon from "../assets/upload-cloud-2-line.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IProps {
  isLoading: "pending" | "success" | "failed" | "idle";
  fetchHandwrittenData: (file: string | Blob) => Promise<void>;
  acceptedFiles: readonly FileWithPath[];
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
}

const InputPage = ({
  isLoading,
  fetchHandwrittenData,
  acceptedFiles,
  getInputProps,
  getRootProps,
}: IProps) => {
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    // Reset page count when new files are accepted
    setNumPages(0);
  }, [acceptedFiles]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const renderFileContent = (file: File) => {
    const fileType = file.type;
    const isPdf = fileType === "application/pdf";

    if (isPdf) {
      return (
        <div className="text-center">
          <p className="text-sm font-semibold">{file.name}</p>
          <Document file={file} onLoadSuccess={handleDocumentLoadSuccess}>
            {[...Array(numPages).keys()].map((_, i) => (
              <Page
                key={i}
                height={800}
                pageNumber={i + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      );
    }

    return (
      <div key={file.name} className="text-center">
        <p className="text-sm font-semibold">{file.name}</p>
        <img
          src={URL.createObjectURL(file)}
          alt="Uploaded file preview"
          className="h-80"
        />
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 pb-2">
        <span className="font-semibold">Select the file format:</span>
      </div>

      <div className="flex items-center justify-start p-4 gap-4">
        <img src={FileIcon} alt="File icon" className="h-10 w-10" />
        <p className="text-lg font-bold">Drop your files here</p>
      </div>

      <section className="container w-full text-center text-black rounded-md">
        {acceptedFiles.length === 0 ? (
          <div
            {...getRootProps({ className: "dropzone" })}
            className="m-2 border-[1.5px] border-black border-dashed border-opacity-20 p-6 cursor-pointer rounded-md"
          >
            <input {...getInputProps()} />
            <p className="text-gray-400 text-sm flex items-center justify-center gap-4">
              <img
                src={UploadIcon}
                alt="Upload icon"
                className="h-6 w-6 opacity-40"
              />
              Drag &amp; drop files here or click to select files
            </p>
          </div>
        ) : (
          <div
            {...getRootProps({ className: "dropzone" })}
            className="m-2 border-[1.5px] border-black border-dashed border-opacity-20 p-6 pb-0 cursor-pointer rounded-md flex flex-col gap-2"
          >
            <input {...getInputProps()} />
            <p className="text-gray-400 text-sm flex items-center justify-center gap-4">
              <img
                src={UploadIcon}
                alt="Upload icon"
                className="h-6 w-6 opacity-40"
              />
              Drag &amp; drop files here or click to select files
            </p>
            <div className="flex justify-center items-center">
              {acceptedFiles.map(renderFileContent)}
            </div>
          </div>
        )}
      </section>

      {acceptedFiles.length > 0 && (
        <div className="flex justify-end items-center mt-4">
          <button
            className="bg-[#47d7ac] py-2 px-6 rounded-full font-semibold"
            onClick={() => fetchHandwrittenData(acceptedFiles[0])}
            disabled={isLoading === "pending"}
          >
            {isLoading === "pending" ? (
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <p className="ml-3">Loading...</p>
              </div>
            ) : (
              "Get OCR Results"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default InputPage;
