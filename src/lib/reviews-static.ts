import { business } from "./business";
import type { ReviewsData } from "./google-reviews";

/** Google reviews sourced from the Top Dog Auto & Diesel Google Business Profile */
export const staticReviews: ReviewsData = {
  placeName: business.name,
  address: business.address.full,
  rating: 5.0,
  totalReviews: 7,
  fetchedAt: null,
  reviews: [
    {
      author: "Keith Durbin",
      rating: 5,
      relativeTime: "a week ago",
      text: "Great service and highly recommend! Jake and his team do great work and at a reasonable cost.",
    },
    {
      author: "Jesse Torno",
      rating: 5,
      relativeTime: "5 months ago",
      text: "Great people",
    },
    {
      author: "Ethan Shevela",
      rating: 5,
      relativeTime: "a year ago",
      text: "Top Teir Diesel Shop, Rating 11 out of 10. Outstanding mechanic, All around best prices and no bullshit, no over selling, great, honest work! My 2004 6.0 DOES NOT go anywhere else. From brakes and rotors to injectors, heads, turbos, AC, and more.",
    },
    {
      author: "Kayla Perry",
      rating: 5,
      relativeTime: "a year ago",
      text: "Jake has been wonderful working on my husbands pickups. We were in a huge pinch with 2 of our pickups down n out of commission. Jake worked long hours on our rigs to insure we got them back in a timely manner. Thank you so much top dog auto. I highly recommend this shop!",
    },
    {
      author: "Michael Erhart",
      rating: 5,
      relativeTime: "a year ago",
      text: "They got my truck in and out within a day of it being there and found the problem pretty fast they have some good prices and Jake is really good to work with and reasonable",
    },
    {
      author: "Natalee Steiner",
      rating: 5,
      relativeTime: "a year ago",
      text: "Really good prices for the work that was done and got it done in a good time",
    },
    {
      author: "Madysen Pfeifer",
      rating: 5,
      relativeTime: "a year ago",
      text: "Great work done here they will have it done in a timely fashion",
    },
  ],
};
