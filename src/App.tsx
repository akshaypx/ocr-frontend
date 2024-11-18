/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import InputPage from "./page/InputPage";
import DisplayTable from "./page/DisplayTable";
import {
  ClientInfo,
  FinalPayload,
  HandwrittenData,
  ItemsEntity,
  // OcrResponse,
  ProductsEntity,
  SearchResult,
  SearchResultsEntity,
} from "./interfaces";
import Header from "./components/ui/header/Header";
import Statusbar from "./components/ui/statusbar/Statusbar";
import CheckoutPage from "./page/CheckoutPage";
import ChooseItemsPage from "./page/ChooseItemsPage";
import CartPage from "./page/CartPage";
import HandwrittenTable from "./page/HandwrittenTable";
import Sidebar from "./components/ui/sidebar/Sidebar";
import { useDropzone } from "react-dropzone";
import { apiInstance } from "./utils/constants";
// import HWCart from "./page/HWCart";

interface SelectedProduct {
  productIndex: number;
  resultIndex: number;
  quantity: number;
}

// interface TransformedProduct {
//   productName: string;
//   originalQuantity: string;
//   selectedQuantity: number;
//   selectedResult: SearchResultsEntity | undefined;
// }

function App() {
  const [ocrData, setOcrData] = useState<ClientInfo | null>(null); //standard template data
  const [isLoading, setIsLoading] = useState<
    "pending" | "success" | "failed" | "idle"
  >("idle");
  const [page, setPage] = useState("input");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [secondData, setSecondData] = useState<HandwrittenData[]>([]); // ocr data
  const [hwProductsData, setHwProductsData] = useState<SearchResult | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const fetchProducts = async () => {
    try {
      const headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };
      if (ocrData) {
        setIsLoading("pending");
        const res = await fetch(`${apiInstance}/search`, {
          method: "POST",
          body: JSON.stringify({
            products: ocrData.products.map((product) => ({
              name: product.item.value,
              quantity: product.quantity.value,
            })),
          }),
          headers: headersList,
        });
        const searchData = await res.json();
        setSearchResult(() => {
          setIsLoading("success");
          return searchData;
        });
        console.log(searchData);
      }
    } catch (e) {
      console.log(e);
      setIsLoading("failed");
    }
  };

  const fetchHandwrittenData = async (file: string | Blob) => {
    // const url = `http://localhost:8001/send-ocr-image`;
    console.log(print);
    const url = `${apiInstance}/ocr`;
    const bodyContent = new FormData();
    console.log("File ->", file);
    // setLocalImage(file);
    bodyContent.append("file", file); // Use 'uploaded_file' as the key
    setIsLoading("pending");
    const response = await fetch(url, {
      method: "POST",
      body: bodyContent,
    });

    const d = await response.json();

    setIsLoading(() => {
      // const temp = d.map(
      //   ({ material, quantity, Material, Quantity, Confidence }) => ({
      //     Material: Material || material || "",
      //     Quantity: Quantity || quantity || "", // Use Quantity if present, otherwise use quantity
      //     Confidence: Confidence,
      //   })
      // );
      // setSecondData(temp);

      setSecondData(JSON.parse(d));
      setPage("ocr");
      return "success";
    });
  };

  const transformData = (data: HandwrittenData[]): FinalPayload => {
    // const arr = [98.23, 97.88, 96.94, 97.43, 89.45];
    const items: ItemsEntity[] = data.map((item) => ({
      name: item.Material || item.material || "", // Use Material if present, otherwise use material
      quantity: item.Quantity || item.quantity || "", // Use Quantity if present, otherwise use quantity
      // Confidence:
      //   item.Confidence && parseFloat(item.Confidence) > 99
      //     ? (parseFloat(item.Confidence) - Math.random()).toFixed(2)
      //     : item.Confidence,
    }));

    return { items };
  };

  const fetchFinalData = async () => {
    if (secondData.length > 0) {
      setIsLoading("pending");
      const transformedData = transformData(secondData);
      // const items = secondData.map(
      //   ({ material, quantity, Material, Quantity }) => ({
      //     Material: Material || material || "",
      //     Quantity: Quantity || quantity || "", // Use Quantity if present, otherwise use quantity
      //   })
      // );
      // const requestBody = { items: Array.isArray(items) ? items : [] };
      // console.log("Request body:", requestBody);
      const url = `${apiInstance}/search`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: transformedData.items }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsLoading(() => {
          setHwProductsData(data);
          setPage("hwcart");
          return "success";
        });
        console.log("Response received:", data);
      } else {
        setIsLoading("failed");
        console.error("Error:", res.statusText);
      }
    } else {
      console.log("secondData length < 0");
    }
  };

  useEffect(() => {}, [ocrData]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <>
      <div className="min-h-[100vh] max-h-full relative overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar
          setPage={setPage}
          setSecondData={setSecondData}
          setOcrData={setOcrData}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="md:flex md:flex-row h-full flex flex-col">
          <aside>
            <Statusbar page={page} />
          </aside>
          <main className="w-full h-full py-4 px-8 pb-0">
            {page == "ocr" && ocrData && (
              <>
                <DisplayTable
                  data={ocrData}
                  setData={setOcrData}
                  setPage={setPage}
                />
              </>
            )}
            {page == "ocr" && secondData && ocrData == null && (
              <HandwrittenTable
                secondData={secondData}
                setSecondData={setSecondData}
                fetchFinalData={fetchFinalData}
                isLoading={isLoading}
                acceptedFiles={acceptedFiles}
              />
            )}
            {page == "input" && (
              <InputPage
                isLoading={isLoading}
                fetchHandwrittenData={fetchHandwrittenData}
                acceptedFiles={acceptedFiles}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
              />
            )}
            {page == "checkout" && ocrData && (
              <CheckoutPage
                setPage={setPage}
                data={ocrData}
                fetchProducts={fetchProducts}
                isLoading={isLoading}
              />
            )}
            {page == "products" && (
              <ChooseItemsPage setPage={setPage} data={searchResult} />
            )}
            {page == "cart" && selectedProducts && (
              <CartPage
                setPage={setPage}
                setSecondData={setSecondData}
                setOcrData={setOcrData}
              />
            )}
            {page == "hwcart" && hwProductsData && (
              <ChooseItemsPage setPage={setPage} data={hwProductsData} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
