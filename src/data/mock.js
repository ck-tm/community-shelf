export const TITLES = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    type: "Books",
    description:
      "A dazzling novel about all the choices that go into a life well lived. Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life.",
    isbn: "978-0857525550",
    year: 2020,
    language: "English",
    organization: "Downtown Public Library",
    cover: "#0D7377",
    copies: [
      { id: 101, condition: "Good", location: "Main Shelf", status: "available" },
      { id: 102, condition: "Excellent", location: "Main Shelf", status: "available" },
      { id: 103, condition: "Fair", location: "Storage", status: "reserved" },
    ],
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    type: "Books",
    description:
      "An epic science fiction novel of politics, religion, and ecology on the desert planet Arrakis. A masterpiece of world-building and storytelling.",
    isbn: "978-0441172719",
    year: 1965,
    language: "English",
    organization: "University Media Center",
    cover: "#D4A574",
    copies: [
      { id: 201, condition: "Excellent", location: "Stack B", status: "available" },
      { id: 202, condition: "Good", location: "Stack B", status: "reserved" },
    ],
  },
  {
    id: 3,
    title: "Inception",
    author: "Christopher Nolan",
    type: "Movies",
    description:
      "A skilled thief who steals corporate secrets through dream-sharing technology is given a chance to erase his criminal record by planting an idea into a CEO's subconscious.",
    isbn: "DVD-2010-001",
    year: 2010,
    language: "English",
    organization: "Community Arts Hub",
    cover: "#6B4C9A",
    copies: [
      { id: 301, condition: "Excellent", location: "DVD Section", status: "available" },
      { id: 302, condition: "Good", location: "DVD Section", status: "available" },
    ],
  },
  {
    id: 4,
    title: "Abbey Road",
    author: "The Beatles",
    type: "Music",
    description:
      "The iconic final Beatles album featuring memorable tracks like Come Together and Here Comes the Sun, with innovative production techniques.",
    isbn: "VINYL-1969-001",
    year: 1969,
    language: "English",
    organization: "Downtown Public Library",
    cover: "#C41E3A",
    copies: [
      { id: 401, condition: "Good", location: "Vinyl Collection", status: "available" },
    ],
  },
  {
    id: 5,
    title: "National Geographic — March 2025",
    author: "National Geographic Society",
    type: "Magazines",
    description:
      "Explore the world through stunning photography and in-depth storytelling, covering science, nature, and culture.",
    isbn: "MAG-2025-03",
    year: 2025,
    language: "English",
    organization: "University Media Center",
    cover: "#E69500",
    copies: [
      { id: 501, condition: "Excellent", location: "Magazine Rack", status: "available" },
      { id: 502, condition: "Good", location: "Magazine Rack", status: "available" },
      { id: 503, condition: "Good", location: "Magazine Rack", status: "reserved" },
    ],
  },
  {
    id: 6,
    title: "Elden Ring",
    author: "FromSoftware",
    type: "Games",
    description:
      "An action role-playing game set in a vast open world full of mystery and peril, developed in collaboration with George R.R. Martin.",
    isbn: "GAME-2022-001",
    year: 2022,
    language: "English",
    organization: "Community Arts Hub",
    cover: "#D4AF37",
    copies: [
      { id: 601, condition: "Excellent", location: "Gaming Collection", status: "available" },
    ],
  },
  {
    id: 7,
    title: "Brave New World",
    author: "Aldous Huxley",
    type: "Books",
    description:
      "A dystopian novel set in a technologically advanced future that explores themes of freedom, conformity, and what it means to be human.",
    isbn: "978-0060850524",
    year: 1932,
    language: "English",
    organization: "Downtown Public Library",
    cover: "#2C5F5F",
    copies: [
      { id: 701, condition: "Fair", location: "Classic Literature", status: "available" },
      { id: 702, condition: "Good", location: "Main Shelf", status: "available" },
    ],
  },
  {
    id: 8,
    title: "Parasite",
    author: "Bong Joon-ho",
    type: "Movies",
    description:
      "A dark, genre-bending thriller about class conflict between a wealthy family and a group of resourceful con artists. Winner of the Palme d'Or.",
    isbn: "DVD-2019-002",
    year: 2019,
    language: "Korean",
    organization: "University Media Center",
    cover: "#2C3E50",
    copies: [
      { id: 801, condition: "Excellent", location: "International Films", status: "available" },
    ],
  },
  {
    id: 9,
    title: "Jazz Classics Collection",
    author: "Various Artists",
    type: "Music",
    description:
      "A curated collection of essential jazz albums spanning decades of musical genius, from Miles Davis to John Coltrane.",
    isbn: "VINYL-JAZZ-001",
    year: 2023,
    language: "English",
    organization: "Community Arts Hub",
    cover: "#34495E",
    copies: [
      { id: 901, condition: "Good", location: "Vinyl Collection", status: "available" },
      { id: 902, condition: "Excellent", location: "Vinyl Collection", status: "available" },
    ],
  },
  {
    id: 10,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    type: "Books",
    description:
      "A psychological thriller about a famous painter who shoots her husband and then never speaks another word. A forensic psychotherapist becomes obsessed with uncovering the truth.",
    isbn: "978-1250301697",
    year: 2019,
    language: "English",
    organization: "University Media Center",
    cover: "#1A1A2E",
    copies: [
      { id: 1001, condition: "Excellent", location: "Thriller Section", status: "available" },
      { id: 1002, condition: "Good", location: "Thriller Section", status: "reserved" },
    ],
  },
  {
    id: 11,
    title: "Mellon Collie and the Infinite Sadness",
    author: "Smashing Pumpkins",
    type: "Music",
    description:
      "A landmark 1995 double album of alternative rock excellence, spanning 28 tracks of sonic ambition and emotional depth.",
    isbn: "CD-1995-001",
    year: 1995,
    language: "English",
    organization: "Downtown Public Library",
    cover: "#FF6B9D",
    copies: [
      { id: 1101, condition: "Good", location: "CD Collection", status: "available" },
    ],
  },
  {
    id: 12,
    title: "Planet Earth Series",
    author: "BBC Natural History Unit",
    type: "Movies",
    description:
      "Explore the natural wonders of our planet through breathtaking cinematography narrated by Sir David Attenborough.",
    isbn: "DVD-BOXSET-001",
    year: 2016,
    language: "English",
    organization: "Community Arts Hub",
    cover: "#228B22",
    copies: [
      { id: 1201, condition: "Excellent", location: "Documentary Section", status: "available" },
      { id: 1202, condition: "Good", location: "Documentary Section", status: "available" },
      { id: 1203, condition: "Good", location: "Storage", status: "available" },
    ],
  },
];

