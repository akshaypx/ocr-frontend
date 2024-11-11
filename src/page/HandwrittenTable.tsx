import { useState } from "react";
import { HandwrittenData } from "../interfaces";
import { Check, Pencil, X } from "lucide-react";

interface IProps {
  secondData: HandwrittenData[];
  setSecondData: React.Dispatch<React.SetStateAction<HandwrittenData[]>>;
  fetchFinalData: () => Promise<void>;
}

const HandwrittenTable = ({
  secondData,
  setSecondData,
  fetchFinalData,
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
          Continue
        </button>
      </div>
    </div>
  );
};

export default HandwrittenTable;
