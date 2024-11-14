import { useState } from "react";
import { HandwrittenData } from "../interfaces";
import { Check, Pencil, X } from "lucide-react";

interface IProps {
  secondData: HandwrittenData[];
  setSecondData: React.Dispatch<React.SetStateAction<HandwrittenData[]>>;
  fetchFinalData: () => Promise<void>;
  isLoading: "pending" | "success" | "failed" | "idle"
}

const HandwrittenTable = ({
  secondData,
  setSecondData,
  fetchFinalData,
  isLoading
}: IProps) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [tempData, setTempData] = useState<HandwrittenData[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colKey: keyof HandwrittenData
  ) => {
    const newData = [...tempData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [colKey]: event.target.value,
    };
    setTempData(newData);
  };

  const handleSaveClick = () => {
    setSecondData(tempData);
    setEditingRow(null);
  };

  const handleCancelClick = () => {
    setTempData([...secondData]);
    setEditingRow(null);
  };

  const handleEditClick = (rowIndex: number) => {
    setTempData([...secondData]);
    setEditingRow(rowIndex);
  };
  console.log("inside handwrittentable");
  console.log(typeof secondData);

  return (
    <div className="flex-1 flex-col">
      <table className="w-full bg-white p-2 rounded-lg overflow-hidden">
        <thead className="text-left p-2 font-bold text-blue-950">
          <tr>
            <th className="p-2 pl-4">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2 text-center">Confidence</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {secondData.length > 0 &&
            secondData.map((d, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-200" : ""}
              >
                <td className="p-2 pl-4">
                  {editingRow === rowIndex ? (
                    <input
                      type="text"
                      value={tempData[rowIndex].Material}
                      onChange={(e) => handleChange(e, rowIndex, "Material")}
                      className="border p-1 w-full"
                    />
                  ) : (
                    d.Material
                  )}
                </td>
                <td className="p-2">
                  {editingRow === rowIndex ? (
                    <input
                      type="text"
                      value={tempData[rowIndex].Quantity}
                      onChange={(e) => handleChange(e, rowIndex, "Quantity")}
                      className="border p-1 w-16"
                    />
                  ) : (
                    d.Quantity
                  )}
                </td>
                <td className="p-2">
                  {d.Confidence &&
                    parseFloat(d.Confidence.replace("%", "")) >= 80 && (
                      <div className="w-full h-full bg-green-600 text-white text-center">
                        {/* {parseFloat(d.Confidence) > 99
                        ? (parseFloat(d.Confidence) - Math.random()).toFixed(
                            2
                          ) + "%"
                        : d.Confidence} */}
                        {d.Confidence}
                      </div>
                    )}
                  {d.Confidence &&
                    parseFloat(d.Confidence.replace("%", "")) < 80 && (
                      <div className="w-full h-full bg-red-600 text-white text-center">
                        {d.Confidence}
                      </div>
                    )}
                </td>
                <td className="p-2 w-44 text-center">
                  {editingRow === rowIndex ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="mr-2 p-1 bg-green-500 text-white rounded"
                      >
                        <Check />
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="p-1 bg-red-500 text-white rounded"
                      >
                        <X />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(rowIndex)}
                      className="p-1 bg-blue-500 text-white rounded"
                    >
                      <Pencil />
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="p-4 flex justify-end">
        <button
          className="px-8 py-2 rounded-full bg-[#46d7ac] font-bold"
          onClick={() => {
            fetchFinalData();
          }}
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
  );
};

export default HandwrittenTable;
