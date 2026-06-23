'use server';

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Get JWT Token
export const getJwtToken = async () => {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers()
    });
    return token;
  } catch (error) {
    console.error("Token fetch error:", error);
    return null;
  }
};

// GET Request
export const serverFetch = async (path, options = {}) => {
  const token = await getJwtToken();

  const fetchHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: fetchHeaders,
  });

  return res.json();
};

// POST, PATCH, DELETE Request
export const serverMutation = async (path, data = null, method = 'POST') => {
  const token = await getJwtToken();

  const fetchHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method: method,
    headers: fetchHeaders,
  };


  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${path}`, options);

  return res.json();
};