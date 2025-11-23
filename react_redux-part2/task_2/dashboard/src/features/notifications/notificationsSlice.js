import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await fetch("/notifications.json");
    const data = await response.json();
    
    return data.map((n) =>
      n.id === 3 ? { ...n, html: { __html: getLatestNotification() } } : n
    );
  }
);

const initialState = {
  notifications: [],
  loading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
