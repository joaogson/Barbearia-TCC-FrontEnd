import { CreateFeedBackDto, Feedback } from "../types/Feedback";
import { api } from "./api";

export const createFeedback = (data: CreateFeedBackDto) => {
  return api.post("/feedback", data);
};

export const getFeedbacksForBarber = async (): Promise<Feedback[]> => {
  const response = await api.get(`/barber/me/feedback`);
  return response.data;
};

export const getMyFeedbacks = async (): Promise<Feedback[]> => {
  const response = await api.get("/feedback/me"); // Rota protegida
  return response.data;
};

export const deleteFeedback = (feedbackId: number) => {
  return api.delete(`/feedback/${feedbackId}`);
};
