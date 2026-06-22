import React from "react";
import BrowseBooksClient from "./BrowseBooksClient";

export default function BrowseBooks({ books = [] }) {
  return <BrowseBooksClient books={books} />;
}