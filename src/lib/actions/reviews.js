"use server"

import { serverMutation } from "@/lib/core/server";

export const submitReview = async (reviewData) => {
  try {
    
    const data = await serverMutation(`/api/reviews`, reviewData);
    return data;
  } catch (error) {
    return { success: false, message: "Failed to submit review" };
  }
};