/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SearchResult,
  ProductWithQuantity,
  SearchResultsEntity,
} from "../interfaces";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/selectedProductSlice";
import { currencyRs } from "../utils/constants";

interface IProps {
  data: SearchResult | null;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseItemsPage = ({ data, setPage }: IProps) => {
  const [selectedProducts, setSelectedProducts] = useState<
    ProductWithQuantity[]
  >([]);
  const dispatch = useDispatch();

  const existingProducts = useSelector(
    (state: any) => state.selectedProduct.products
  );

  const handleAddRemoveProduct = (
    result: SearchResultsEntity,
    quantity: number = 10
  ) => {
    setSelectedProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (p) => p.product.product_code === result.product_code
      );

      if (existingProductIndex !== -1) {
        // If product already exists, remove it from the list
        const newProducts = [...prevProducts];
        newProducts.splice(existingProductIndex, 1); // Remove the existing product
        return newProducts;
      } else {
        // If product does not exist, add it with a quantity of 10
        return [...prevProducts, { product: result, quantity: quantity + 1 }];
      }
    });
  };

  const handleQuantityChange = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    setSelectedProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.product.product_code === productId) {
          const newQuantity =
            action === "increase"
              ? product.quantity + 1
              : product.quantity > 1
              ? product.quantity - 1
              : 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };

  const handleAddToCart = () => {
    // Merge the existing products from Redux and the newly selected products
    const allProducts = [...existingProducts, ...selectedProducts];

    // Dispatch the updated product list to Redux
    dispatch(setProducts(allProducts));
  };

  return (
    <div className="flex flex-col gap-4 max-h-[700px] overflow-scroll p-2 py-0">
      {data?.products?.map((product, productIndex) => (
        <div key={productIndex} className="rounded-md bg-gray-200 p-4">
          <p className="font-semibold">Name - {product.name}</p>
          <p className="font-semibold">Quantity - {product.quantity}</p>
          <div className="max-w-[1200px] overflow-scroll">
            <div className="flex w-full">
              {product.search_results
                ?.sort((a, b) => b.score - a.score)
                .filter((v) => v.score > 0.45)
                .slice(0, 3)
                .map((result, resultIndex) => {
                  const selectedP = selectedProducts.some(
                    (p) => p.product.product_code === result.product_code
                  );
                  const selectedPVal = selectedProducts.find(
                    (p) => p.product.product_code === result.product_code
                  );

                  return (
                    <label
                      key={resultIndex}
                      onClick={() => {
                        handleAddRemoveProduct(
                          result,
                          Number(product.quantity)
                        );
                      }}
                      className={`bg-white rounded-md flex flex-col justify-between m-2 p-2 min-h-80 cursor-pointer border-2 ${
                        selectedP ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <div>
                        <div className="h-40 w-40 object-contain overflow-hidden rounded-md">
                          <img
                            src={result.image_link}
                            height={200}
                            width={200}
                            alt={result.name}
                          />
                        </div>
                        <p className="font-bold py-2">
                          {result.product_name &&
                          result.product_name.length > 20
                            ? result.product_name.substring(0, 20) + "..."
                            : result.product_name}
                        </p>
                      </div>
                      <div>
                        <p className="pb-2">
                          {result.product_code &&
                          result.product_code.length > 25
                            ? result.product_code.substring(0, 25) + "..."
                            : result.product_code}
                        </p>
                        <p className="font-bold text-lg opacity-70">
                          {currencyRs} {result.price}
                        </p>

                        {selectedPVal && (
                          <div className="flex items-center justify-between mt-4">
                            <button
                              className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(
                                  result.product_code,
                                  "decrease"
                                );
                              }}
                            >
                              -
                            </button>
                            <span className="font-semibold">
                              {selectedPVal.quantity}
                            </span>
                            <button
                              className="bg-[#5edcb6] text-white rounded-full w-6 h-6 flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(
                                  result.product_code,
                                  "increase"
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          handleAddToCart();
          setPage("cart");
        }}
        className="mt-4 p-2 bg-[#47d7ac] rounded-full px-6 font-semibold self-center"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ChooseItemsPage;
