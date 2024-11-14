interface IProps {
  page: string;
}
const Statusbar = ({ page }: IProps) => {
  return (
    <div className="bg-[#13294C] min-h-[calc(100vh-80px)] h-full md:w-52 w-full text-white md:p-8 md:flex md:flex-row flex flex-col md:gap-4">
      <div className="md:h-[60vh] h-[10vh] md:flex md:flex-col flex flex-row md:justify-start justify-center items-center md:gap-10 gap-20 text-xs md:text-base p-4">
        <div className="flex justify-center items-start md:h-full">
          <p>OCR Output</p>
        </div>
        <div className="flex md:h-full justify-center items-start">
          <p>
            Cart <br className="md:visible hidden" />
            Preparation
          </p>
        </div>
        <div className="flex md:h-full justify-center items-center">
          <p>
            Checkout &amp; <br className="md:visible hidden" />
            Confirmation
          </p>
        </div>
      </div>
      <div className="rounded-full h-[60vh] w-2 bg-[#1b445c] md:flex md:flex-col justify-start hidden">
        {(page == "input" || page == "ocr" || page == "checkout") && (
          <div className="h-[30%] bg-[#47d7ac] w-2 rounded-full"></div>
        )}
        {page == "products" && (
          <div className="h-[60%] bg-[#47d7ac] w-2 rounded-full"></div>
        )}
        {page == "cart" && (
          <div className="h-[100%] bg-[#47d7ac] w-2 rounded-full"></div>
        )}
      </div>
      <div className="md:hidden h-2 w-full bg-[#1b445c] flex">
        {page == "input" ||
          page == "ocr" ||
          (page == "checkout" && (
            <div className="h-2 w-[30%] bg-[#47d7ac]"></div>
          ))}
        {page == "products" && <div className="h-2 w-[60%] bg-[#47d7ac]"></div>}
        {page == "cart" && <div className="h-2 w-[100%] bg-[#47d7ac]"></div>}
      </div>
    </div>
  );
};

export default Statusbar;
