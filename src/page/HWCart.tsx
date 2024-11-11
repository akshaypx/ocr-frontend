import { Tooltip } from "react-tooltip";
import { OcrResponse } from "../interfaces";

interface IProps {
  data: OcrResponse[];
  setData: React.Dispatch<React.SetStateAction<OcrResponse[]>>;
}
const HWCart = ({ data, setData }: IProps) => {
  return (
    <>
      {data.length > 0 && (
        <div className="w-[900px] max-h-[600px] overflow-scroll flex flex-col items-center justify-start gap-4">
          {data.map((p, idx) => {
            if (p.search_prod_list) {
              if (p.search_prod_list.length > 0) {
                return (
                  <div className="block bg-white p-4 my-2 w-full " key={idx}>
                    <div className="border border-b-2 border-t-0 border-l-0 border-r-0 p-2 pl-0 font-bold flex justify-between">
                      {p.material ? <p>{p.material}</p> : <p>{p.Material}</p>}
                      {/* {p.quantity ? (
                          <p>Quantity - {p.quantity}</p>
                        ) : (
                          <p>Quantity - {p.Quantity}</p>
                        )} */}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {p.search_prod_list &&
                        p.search_prod_list.slice(0, 3).map((sp, _) => (
                          <label key={_}>
                            <div
                              key={_}
                              className="border-2 w-64 h-100 p-4 flex flex-col items-center gap-1"
                            >
                              <div className="w-60 h-60 relative overflow-hidden object-cover">
                                <input
                                  type="radio"
                                  onClick={() => {
                                    setData((prev) => {
                                      const newData = prev.map(
                                        (item, index) => {
                                          if (index === idx) {
                                            const updatedList =
                                              item.search_prod_list?.map(
                                                (product) => {
                                                  if (
                                                    product.product_code ===
                                                    sp.product_code
                                                  ) {
                                                    return {
                                                      ...product,
                                                      selected: true,
                                                      quantity: item.quantity
                                                        ? parseInt(
                                                            item.quantity
                                                          )
                                                        : item.Quantity
                                                        ? parseInt(
                                                            item.Quantity
                                                          )
                                                        : 0,
                                                    };
                                                  } else {
                                                    return {
                                                      ...product,
                                                      selected: false,
                                                    };
                                                  }
                                                }
                                              );
                                            return {
                                              ...item,
                                              search_prod_list: updatedList,
                                            };
                                          }
                                          return item;
                                        }
                                      );
                                      return newData;
                                    });
                                  }}
                                  checked={sp.selected}
                                  name={idx.toString()}
                                  className="absolute right-0"
                                />
                                <img
                                  className="object-cover w-full h-full"
                                  src={sp.image_link}
                                  alt=""
                                />
                              </div>
                              <div className="text-xs font-bold text-left w-full">
                                {sp.product_name}
                              </div>
                              <div className="font-bold text-left w-full flex justify-between">
                                <div>₹{sp.price}</div>
                                <div>
                                  <a
                                    data-tooltip-id={sp.product_code + sp.score}
                                    data-tooltip-content={sp.score}
                                    data-tooltip-place="left"
                                    className="bg-gray-200 p-[1px] px-[9px] rounded-full text-sm"
                                  >
                                    i
                                  </a>
                                  <Tooltip id={sp.product_code + sp.score} />
                                </div>
                              </div>
                              {sp.selected && (
                                <div className="flex gap-1">
                                  <button
                                    className="bg-[#46d7ac] w-5"
                                    onClick={() => {
                                      setData((prev) => {
                                        const newData = prev.map(
                                          (item, index) => {
                                            if (index === idx) {
                                              const updatedList =
                                                item.search_prod_list?.map(
                                                  (product) => {
                                                    if (
                                                      product.product_code ===
                                                      sp.product_code
                                                    ) {
                                                      const newQuantity =
                                                        (product.quantity ||
                                                          0) - 1;
                                                      return {
                                                        ...product,
                                                        quantity:
                                                          newQuantity >= 0
                                                            ? newQuantity
                                                            : 0,
                                                        selected:
                                                          newQuantity > 0, // Deselect if quantity becomes zero
                                                      };
                                                    }
                                                    return product;
                                                  }
                                                );
                                              return {
                                                ...item,
                                                search_prod_list: updatedList,
                                              };
                                            }
                                            return item;
                                          }
                                        );
                                        return newData;
                                      });
                                    }}
                                  >
                                    -
                                  </button>
                                  <div>{sp.quantity}</div>{" "}
                                  {/* Display updated quantity */}
                                  <button
                                    className="bg-[#46d7ac] w-5"
                                    onClick={() => {
                                      setData((prev) => {
                                        const newData = prev.map(
                                          (item, index) => {
                                            if (index === idx) {
                                              const updatedList =
                                                item.search_prod_list?.map(
                                                  (product) => {
                                                    if (
                                                      product.product_code ===
                                                      sp.product_code
                                                    ) {
                                                      return {
                                                        ...product,
                                                        quantity:
                                                          (product.quantity ||
                                                            0) + 1,
                                                        selected: true, // Ensure product is selected when increasing quantity
                                                      };
                                                    }
                                                    return product;
                                                  }
                                                );
                                              return {
                                                ...item,
                                                search_prod_list: updatedList,
                                              };
                                            }
                                            return item;
                                          }
                                        );
                                        return newData;
                                      });
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </label>
                        ))}
                    </div>
                  </div>
                );
              }
            }
          })}
          <div className="w-full text-right">
            <button
              className="px-8 py-2 rounded-full bg-[#46d7ac] font-bold"
              onClick={() => {
                const selectedProducts = data.flatMap(
                  (item) =>
                    item.search_prod_list?.filter(
                      (product) => product.selected
                    ) ?? []
                );
                //TODO-send products to cart or another page
                console.log(selectedProducts);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HWCart;
