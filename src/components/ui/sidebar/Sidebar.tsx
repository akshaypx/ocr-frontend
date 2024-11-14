import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { emptyProducts, handleAddProduct, handleDecreaseProduct } from "../../../store/selectedProductSlice";
import { addresses } from "../../../assets/addressData";
import { currencyRs } from "../../../utils/constants";
import { ClientInfo, HandwrittenData } from "../../../interfaces";

interface SidebarPageProps {
    isSidebarOpen: boolean;
    setPage: Dispatch<SetStateAction<string>>;
    toggleSidebar: () => void;
    setSecondData: Dispatch<SetStateAction<HandwrittenData[]>>
    setOcrData: Dispatch<SetStateAction<ClientInfo | null>>
}

const SidebarPage = ({ isSidebarOpen, setPage, toggleSidebar, setOcrData, setSecondData }: SidebarPageProps) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.selectedProduct.products);
    const [isAddressStep, setIsAddressStep] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
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
            dispatch(emptyProducts());
        }
    };

    useEffect(() => {
        if (products.length === 0 && !orderPlaced) {
            setIsAddressStep(false);
        }
    }, [products]);


    useEffect(() => {
        setOrderPlaced(false)
        setSelectedAddressId(null)
    }, [])

    return (
        <div
            className={`absolute top-[5.2rem] right-0 w-96 bg-white shadow-lg p-4 pt-2 transform z-10 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out border-l rounded-md overflow-y-auto`}
            style={{ height: "calc(100vh - 5rem)" }}
        >
            {orderPlaced ? (
                <div className="text-center">
                    <p className="font-bold text-xl mb-4">Congratulations!</p>
                    <p>Your order has been placed successfully!</p>
                    <p>Thank you for shopping with us.</p>
                    <button
                        className="w-full bg-[#1b445c] text-white py-2 rounded-md mt-4"
                        onClick={() => {
                            setOcrData(null);
                            setSecondData([])
                            setPage("input");
                            setOrderPlaced(false);
                            toggleSidebar();

                        }}
                    >
                        Go to Home
                    </button>
                </div>
            ) : !isAddressStep ? (
                <>
                    <p className="font-bold text-xl mb-4">Cart Items</p>
                    {products.length === 0 ? (
                        <p>Your Cart is empty.</p>
                    ) : (
                        <>
                            {products.map((product, index) => (
                                <div key={index} className="flex items-center bg-gray-200 rounded-md p-4 mb-4">
                                    <div className="h-32 w-32 max-w-14 object-contain overflow-hidden rounded-md mr-4">
                                        <img
                                            src={product.product?.image_link}
                                            alt={product.product?.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-grow">

                                        <p className="font-bold">{product.product.product_name}</p>
                                        <p>Product Code: {product.product?.product_code}</p>
                                        <p>Price: {currencyRs} {product.product?.price}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => {
                                                    dispatch(
                                                        handleDecreaseProduct({
                                                            product_code: product.product.product_code,
                                                        })
                                                    );
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{product.quantity}</span>
                                            <button
                                                className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => {
                                                    dispatch(
                                                        handleAddProduct({
                                                            product_code: product.product.product_code,
                                                        })
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={handleContinue}
                                className="w-full bg-[#47d7ac] text-white py-2 rounded-md mt-4"
                            >
                                Continue
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <p className="font-bold text-xl mb-4">Select Address</p>
                    {addresses.filter((val) => val.isDefault === true).map((address) => (
                        <div
                            key={address.id}
                            className={`p-4 mb-4 border rounded-md cursor-pointer ${selectedAddressId === address.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
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
                            <p>{address.city}, {address.state}, {address.zip}</p>
                            <p>Phone: {address.phone}</p>
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <button className="bg-gray-500 text-white py-2 px-4 rounded-md" onClick={handleGoBack}>
                            Go Back
                        </button>
                        <button
                            className={`bg-[#47d7ac] text-white py-2 px-4 rounded-md ${selectedAddressId === null ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            disabled={selectedAddressId === null}
                            onClick={handleConfirmAddress}
                        >
                            Confirm Address
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SidebarPage;
