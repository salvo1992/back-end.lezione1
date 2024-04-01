import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import AxiosClient from "../../client/client"
const client = new AxiosClient()

const initialState = {
    books: [],
    isLoading: false,
    error: null,
    totalBooks: 0
}

export const getAllBooks = createAsyncThunk(
    'books/GETBOOKS',
    async()=>{
       return await client.get('/books')
    }
)

const booksSlice = createSlice({
    name:'books',
    initialState,
    extraReducers:builder => {
        builder
       .addCase(getAllBooks.pending, state => {
        state.isLoading = true
        })
       .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.books = action.payload
        state.totalBooks = action.payload.total
        })
       .addCase(getAllBooks.rejected, state => {
        state.isLoading = false
        state.error = 'oops , an error has occurred. BAD DEV!'
        })
    }
})

export const allbooks =(state)=> state.booksData.books

export default booksSlice.reducer