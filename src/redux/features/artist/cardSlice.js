import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';

export const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    currentCard: '',
    date: moment().format('L'),
    cards: [
      {
        question: 'What’s one thing you are grateful for today?',
        id: '1',
        active: true,
      },
      {
        question: 'What is the highlight of your day?',
        id: '2',
        active: true,
      },
      {
        question: 'What makes you smile today?',
        id: '3',
        active: true,
      },
    ],
  },
  reducers: {
    setCardInactive: (state, action) => {
      const question = action.payload;
      state.cards.forEach((card) => {
        if (card.question === question) {
          card.active = false;
        }
      });
    },
    resetCardsState: (state) => {
      state.cards.forEach((card) => (card.active = true));
    },
    setCurrentCard: (state, action) => {
      if (action.payload) {
        const pickedCard = state.cards.find(
          (card) => card.id === action.payload,
        );
        state.currentCard = pickedCard.question;
      } else {
        state.currentCard = '';
      }
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {
 setCardInactive, setCurrentCard, resetCardsState, setDate,
} =
  cardSlice.actions;

export default cardSlice.reducer;
