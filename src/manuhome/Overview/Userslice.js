import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState:[],
    reducers: {
        addData: (state, action) => {
            state.push(action.payload);
        }
        ,
        deleteData: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        editData: (state, action) => {
            return state.map(item => (item.id === action.payload.id ? action.payload : item));
        },
    },
});

export const {addData, deleteData, editData} = dataSlice.actions;
export default dataSlice.reducer;