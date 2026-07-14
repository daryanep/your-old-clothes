/**
 * Events Data Module — Your Old Clothes
 * Schema: { id, title, date (YYYY-MM-DD), time, venue, city, ticketLink, status, poster }
 * The events engine compares each event's date to the client's current date
 * and automatically sorts into upcoming vs. past.
 */

const events = [
  {
    id: 'evt-001',
    title: 'Afterclass',
    date: '2026-08-18',
    time: '17:00',
    venue: 'Fairway Cafe',
    city: 'Bogor',
    ticketLink: 'https://eratix.id/e/after-class',
    status: 'On Sale',
    poster: '/assets/images/events/event-poster-fairway.jpg',
  }
];

export default events;
