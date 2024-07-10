import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const message = state.messages.find((message) => message.id === id);
      if (message) {
        message.text = text;
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, updateMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
