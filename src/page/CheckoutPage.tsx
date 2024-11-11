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
                : "Searching..."}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
