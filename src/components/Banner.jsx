import React from "react";
import BannerClient from "./BannerClient";

const bannerData = [
  {
    id: 1,
    image: "/assets/banner1.png",
    title: "The Library That Comes to You",
    desc: "Democratizing access to literature. Browse our vast, community-driven collection and have your next great read delivered to your doorstep.",
  },
  {
    id: 2,
    image: "/assets/banner2.png",
    title: "Discover Your Next Great Read",
    desc: "Explore curated collections from independent book owners and local libraries. Finding the perfect book has never been easier.",
  },
  {
    id: 3,
    image: "/assets/banner3.png",
    title: "Fast, Secure & Seamless",
    desc: "Enjoy a frictionless borrowing experience with secure payment integration and real-time delivery tracking from your dashboard.",
  },
  {
    id: 4,
    image: "/assets/banner4.png",
    title: "Join the Reading Revolution",
    desc: "Connect with a growing community of avid readers. Share reviews, build your wishlist, and manage your reading journey.",
  },
  {
    id: 5,
    image: "/assets/banner5.png",
    title: "Order with Absolute Ease",
    desc: "Browse our extensive catalog, select your desired books, and place an order in just a few clicks. A seamless checkout experience awaits you.",
  },
  {
    id: 6,
    image: "/assets/banner6.png",
    title: "Swift Doorstep Delivery",
    desc: "Track your book's journey from the librarian's shelf straight to your hands. Enjoy fast, reliable, and hassle-free delivery services.",
  },
];

export default function Banner() {
  return <BannerClient bannerData={bannerData} />;
}