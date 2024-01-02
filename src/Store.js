import { configureStore} from "@reduxjs/toolkit"
import dataSlice from './manuhome/Overview/Userslice';

const store = configureStore({
    reducer: {
        data: dataSlice,
    
    }
});

export default store;