import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const initialState = {
  courses: [],
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await fetch("/courses.json");
    const data = await response.json();
    return data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) {
        course.isSelected = true;
      }
    },
    unSelectCourse: (state, action) => {
      const course = state.courses.find(course => course.id === action.payload);
      if (course) {
        course.isSelected = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload.map(course => ({
          ...course,
          isSelected: false,
        }));
      })
      .addCase(logout, (state) => {
        state.courses = [];
      });
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;