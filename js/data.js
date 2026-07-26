/* ============================================================
   TRIP DATA — this is the ONLY file you need to edit.
   All content on the site (schedule, free time ideas,
   restaurants, info) comes from this file.

   The SCHEDULE is the real booked itinerary (20–27 Aug 2026).
   Free time ideas and restaurants are suggestions — edit freely.

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

   All times are LOCAL to where we are at that moment
   (Cyprus time in Cyprus, Dutch time in the Netherlands).
   ============================================================ */

const TRIP = {
  title: "Amsterdam",
  subtitle: "Family trip — the plan, the tickets, the food. All in one place.",

  hotel: {
    name: "The Social Hub Amsterdam",
    location: "The Social Hub Amsterdam",
    url: "https://www.thesocialhub.co/amsterdam/"
  },

  days: [
    {
      date: "2026-08-20",
      label: "Day 1",
      theme: "Fly to Amsterdam",
      desc: "Travel day. Times are local: Cyprus time in Cyprus, Dutch time in the Netherlands.",
      items: [
        { time: "13:00", title: "Flight: Larnaca → Amsterdam Schiphol", cat: "travel", booked: true,
          desc: "Departs 13:00 Cyprus time, lands 16:40 Dutch time. Be at the airport ~2h before.",
          location: "Larnaca International Airport" },
        { time: "16:40", title: "Land at Schiphol", cat: "travel",
          desc: "Direct train to Amsterdam Centraal every ~10 min (17 min ride). Tap in/out with any contactless bank card (OVpay).",
          location: "Schiphol Airport" },
        { time: "18:00", title: "Check in — The Social Hub", cat: "travel", booked: true,
          desc: "Home for the whole week.",
          location: "The Social Hub Amsterdam",
          url: "https://www.thesocialhub.co/amsterdam/" },
        { time: "19:30", title: "Dinner near the hotel", cat: "food",
          desc: "Keep it easy after the flight — see the Restaurants section for ideas." }
      ]
    },
    {
      date: "2026-08-21",
      label: "Day 2",
      theme: "City wandering & Van Gogh",
      desc: "Free morning exploring the centre, museum in the afternoon.",
      items: [
        { time: "10:00", title: "Explore the city", cat: "free",
          desc: "Canal ring, Dam Square, Jordaan, Nine Streets — or pick from the Free time ideas below.",
          location: "Dam Square, Amsterdam" },
        { time: "13:00", title: "Lunch", cat: "food",
          desc: "Wherever we end up — Fabel Friet or a stroopwafel stop are near the Nine Streets." },
        { time: "16:00", end: "18:00", title: "Van Gogh Museum", cat: "sight", booked: true,
          desc: "Timed entry at 16:00 — arrive ~15 min early with tickets ready on a phone.",
          location: "Van Gogh Museum, Amsterdam",
          url: "https://www.vangoghmuseum.nl/en" },
        { time: "19:00", title: "Dinner", cat: "food",
          desc: "Museum Quarter / De Pijp area is right there." }
      ]
    },
    {
      date: "2026-08-22",
      label: "Day 3",
      theme: "Dutch Grand Prix — Saturday 🏎️",
      desc: "Qualifying day at Circuit Zandvoort. It gets PACKED — leave early.",
      items: [
        { time: "08:30", title: "Train to Zandvoort aan Zee", cat: "travel",
          desc: "Direct train from Amsterdam Centraal (~30 min); extra GP trains run on race weekend but expect crowds. The circuit is a short walk from the station.",
          location: "Amsterdam Centraal" },
        { time: "10:00", title: "Circuit Zandvoort — qualifying day", cat: "sight", booked: true,
          desc: "Practice + qualifying. Bring earplugs (seriously), sunscreen and a rain layer — it's on the coast. Mostly cashless at the circuit.",
          location: "Circuit Zandvoort",
          url: "https://www.dutchgp.com/en/" },
        { time: "18:30", title: "Train back + dinner", cat: "food",
          desc: "Expect queues for the train after the sessions end — grab food in Zandvoort if the line is crazy.",
          location: "Zandvoort aan Zee station" }
      ]
    },
    {
      date: "2026-08-23",
      label: "Day 4",
      theme: "Dutch Grand Prix — Race day 🏁",
      desc: "The big one. Same drill as Saturday, even busier.",
      items: [
        { time: "08:30", title: "Train to Zandvoort aan Zee", cat: "travel",
          desc: "Go early — race day crowds are the biggest of the weekend.",
          location: "Amsterdam Centraal" },
        { time: "10:00", title: "Circuit Zandvoort — RACE DAY", cat: "sight", booked: true,
          desc: "Support races in the morning, main race in the afternoon. Beach is right there if anyone needs a break from the noise.",
          location: "Circuit Zandvoort",
          url: "https://www.dutchgp.com/en/" },
        { time: "19:00", title: "Head back & dinner", cat: "food",
          desc: "Patience for the trains — everyone leaves at once after the race." }
      ]
    },
    {
      date: "2026-08-24",
      label: "Day 5",
      theme: "Utrecht day trip",
      desc: "Slower day in the Netherlands' prettiest small city — 27 min by train.",
      items: [
        { time: "09:30", title: "Train to Utrecht Centraal", cat: "travel",
          desc: "Direct intercity from Amsterdam Centraal every ~10 min, 27 min ride.",
          location: "Amsterdam Centraal" },
        { time: "10:30", title: "Old town & canal wharves", cat: "sight",
          desc: "Utrecht's canals have unique wharf cellars at water level — great for a wander and a coffee.",
          location: "Oudegracht, Utrecht" },
        { time: "12:00", title: "Dom Tower", cat: "sight", booked: false,
          desc: "Tallest church tower in NL — 465 steps, amazing view. Guided climbs only, book a slot.",
          location: "Domtoren, Utrecht",
          tickets: "https://www.domtoren.nl/en/tickets",
          url: "https://www.domtoren.nl/en" },
        { time: "13:30", title: "Lunch in the old town", cat: "food",
          location: "Oudegracht, Utrecht" },
        { time: "15:00", title: "Pick one: Railway Museum or Miffy Museum", cat: "free",
          desc: "Spoorwegmuseum (trains, big hit with kids) or Nijntje Museum (Miffy was born in Utrecht — best for little ones).",
          location: "Spoorwegmuseum, Utrecht",
          url: "https://www.spoorwegmuseum.nl/en/" },
        { time: "18:00", title: "Train back to Amsterdam", cat: "travel",
          location: "Utrecht Centraal" }
      ]
    },
    {
      date: "2026-08-25",
      label: "Day 6",
      theme: "Free day",
      desc: "Nothing booked — pick whatever we fancy from the Free time ideas below.",
      items: [
        { time: "10:00", title: "Open day — family's choice", cat: "free",
          desc: "Canal cruise? A'DAM Lookout? Vondelpark + bikes? Day at the beach? Scroll down to Free time ideas and vote." },
        { time: "19:00", title: "Dinner", cat: "food",
          desc: "Good night to book somewhere nice — Moeders needs a reservation." }
      ]
    },
    {
      date: "2026-08-26",
      label: "Day 7",
      theme: "NEMO & last full day",
      desc: "Science museum in the morning, free afternoon for last wishes & souvenirs.",
      items: [
        { time: "10:00", end: "13:00", title: "NEMO Science Museum", cat: "sight", booked: true,
          desc: "Entry at 10:00. Five floors of hands-on experiments — don't miss the free rooftop terrace view.",
          location: "NEMO Science Museum, Amsterdam",
          url: "https://www.nemosciencemuseum.nl/en/" },
        { time: "13:30", title: "Lunch", cat: "food",
          desc: "NEMO rooftop café, or walk to the centre.",
          location: "NEMO Science Museum, Amsterdam" },
        { time: "15:00", title: "Free afternoon", cat: "free",
          desc: "Souvenirs (Bloemenmarkt for tulip bulbs), anything we missed, or just a canal-side ice cream." },
        { time: "19:00", title: "Farewell dinner", cat: "food",
          desc: "Last dinner in Amsterdam — make it count." }
      ]
    },
    {
      date: "2026-08-27",
      label: "Day 8",
      theme: "Fly home",
      desc: "Pack up, one last stroopwafel, and home. Times local again: Dutch → Cyprus.",
      items: [
        { time: "09:00", title: "Pack & check out", cat: "travel",
          location: "The Social Hub Amsterdam" },
        { time: "10:30", title: "Train to Schiphol", cat: "travel",
          desc: "Aim to be at Schiphol by ~11:15 — security queues can be long in August.",
          location: "Amsterdam Centraal" },
        { time: "13:35", title: "Flight: Amsterdam → Larnaca", cat: "travel", booked: true,
          desc: "Departs 13:35 Dutch time, lands 18:45 Cyprus time.",
          location: "Schiphol Airport" }
      ]
    }
  ],

  freeTime: [
    { title: "Canal cruise", area: "Centre", tags: ["classic", "relaxing"],
      desc: "Open boat, ~75 minutes through the canal ring. The best first-look at the city.",
      location: "Amsterdam Centraal",
      tickets: "https://www.lovers.nl/en/canal-cruises/" },
    { title: "Vondelpark", area: "Museum Quarter", tags: ["outdoors", "free", "kids"],
      desc: "Amsterdam's Central Park. Playgrounds, ponds, and a pancake house in the middle. Rent bikes nearby.",
      location: "Vondelpark, Amsterdam" },
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
    { title: "Rijksmuseum", area: "Museum Quarter", tags: ["art", "rainy day"],
      desc: "The Night Watch and 8000 more masterpieces. If we're in the mood for one more museum — book a slot first.",
      location: "Rijksmuseum, Amsterdam",
      tickets: "https://www.rijksmuseum.nl/en/tickets",
      url: "https://www.rijksmuseum.nl/en" },
    { title: "Zandvoort beach", area: "Zandvoort", tags: ["outdoors", "kids"],
      desc: "We're there for the GP anyway — the beach is right next to the circuit. Also a nice free-day option by train.",
      location: "Zandvoort aan Zee" }
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
      desc: "75 kinds of Dutch pancakes in an old canal warehouse.",
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
      desc: "Trams, metros and trains: tap in AND out with any contactless debit/credit card (OVpay). Or just walk — the centre is small." },
    { icon: "🏎️", title: "GP weekend travel",
      desc: "Sat 22 + Sun 23 Aug: direct trains Amsterdam Centraal → Zandvoort aan Zee (~30 min). Go EARLY, expect big queues coming back. Circuit is mostly cashless." },
    { icon: "🚲", title: "Watch the bike lanes!",
      desc: "Red/brown pavement = bike lane. Cyclists have right of way and they do NOT slow down. Look both ways twice." },
    { icon: "💶", title: "Paying",
      desc: "Cards work everywhere; many places are card-only. Some market stalls prefer cash — keep €20–30 in small notes." },
    { icon: "☔", title: "Weather",
      desc: "Amsterdam weather changes by the hour. Light rain jacket every day, even if the morning looks sunny — especially at the coast in Zandvoort." },
    { icon: "🕐", title: "Time zones",
      desc: "Netherlands is 1 hour behind Cyprus. All times in this schedule are local to wherever we are at that moment." },
    { icon: "🆘", title: "Emergency",
      desc: "112 for police/ambulance/fire (EU-wide). Pharmacies are called 'apotheek'." }
  ]
};
