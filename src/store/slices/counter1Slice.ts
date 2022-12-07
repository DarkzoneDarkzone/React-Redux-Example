import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
/** set type of state */
type Counter1State = {
    counter: number,
    loading: boolean
}
/** default value of state */
const initialValues: Counter1State = {
    counter: 0,
    loading: false
}
/** set value async/await function */
export const setValueAsync = createAsyncThunk(
    'counter1/setValueAsync', 
    async(value: number) => {
        const job = new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                if(value >= 0){
                    resolve(value)
                } else {
                    reject(Error(''))
                }
            }, 1000)
        })
        return await job
    }
)

const counter1Slice = createSlice({
    name: "counter1",
    /** set default state value */
    initialState: initialValues,
    reducers:{
        /** create action of reducer */
        increase:(state: Counter1State, action: PayloadAction<void>)=>{
            state.counter = state.counter+1
        }
    },
    extraReducers:(builder)=>{
        /** set case of async/await function and check action is fulfilled, rejected or pending*/
        builder.addCase(setValueAsync.fulfilled, (state, action) => {
            state.counter = action.payload
            state.loading = false
        })
        builder.addCase(setValueAsync.rejected, (state, action) => {
            state.counter = 0
        })
        builder.addCase(setValueAsync.pending, (state, action) => {
            state.loading = true
        })
    } 
})

/** define action of reducer */
export const {increase} = counter1Slice.actions

export const counter1Selector = (store: RootState) => store.counter1Reducer
export default counter1Slice.reducer