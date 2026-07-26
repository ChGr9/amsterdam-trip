/* ============================================================
   TRIP DATA — this is the ONLY file you need to edit.
   All content on the site (schedule, free time ideas,
   restaurants, info) comes from this file.

   NOTE: everything below is PLACEHOLDER content with realistic
   Amsterdam examples, so you can see how the site works.
   Replace it with the real trip details.

   Field reference for schedule items:
     time     – start time, e.g. "09:30"  (optional)
     end      – end time, e.g. "11:30"    (optional)
     title    – what you're doing
     desc     – extra notes for the family (optional)
     cat      – "sight" | "food" | "travel" | "free"  (colors the timeline dot)
     location – text used for the Google Maps / Waze buttons (optional)
     tickets  – URL to the ticket page/booking (optional)
     booked   – true = shows a green "Booked" badge,
                false = shows a yellow "Book ahead" badge,
                omit  = no badge
     url      – website of the place (optional)
   ============================================================ */

const TRIP = {
  title: "Amsterdam",
  subtitle: "Family trip — the plan, the tickets, the food. All in one place.",

  // Used for the "TODAY" highlight on day tabs. Format: YYYY-MM-DD
  hotel: {
    name: "Hotel Placeholder (city centre)",
    location: "Dam Square, Amsterdam",
    url: ""
  },

  days: [
    {
      date: "2026-08-10",
      label: "Day 1",
      theme: "Arrival & getting our bearings",
      desc: "Easy day: land, drop the bags, wander the centre.",
      items: [
        { time: "10:45", title: "Land at Schiphol", cat: "travel",
          desc: "Train to Amsterdam Centraal runs every ~10 min, takes 17 min. Buy tickets at the yellow machines or use OVpay (tap debit card).",
          location: "Schiphol Airport" },
        { time: "12:30", title: "Check in & drop bags at the hotel", cat: "travel",
          location: "Dam Square, Amsterdam" },
        { time: "13:30", title: "Lunch — first stroopwafel stop", cat: "food",
          desc: "Warm stroopwafels at the market. Non-negotiable.",
          location: "Albert Cuyp Markt, Amsterdam" },
        { time: "15:00", end: "17:00", title: "Canal ring walk", cat: "sight",
          desc: "Jordaan → Nine Streets → Dam Square. No tickets, just wandering.",
          location: "Jordaan, Amsterdam" },
        { time: "18:30", title: "Dinner", cat: "food",
          desc: "Pick one from the Restaurants section below." }
      ]
    },
    {
      date: "2026-08-11",
      label: "Day 2",
      theme: "Museum day",
      desc: "The big two. Both are BOOKED — tickets are on the buttons.",
      items: [
        { time: "09:00", title: "Anne Frank House", cat: "sight", booked: true,
          desc: "Entry at 09:00 sharp — be there 15 min early, they are strict about time slots.",
          location: "Anne Frank House, Amsterdam",
          tickets: "https://www.annefrank.org/en/museum/tickets/",
          url: "https://www.annefrank.org/en/" },
        { time: "11:30", title: "Coffee & apple pie break", cat: "food",
          desc: "Winkel 43 — allegedly the best appeltaart in the city.",
          location: "Winkel 43, Noordermarkt, Amsterdam" },
        { time: "13:30", end: "16:30", title: "Rijksmuseum", cat: "sight", booked: false,
          desc: "Rembrandt's Night Watch and much more. Book a slot ahead!",
          location: "Rijksmuseum, Amsterdam",
          tickets: "https://www.rijksmuseum.nl/en/tickets",
          url: "https://www.rijksmuseum.nl/en" },
        { time: "17:00", title: "Free time", cat: "free",
          desc: "Museumplein, Vondelpark, or shopping — see Free time ideas below." },
        { time: "19:00", title: "Dinner", cat: "food" }
      ]
    },
    {
      date: "2026-08-12",
      label: "Day 3",
      theme: "Canals & Van Gogh",
      desc: "Morning on the water, art in the afternoon.",
      items: [
        { time: "10:00", end: "11:15", title: "Canal cruise", cat: "sight", booked: false,
          desc: "Open boat, ~75 minutes. Departs near Centraal.",
          location: "Amsterdam Centraal",
          tickets: "https://www.lovers.nl/en/canal-cruises/" },
        { time: "12:00", title: "Lunch at Foodhallen", cat: "food",
          desc: "Indoor food market — everyone picks their own thing.",
          location: "Foodhallen, Amsterdam",
          url: "https://foodhallen.nl/" },
        { time: "14:30", end: "17:00", title: "Van Gogh Museum", cat: "sight", booked: false,
          desc: "Timed entry only — sells out days ahead, book now.",
          location: "Van Gogh Museum, Amsterdam",
          tickets: "https://www.vangoghmuseum.nl/en/visit/tickets",
          url: "https://www.vangoghmuseum.nl/en" },
        { time: "18:00", title: "Free time + dinner", cat: "free" }
      ]
    },
    {
      date: "2026-08-13",
      label: "Day 4",
      theme: "Bikes & goodbye",
      desc: "Last morning — bikes if the weather plays along.",
      items: [
        { time: "09:30", end: "12:00", title: "Bike ride in Vondelpark", cat: "sight",
          desc: "Rent bikes near the park entrance. Kids' bikes available.",
          location: "Vondelpark, Amsterdam" },
        { time: "12:30", title: "Last lunch & pack up", cat: "food" },
        { time: "14:30", title: "Train to Schiphol", cat: "travel",
          location: "Amsterdam Centraal" },
        { time: "17:20", title: "Flight home ✈️", cat: "travel",
          location: "Schiphol Airport" }
      ]
    }
  ],

  freeTime: [
    { title: "Vondelpark", area: "Museum Quarter", tags: ["outdoors", "free", "kids"],
      desc: "Amsterdam's Central Park. Playgrounds, ponds, and a pancake house in the middle.",
      location: "Vondelpark, Amsterdam" },
    { title: "NEMO Science Museum", area: "Oosterdok", tags: ["kids", "indoor", "rainy day"],
      desc: "Five floors of hands-on science for kids. Free rooftop terrace with a great view.",
      location: "NEMO Science Museum, Amsterdam",
      tickets: "https://www.nemosciencemuseum.nl/en/tickets/",
      url: "https://www.nemosciencemuseum.nl/en/" },
    { title: "A'DAM Lookout swing", area: "Noord", tags: ["thrill", "views"],
      desc: "Europe's highest swing, hanging over the edge of a 100 m tower. Free ferry ride there from Centraal.",
      location: "A'DAM Lookout, Amsterdam",
      tickets: "https://www.adamlookout.com/tickets/",
      url: "https://www.adamlookout.com/" },
    { title: "Nine Streets shopping", area: "Canal ring", tags: ["shopping", "free"],
      desc: "Nine little streets of boutiques, vintage shops and cafés between the canals.",
      location: "De 9 Straatjes, Amsterdam" },
    { title: "Bloemenmarkt", area: "Centre", tags: ["free", "quick stop"],
      desc: "The floating flower market. Tulip bulbs make good souvenirs (check they're export-certified).",
      location: "Bloemenmarkt, Amsterdam" },
    { title: "Body Worlds / Ripley's", area: "Damrak", tags: ["indoor", "rainy day"],
      desc: "Backup plan for a rainy afternoon near Dam Square.",
      location: "Body Worlds Amsterdam" }
  ],

  restaurants: [
    { name: "Moeders", cuisine: "Dutch", area: "Jordaan", price: "€€",
      desc: "Classic Dutch home cooking, walls covered in photos of mothers. Book ahead!",
      location: "Moeders, Rozengracht, Amsterdam",
      url: "https://www.moeders.com/" },
    { name: "Foodhallen", cuisine: "Food court", area: "Oud-West", price: "€€",
      desc: "Indoor food market with 20+ stands — perfect when everyone wants something different.",
      location: "Foodhallen, Amsterdam",
      url: "https://foodhallen.nl/" },
    { name: "The Pancake Bakery", cuisine: "Pancakes", area: "Prinsengracht", price: "€€",
      desc: "75 kinds of Dutch pancakes in an old canal warehouse. Near Anne Frank House.",
      location: "The Pancake Bakery, Amsterdam",
      url: "https://pancake.nl/" },
    { name: "Winkel 43", cuisine: "Café", area: "Jordaan", price: "€",
      desc: "THE apple pie. Expect a queue on weekends — worth it.",
      location: "Winkel 43, Amsterdam",
      url: "https://winkel43.nl/" },
    { name: "Fabel Friet", cuisine: "Fries", area: "Nine Streets", price: "€",
      desc: "The famous crispy fries with melted cheese. The line moves fast.",
      location: "Fabel Friet, Amsterdam" },
    { name: "Kam Yin", cuisine: "Surinamese", area: "Centre", price: "€",
      desc: "Cheap, fast and delicious Surinamese-Chinese — try the roti or a broodje pom.",
      location: "Kam Yin, Warmoesstraat, Amsterdam" }
  ],

  info: [
    { icon: "🚋", title: "Getting around",
      desc: "Trams and metros: tap in AND out with any contactless debit/credit card (OVpay). Kids 4–11 travel cheaper with a personal OV-chipkaart. Or just walk — the centre is small." },
    { icon: "🚲", title: "Watch the bike lanes!",
      desc: "Red/brown pavement = bike lane. Cyclists have right of way and they do NOT slow down. Look both ways twice, especially with the kids." },
    { icon: "💶", title: "Paying",
      desc: "Cards work everywhere; many places are card-only. Some market stalls prefer cash — keep €20–30 in coins/small notes." },
    { icon: "☔", title: "Weather",
      desc: "Amsterdam weather changes by the hour. Bring a light rain jacket every day, even if the morning looks sunny." },
    { icon: "🆘", title: "Emergency",
      desc: "112 for police/ambulance/fire (EU-wide). Pharmacies are called 'apotheek'." }
  ]
};
