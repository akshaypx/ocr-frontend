import FileIcon from "../assets/Group 1.svg";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../assets/upload-cloud-2-line.svg";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IProps {
  fetchStandardTemplateData: (file: File) => Promise<void>;
  isLoading: "pending" | "success" | "failed" | "idle";
  fetchHandwrittenData: (file: string | Blob) => Promise<void>;
}

const InputPage = ({
  fetchStandardTemplateData,
  isLoading,
  fetchHandwrittenData,
}: IProps) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [isHandwritten, setIsHandwritten] = useState<boolean>(false);

  const [numPages, setNumPages] = useState<number>();
  // const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files = acceptedFiles.map((file: any) => {
    const fileType = file.type;
    // const isImage = fileType.startsWith("image/");
    const isPdf = fileType === "application/pdf";

    if (isPdf)
      return (
        <div className="text-center">
          <p className="text-sm font-semibold">{file.path}</p>
          {/* <p className="text-sm">
            Page {pageNumber} of {numPages}
          </p> */}
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {[...Array(numPages).keys()]
              .map((_, i) => i + 1)
              .map((page) => (
                <Page
                  height={400}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
          </Document>
        </div>
      );

    return (
      <li key={file.path} className="list-none">
        <p className="text-sm font-semibold">{file.path}</p>
        <img
          src={URL.createObjectURL(file)}
          alt="uploaded_image"
          className="h-80"
        />
      </li>
    );
  });


  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 pb-2">
        <span className="font-semibold">Select the file format :</span>
        <div className="flex gap-4">
          <label htmlFor="handwritten" className="flex gap-2">
            <input
              id="handwritten"
              type="radio"
              name="choice1"
              onChange={() => {
                setIsHandwritten(true);
              }}
            />
            Handwritten
          </label>
          <label htmlFor="standard" className="flex gap-2">
            <input
              id="standard"
              type="radio"
              name="choice1"
              defaultChecked
              onChange={() => {
                setIsHandwritten(false);
              }}
            />
            Standard
          </label>
        </div>
      </div>
      <div className="flex items-center justify-start p-4 gap-4">
        <img src={FileIcon} alt="" className="h-10 w-10" />
        <p className="text-lg font-bold">Drop your files here</p>
      </div>
      <div>
        <section className="container w-full text-center text-black rounded-md ">
          {files.length == 0 && (
            <div
              {...getRootProps({ className: "dropzone" })}
              className="m-2 border-[1.5px] border-black border-dashed border-opacity-20 p-6 cursor-pointer rounded-md"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400 text-sm flex items-center justify-center gap-4">
                <img src={UploadIcon} alt="" className="h-6 w-6 opacity-40" />
                Drag &amp; drop file here or click to select files
              </p>
            </div>
          )}
          {files.length > 0 && (
            // <aside className="px-4">
            //   <h4>{files[0]}</h4>
            //   <ul className="flex p-2 pl-0 gap-3">{files}</ul>
            // </aside>
            <div
              {...getRootProps({ className: "dropzone" })}
              className="m-2 border-[1.5px] border-black border-dashed border-opacity-20 p-6 pb-0 cursor-pointer rounded-md flex flex-col gap-2"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400 text-sm flex items-center justify-center gap-4">
                <img src={UploadIcon} alt="" className="h-6 w-6 opacity-40" />
                Drag &amp; drop file here or click to select files
              </p>
              <div className="flex justify-center items-center">{files[0]}</div>
            </div>
          )}
        </section>
      </div>
      {files.length > 0 && (
        <div className="flex justify-end items-center">
          <button
            className="bg-[#47d7ac] py-2 px-6 rounded-full font-semibold"
            onClick={() => {
              if (isHandwritten) fetchHandwrittenData(acceptedFiles[0]);
              else fetchStandardTemplateData(acceptedFiles[0]);
            }}
            disabled={isLoading === "pending"}
          >
            {isLoading === "pending" ? "Loading..." : "Get OCR Results"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InputPage;
