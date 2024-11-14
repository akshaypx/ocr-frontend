import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductWithQuantity, SearchResultsEntity } from '../interfaces';

interface State {
    products: ProductWithQuantity[];
}

const initialState: State = {
    products: [],
};

const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState,
    reducers: {
        // Set the list of products with their quantities
        setProducts(state, action: PayloadAction<ProductWithQuantity[]>) {
            state.products = action.payload;
        },

        // Add or update product quantity by checking the product_code
        handleAddProduct(state, action: PayloadAction<{ product_code: string }>) {
            const { product_code } = action.payload;

            // Find the product in the state by product_code
            const existingProduct = state.products.find(
                (product) => product.product?.product_code === product_code
            );

            if (existingProduct) {
                // If product exists, increment the quantity
                existingProduct.quantity += 1;
            }
        },

        // Handle decreasing product quantity
        handleDecreaseProduct(state, action: PayloadAction<{ product_code: string }>) {
            const { product_code } = action.payload;

            // Find the product in the state by product_code
            const existingProduct = state.products.find(
                (product) => product.product?.product_code === product_code
            );

            if (existingProduct) {
                // If quantity is greater than 1, decrement the quantity
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                } else {
                    // If quantity is 1 or less, remove the product from the list
                    state.products = state.products.filter(
                        (product) => product.product?.product_code !== product_code
                    );
                }
            }
        },
        emptyProducts(state) {
            state.products = [];
        },

    },
});

export const { setProducts, handleAddProduct, handleDecreaseProduct,emptyProducts } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
