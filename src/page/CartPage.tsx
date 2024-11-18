import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { emptyProducts } from "../store/selectedProductSlice";
import { addresses } from "../assets/addressData";
import { currencyRs } from "../utils/constants";
import { ClientInfo, HandwrittenData } from "../interfaces";
import { SelectedProduct } from "../App";

interface CartPageInterface {
  setPage: Dispatch<SetStateAction<string>>;
  setSecondData: Dispatch<SetStateAction<HandwrittenData[]>>;
  setOcrData: Dispatch<SetStateAction<ClientInfo | null>>;
  setSelectedProducts: Dispatch<SetStateAction<SelectedProduct[]>>;
}

// interface Address {
//   id: number;
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
//   phone: string;
// }

const CartPage = ({
  setPage,
  setOcrData,
  setSecondData,
}: CartPageInterface) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: RootState) => state.selectedProduct.products
  );

  const [isAddressStep, setIsAddressStep] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleContinue = () => {
    setIsAddressStep(true);
  };

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const handleGoBack = () => {
    setIsAddressStep(false);
  };

  const handleConfirmAddress = () => {
    if (selectedAddressId !== null) {
      setOrderPlaced(true); // Mark order as placed
      dispatch(emptyProducts()); // Empty the cart
      setSelectedAddressId(null);
    }
  };

  useEffect(() => {
    setOrderPlaced(false);
    setSelectedAddressId(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 max-h-[600px] overflow-scroll">
      {!isAddressStep ? (
        <>
          <p className="font-bold">Cart Items</p>
          {cartProducts.length === 0 ? (
            <div>
              <p>Your Cart is empty.</p>
              <button
                className="w-fit p-3 bg-[#1b445c] text-white py-2 rounded-md mt-4"
                onClick={() => {
                  setIsAddressStep(false);
                  setOrderPlaced(false);
                  setOcrData(null);
                  setSecondData([]);
                  setPage("input");
                }}
              >
                Go to Home Page
              </button>
            </div>
          ) : (
            <>
              {cartProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-md p-4"
                >
                  <div className="h-32 w-32 object-contain overflow-hidden rounded-md mr-4">
                    <img
                      src={product.product?.image_link}
                      alt={product.product?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold">{product.product.product_name}</p>
                    <p>Product Code: {product.product?.product_code}</p>
                    <p>
                      Price: {currencyRs} {product.product?.price}
                    </p>
                    <div className="flex items-center mt-2">
                      <button className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        -
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleContinue}
                className="w-fit p-3 bg-[#47D7AC] text-white py-2 rounded-md mt-4"
              >
                Continue
              </button>
            </>
          )}
        </>
      ) : orderPlaced ? (
        <div className="text-center">
          <p className="font-bold text-xl mb-4">Order Placed Successfully!</p>
          <p>Your order has been successfully placed.</p>
          <button
            className="w-fit p-3 bg-[#1b445c] text-white py-2 rounded-md mt-4"
            onClick={() => {
              setIsAddressStep(false);
              setOrderPlaced(false);
              setPage("input");
            }}
          >
            Go to Home Page
          </button>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl mb-4">Select Delivery Address</p>
          {addresses
            .filter((val) => val.isDefault === true)
            .map((address) => (
              <div
                key={address.id}
                className={`p-4 mb-4 border rounded-md cursor-pointer ${
                  selectedAddressId === address.id
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                }`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddressId === address.id}
                  onChange={() => handleAddressSelect(address.id)}
                  className="mr-2"
                />
                <p className="font-semibold">{address.name}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state}, {address.zip}
                </p>
                <p>Phone: {address.phone}</p>
              </div>
            ))}
          <div>
            <button
              disabled={selectedAddressId === null}
              onClick={handleConfirmAddress}
              className="w-fit p-3 mr-2 bg-[#47D7AC] text-white py-2 rounded-md mt-4 disabled:opacity-50"
            >
              Confirm and Continue
            </button>
            <button
              onClick={handleGoBack}
              className="w-fit p-3 bg-[#1b445c] text-white py-2 rounded-md mt-4"
            >
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
