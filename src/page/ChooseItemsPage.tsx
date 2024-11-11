import { SearchResult } from "../interfaces";

interface IProps {
  data: SearchResult | null;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  selectedProducts: SelectedProduct[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
}

interface SelectedProduct {
  productIndex: number;
  resultIndex: number;
  quantity: number;
}

const ChooseItemsPage = ({
  data,
  setPage,
  selectedProducts,
  setSelectedProducts,
}: IProps) => {
  const handleSelect = (productIndex: number, resultIndex: number) => {
    const existingProduct = selectedProducts.find(
      (product) =>
        product.productIndex === productIndex &&
        product.resultIndex === resultIndex
    );

    if (!existingProduct) {
      const initialQuantity = parseInt(
        data?.products?.[productIndex].quantity || "1",
        10
      );
      setSelectedProducts([
        ...selectedProducts,
        { productIndex, resultIndex, quantity: initialQuantity },
      ]);
    }
  };

  const handleQuantityChange = (
    productIndex: number,
    resultIndex: number,
    change: number
  ) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.productIndex === productIndex &&
        product.resultIndex === resultIndex
          ? { ...product, quantity: product.quantity + change }
          : product
      )
    );
  };

  const handleLogSelectedProducts = () => {
    const selectedProductsData = selectedProducts.map((product) => {
      const productData = data?.products?.[product.productIndex];
      const resultData = productData?.search_results?.[product.resultIndex];
      return {
        productName: productData?.name,
        originalQuantity: productData?.quantity,
        selectedQuantity: product.quantity,
        selectedResult: resultData,
      };
    });
    console.log(selectedProductsData);
    setPage("cart");
  };

  return (
    <div className="flex flex-col gap-4 max-h-[700px] overflow-scroll p-2 py-0">
      {data?.products?.map((product, productIndex) => (
        <div key={productIndex} className="rounded-md bg-gray-200 p-4">
          <p className="font-semibold">Name - {product.name}</p>
          <p className="font-semibold">Quantity - {product.quantity}</p>
          <div className="max-w-[1200px] overflow-scroll">
            <div className="flex w-full">
              {product.search_results?.map((result, resultIndex) => {
                const isSelected = selectedProducts.some(
                  (p) =>
                    p.productIndex === productIndex &&
                    p.resultIndex === resultIndex
                );
                const selectedProduct = selectedProducts.find(
                  (p) =>
                    p.productIndex === productIndex &&
                    p.resultIndex === resultIndex
                );

                return (
                  <label
                    key={resultIndex}
                    className={`bg-white rounded-md m-2 p-2 min-h-80 cursor-pointer border-2 ${
                      isSelected ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`product-${productIndex}`}
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleSelect(productIndex, resultIndex)}
                    />
                    <div className="h-40 w-40 object-contain overflow-hidden rounded-md">
                      <img
                        src={result.image_link}
                        height={200}
                        width={200}
                        alt={result.name}
                      />
                    </div>
                    <p className="font-bold py-2">
                      {result.product_name.length > 20
                        ? result.product_name.substring(0, 20) + "..."
                        : result.product_name}
                    </p>
                    <p className="pb-2">
                      {result.product_code.length > 25
                        ? result.product_code.substring(0, 25) + "..."
                        : result.product_code}
                    </p>
                    <p className="font-bold text-lg opacity-70">
                      Rs. {result.price}
                    </p>

                    {isSelected && (
                      <div className="flex items-center justify-between mt-4">
                        <button
                          className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(productIndex, resultIndex, -1);
                          }}
                          disabled={selectedProduct?.quantity === 1}
                        >
                          -
                        </button>
                        <span className="font-semibold">
                          {selectedProduct?.quantity}
                        </span>
                        <button
                          className="bg-[#5edcb6] text-white rounded-full w-6 h-6 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(productIndex, resultIndex, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleLogSelectedProducts}
        className="mt-4 p-2 bg-[#47d7ac] rounded-full px-6 font-semibold self-center"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ChooseItemsPage;
