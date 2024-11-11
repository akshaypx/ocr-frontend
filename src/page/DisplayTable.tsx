import { ClientInfo } from "../interfaces";
import EditIcon from "../assets/pencil-fill (1).svg";
import { Dispatch, SetStateAction, useState } from "react";
import { Check, X } from "lucide-react";

interface IProps {
  data: ClientInfo;
  setData: Dispatch<SetStateAction<ClientInfo | null>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const DisplayTable = ({ data, setData, setPage }: IProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [value, setValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  return (
    <div>
      <h2 className="text-lg font-bold mt-8 mb-4">Products</h2>
      <table
        className="min-w-full table-auto border-[1px] border-black border-opacity-10 border-separate"
        style={{ borderSpacing: "0 10px" }}
      >
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            {data.client_address.score && (
              <th className="px-4 py-2">Confidence</th>
            )}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {data &&
            data.products &&
            data.products.length > 0 &&
            data.products.map((product, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="px-4 py-2">
                  {isEditing && editingId === index ? (
                    <>
                      <input
                        type="text"
                        className="w-full"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </>
                  ) : (
                    <>{product.item.value}</>
                  )}
                </td>
                <td className="px-4 py-2">
                  {isEditing && editingId === index ? (
                    <>
                      <input
                        type="text"
                        className="w-16"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </>
                  ) : (
                    <>{product.quantity.value}</>
                  )}
                </td>
                {product.item.score && (
                  <td className=" px-4">
                    <div
                      className={
                        ((parseFloat(product.item.score) +
                          parseFloat(product.quantity.score)) /
                          2) *
                          100 >
                        80.0
                          ? " bg-[#1dbc8d] text-center text-white"
                          : " bg-[#cd0000] text-center text-white"
                      }
                    >
                      {(
                        ((parseFloat(product.item.score) +
                          parseFloat(product.quantity.score)) /
                          2) *
                        100
                      ).toFixed(2) + "%"}
                    </div>
                  </td>
                )}
                <td className="flex items-center p-2 justify-center w-full text-center">
                  {isEditing && editingId == index ? (
                    <div className="flex gap-4">
                      <Check
                        className="cursor-pointer"
                        onClick={() => {
                          setData((prevState) => {
                            if (!prevState) {
                              // Handle the case where prevState is null (you can return null or some default value)
                              return null;
                            }

                            return {
                              ...prevState,
                              products: prevState.products.map((product, i) =>
                                i === index
                                  ? {
                                      ...product,
                                      item: {
                                        ...product.item,
                                        value: value,
                                      },
                                      quantity: {
                                        ...product.quantity,
                                        value: quantity,
                                      },
                                    }
                                  : product
                              ),
                            };
                          });
                          setIsEditing(false);
                          setEditingId(null);
                        }}
                      />
                      <X
                        className="cursor-pointer"
                        onClick={() => {
                          setValue(product.item.value);
                          setQuantity(product.quantity.value);
                          setIsEditing(false);
                          setEditingId(null);
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={EditIcon}
                      alt=""
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => {
                        setValue(product.item.value);
                        setQuantity(product.quantity.value);
                        setEditingId(index);
                        setIsEditing(true);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center my-4">
        <button
          className="bg-[#47d7ac] py-2 px-6 rounded-full font-semibold"
          onClick={() => setPage("checkout")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DisplayTable;