export const ORGANIZATIONS = [
  "Downtown Public Library",
  "University Media Center",
  "Community Arts Hub",
];

export const TYPES = ["All", "Books", "Movies", "Magazines", "Music", "Games"];

export const TYPE_COLORS = {
  Books: "#0D7377",
  Movies: "#6B4C9A",
  Music: "#C41E3A",
  Games: "#D4AF37",
  Magazines: "#E69500",
};

export const MOCK_CURATED_LISTS = [
  {
    id: 1,
    title: "Essential Reads for a Rainy Afternoon",
    description:
      "A hand-picked selection of books perfect for curling up with when the weather turns grey.",
    coverColor: "#0D7377",
    createdAt: "2026-02-10",
    sections: [
      {
        id: 1,
        heading: "Cozy Literary Fiction",
        body: "There is something about literary fiction that pairs perfectly with the sound of rain against a window. These titles transport you to thoughtful, quiet worlds.",
        titleIds: [1, 7],
      },
      {
        id: 2,
        heading: "Psychological Thrillers to Keep You Gripped",
        body: "If you prefer suspense with your tea, these page-turners will keep you reading well past the storm.",
        titleIds: [10],
      },
    ],
  },
  {
    id: 2,
    title: "Movie Night Essentials",
    description:
      "Our community's favorite films, from mind-bending sci-fi to award-winning international cinema.",
    coverColor: "#6B4C9A",
    createdAt: "2026-02-25",
    sections: [
      {
        id: 1,
        heading: "Mind-Bending Science Fiction",
        body: "Films that challenge your perception of reality and leave you thinking long after the credits roll.",
        titleIds: [3],
      },
      {
        id: 2,
        heading: "International Award Winners",
        body: "Expand your horizons with these critically acclaimed films from around the world.",
        titleIds: [8],
      },
      {
        id: 3,
        heading: "Nature Documentaries",
        body: "For a quieter movie night, these breathtaking documentaries are perfect for the whole family.",
        titleIds: [12],
      },
    ],
  },
  {
    id: 3,
    title: "Vinyl & CD Collection Highlights",
    description:
      "Discover the best of our physical music collection, from classic rock to modern jazz.",
    coverColor: "#C41E3A",
    createdAt: "2026-03-01",
    sections: [
      {
        id: 1,
        heading: "Timeless Albums",
        body: "Some albums transcend their era. These are the records that every music lover should experience on vinyl.",
        titleIds: [4, 11],
      },
      {
        id: 2,
        heading: "Jazz for the Soul",
        body: "Let these jazz collections transport you to smoky clubs and late-night improvisation sessions.",
        titleIds: [9],
      },
    ],
  },
];

export const MOCK_INQUIRIES = [
  { id: 1, title: "The Midnight Library", type: "Books", organization: "Downtown Public Library", status: "Active", requestDate: "2026-02-15", dueDate: "2026-03-15", returnDate: null, rentalPeriod: 30, notes: null },
  { id: 2, title: "Inception", type: "Movies", organization: "Community Arts Hub", status: "Pending", requestDate: "2026-03-01", dueDate: null, returnDate: null, rentalPeriod: null, notes: null },
  { id: 3, title: "Abbey Road", type: "Music", organization: "Downtown Public Library", status: "Approved", requestDate: "2026-02-20", dueDate: "2026-03-20", returnDate: null, rentalPeriod: 30, notes: "Will pick up Friday" },
  { id: 4, title: "National Geographic — March 2025", type: "Magazines", organization: "University Media Center", status: "Returned", requestDate: "2026-02-01", dueDate: "2026-03-01", returnDate: "2026-02-28", rentalPeriod: 28, notes: null },
  { id: 5, title: "Dune", type: "Books", organization: "University Media Center", status: "Overdue", requestDate: "2026-01-10", dueDate: "2026-02-10", returnDate: null, rentalPeriod: 30, notes: "Contacted borrower" },
];

export const MOCK_SITE_CONFIG = {
  logo: "",
  title: "CommunityShelf",
  description: "A community library for things worth sharing.",
  themeColors: {
    "teal-600": "#0d9488",
    "teal-700": "#0d7377",
    "teal-800": "#0a5c5f",
    "teal-900": "#074e52",
    "cream": "#f8f4ed",
    "warm": "#f3ede4",
    "amber-500": "#f5a623",
  },
};
