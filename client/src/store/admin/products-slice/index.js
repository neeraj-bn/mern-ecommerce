import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk(
    '/products/addNewProduct',
    async (formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result?.data

    });

export const fetchAllProducts = createAsyncThunk(
    '/products/fetchAllProducts',
    async () => {
        const result = await axios.get('http://localhost:5000/api/admin/products/get');
        console.log(result?.data);

        return result?.data

    });

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        console.log("hoooooooo", id)
        const result = await axios.put(
            `http://localhost:5000/api/admin/products/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return result?.data;
    }
);

export const deleteProduct = createAsyncThunk(
    '/products/deleteProduct',
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
        console.log("0000000000000", result?.data)
        return result?.data

    });

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log("eeeeeeeeee", action.payload);
            state.isLoading = false
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false
            state.productList = []
        })
    }

})

export default adminProductSlice.reducer