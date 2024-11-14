import { ClientInfo } from "../interfaces";

interface IProps {
  data: ClientInfo;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  fetchProducts: () => Promise<void>;
  isLoading: "pending" | "success" | "failed" | "idle";
}

const CheckoutPage = ({ data, setPage, fetchProducts, isLoading }: IProps) => {
  return (
    <>
      {data && (
        <div className="flex flex-col">
          <div className="bg-[#c8f3e7] h-52 w-full flex">
            <div className="h-full w-[30%] p-8 flex flex-col justify-start text-sm">
              <p>
                <b>GST Client :</b>
                {data.client_name.value}
              </p>
              <p>
                <b>GST Vendor :</b> {data.client_gst.value}
              </p>
              <p>
                <b>Date :</b> {data.date.value}
              </p>
              <p>
                <b>PO #</b> {data.po_number.value}
              </p>
            </div>
            <div className="h-full flex-1 flex p-2 justify-center items-center">
              <div className="bg-white flex-1 h-full pl-20 text-sm pt-4">
                <p className="font-bold uppercase font-sm p-2 pl-0">
                  shipped to
                </p>
                <p>Business name: {data.client_name.value}</p>
                <p>Address: {data.client_address.value}</p>
                <p>City: {data.client_city.value}</p>
                <p>Post Code: {data.client_postcode.value}</p>
                <p>Contact: {data.client_contact.value}</p>
              </div>
              <div className="bg-white flex-1 px-4 h-full text-sm pt-4">
                <p className="font-bold uppercase font-sm p-2 pl-0">
                  shipped from
                </p>
                <p>Vendor name: ABC vendor</p>
                <p>Address: ABC Center</p>
                <p>City: Mumbai</p>
                <p>Contact: +91 22 4462 2782</p>
              </div>
            </div>
          </div>
          <div className="w-full h-10 text-right py-8">
            <button
              className="bg-[#47d7ac] w-44 py-2 px-6 rounded-full font-semibold"
              onClick={() => {
                fetchProducts().then(() => {
                  setPage("products");
                  
                });

              }}
              disabled={isLoading === "pending"}
            >
              {isLoading === "idle" ||
              isLoading === "failed" ||
              isLoading === "success"
                ? "Search Products"
                : <div className="flex items-center">
                <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="ml-3">Searching</p></div>}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
