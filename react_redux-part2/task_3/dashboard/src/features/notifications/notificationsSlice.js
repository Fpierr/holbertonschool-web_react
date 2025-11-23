import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await fetch("/notifications.json");
    const data = await response.json();

    const notifications = data
      .filter(n => !n.context.isRead)
      .map(n => ({
        id: n.id,
        type: n.context.type,
        isRead: n.context.isRead,
        value: n.context.value,
      }));

    return notifications;
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
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.isRead = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotifications.rejected, state => {
        state.loading = false;
      });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
