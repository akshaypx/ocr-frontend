import { useState } from "react";
import { SearchResultsEntity } from "../interfaces";

interface SelectedProduct {
  productName: string;
  originalQuantity: string;
  selectedQuantity: number;
  selectedResult: SearchResultsEntity | undefined;
}

interface CartPageProps {
  selectedProducts: SelectedProduct[];
}

const CartPage = ({ selectedProducts }: CartPageProps) => {
  const [cartProducts, setCartProducts] = useState(selectedProducts);

  const handleQuantityChange = (index: number, change: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? { ...product, selectedQuantity: product.selectedQuantity + change }
          : product
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[600px]  overflow-scroll">
      <p className="font-bold">Cart Items</p>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-center bg-gray-200 rounded-md p-4"
        >
          <div className="h-32 w-32 object-contain overflow-hidden rounded-md mr-4">
            <img
              src={product.selectedResult?.image_link}
              alt={product.selectedResult?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <p className="font-bold">{product.productName}</p>
            <p>Product Code: {product.selectedResult?.product_code}</p>
            <p>Price: Rs. {product.selectedResult?.price}</p>
            <div className="flex items-center mt-2">
              <button
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleQuantityChange(index, -1)}
                disabled={product.selectedQuantity === 1}
              >
                -
              </button>
              <span className="mx-2">{product.selectedQuantity}</span>
              <button
                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleQuantityChange(index, 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
