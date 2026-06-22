import React from "react";
import FeaturedBooksClient from "./FeaturedBooksClient";

export default function FeaturedBooks({ books = [] }) {
  return <FeaturedBooksClient books={books} />;
}