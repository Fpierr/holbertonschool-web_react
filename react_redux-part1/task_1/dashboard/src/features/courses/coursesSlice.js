import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

// 🔹 API Configuration
export const API_BASE_URL = 'http://localhost:5173';

export const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

// 🔹 Initial State
const initialState = {
  courses: [],
};

// 🔹 Async Thunk
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    try {
      const response = await fetch(ENDPOINTS.courses);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }
);

// 🔹 Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(logout, () => initialState);
  },
});

// 🔹 Export Reducer
export default coursesSlice.reducer;
