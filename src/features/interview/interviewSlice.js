import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  candidates: [],
  currentInterview: {
    candidateId: null,
    status: 'idle',
    answers: [],
    currentQuestionIndex: 0,
  },
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    startNewInterview: (state, action) => {
      const { name, email, phone } = action.payload;
      const newCandidate = {
        id: uuidv4(),
        name,
        email,
        phone,
        transcript: [],
        status: 'ready',
      };
      state.candidates.push(newCandidate);
      state.currentInterview = {
        candidateId: newCandidate.id,
        status: 'ready',
        answers: [],
        currentQuestionIndex: 0,
      };
    },
    updateCandidateInfo: (state, action) => {
      const { name, email, phone } = action.payload;
      const candidate = state.candidates.find(c => c.id === state.currentInterview.candidateId);
      if (candidate) {
        candidate.name = name ?? candidate.name;
        candidate.email = email ?? candidate.email;
        candidate.phone = phone ?? candidate.phone;
        candidate.status = 'ready';
      }
      state.currentInterview.status = 'ready';
    },
    setInterviewStatus: (state, action) => {
      if (state.currentInterview) {
        state.currentInterview.status = action.payload;
      }
    },
    submitAnswer: (state, action) => {
      const { question, answer } = action.payload;
      if (state.currentInterview) {
        const candidate = state.candidates.find(c => c.id === state.currentInterview.candidateId);
        if (candidate) {
          candidate.transcript.push({ question, answer });
        }
        state.currentInterview.answers.push(answer);
        state.currentInterview.currentQuestionIndex += 1;
      }
    },
    completeInterview: (state) => {
      const candidate = state.candidates.find(c => c.id === state.currentInterview.candidateId);
      if (candidate) {
        candidate.status = 'completed';
      }
      state.currentInterview.status = 'completed';
    },
    resetCurrentInterview: (state) => {
      state.currentInterview.status = 'idle';
      state.currentInterview.candidateId = null;
    },
  },
});

export const {
  startNewInterview,
  updateCandidateInfo,
  setInterviewStatus,
  submitAnswer,
  completeInterview,
  resetCurrentInterview,
} = interviewSlice.actions;

export default interviewSlice.reducer;