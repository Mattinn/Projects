import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Book {
	author_name: string[];
	title: string;
	edition_count: number;
	first_publish_year: number;
}

interface BookState {
	books: Book[];
	loading: boolean;
	error: string | null;
	responseTimes: number[];
	averageResponseTime: number;
	page: number;
	totalRows: number;
	limit: number;
}

const initialState: BookState = {
	books: [],
	loading: false,
	error: null,
	responseTimes: [],
	averageResponseTime: 0,
	page: 1,
	totalRows: 0,
	limit: 25, 
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ({ searchTerm, page, limit }: { searchTerm: string, page: number, limit: number }, { rejectWithValue }) => {
			if (!searchTerm.trim()) {
				return { books: [], totalRows: 0, totalPages: 0, responseTime: 0 };
			}
      const start = Date.now();
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&page=${page}&limit=${limit}`);
        const responseTimeMs = Date.now() - start;
        const responseTimeSec = parseFloat((responseTimeMs / 1000).toFixed(2));
        return { 
          books: response.data.docs, 
          totalRows: response.data.numFound,
          responseTime: responseTimeSec 
        };
      } catch (error) {
        return rejectWithValue('Failed to fetch books');
      }
    }
  );

  const calculateAverage = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    const total = numbers.reduce((acc, time) => acc + time, 0);
    return parseFloat((total / numbers.length).toFixed(2));
  };
  
  const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      setLimit: (state, action: PayloadAction<number>) => {
        state.limit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{ books: any[]; totalRows: number; responseTime: number }>) => {
          state.loading = false;
          state.books = action.payload.books;
          state.totalRows = action.payload.totalRows;

					const validResponseTime = !isNaN(action.payload.responseTime) && action.payload.responseTime !== null && action.payload.responseTime > 0;
					//prevent zero based response times being added to the average fetch duration calculations, TODO: figure out why this happens
					if (validResponseTime) {
						state.responseTimes.push(action.payload.responseTime);
						state.averageResponseTime = calculateAverage(state.responseTimes);
					}
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { setPage, setLimit } = bookSlice.actions;
  export default bookSlice.reducer;