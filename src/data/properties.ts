export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  city: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  hostName: string;
  type: "Appartement" | "Suite" | "Loft" | "Villa" | "Chalet";
  reviews: Review[];
};

export const properties: Property[] = [
  {
    id: "1",
    title: "Appartement atypique vue Notre Dame de la Garde",
    description:
      "CALME ABSOLU. ENTIÈREMENT CLIMATISÉ. Richement équipé avec 3 petites chambres : une en mezzanine, une dans l'entrée de l'appartement et une plus grande se situant sous celle en mezzanine. Il est idéalement situé plein centre de la ville à côté de la place Estrangin-préfecture. A 8 min à pieds du vieux port.",
    image: "/img/airbnb_01.png",
    images: ["/img/airbnb_01.png", "/img/airbnb_02.png", "/img/airbnb_03.png"],
    price: 95,
    rating: 4.8,
    reviewCount: 127,
    location: "Marseille, France",
    city: "Marseille",
    maxGuests: 4,
    bedrooms: 3,
    bathrooms: 1,
    amenities: ["WiFi", "Climatisation", "Cuisine équipée", "Lave-linge", "TV", "Parking"],
    hostName: "Marie",
    type: "Appartement",
    reviews: [
      {
        id: "r1",
        author: "Thomas D.",
        avatar: "T",
        rating: 5,
        comment: "Vue incroyable et appartement très propre. Marie est une hôte parfaite.",
        date: "Novembre 2025",
      },
      {
        id: "r2",
        author: "Sarah L.",
        avatar: "S",
        rating: 4,
        comment: "Idéalement situé, à deux pas du vieux port. Je recommande !",
        date: "Octobre 2025",
      },
    ],
  },
  {
    id: "2",
    title: "Suite L'Alpina avec Sauna et Baignoire",
    description:
      "Plongez dans une véritable évasion alpine en plein cœur de Lille. Cette suite est totalement coupée du monde extérieur, sans fenêtre ni extérieur, offrant une immersion totale dans une atmosphère chaleureuse et apaisante. Profitez d'un sauna artisanal en brique, d'une baignoire, d'une cheminée et d'une ambiance montagnarde idéale pour une parenthèse hors du temps.",
    image: "/img/airbnb_02.png",
    images: ["/img/airbnb_02.png", "/img/airbnb_01.png", "/img/airbnb_03.png"],
    price: 180,
    rating: 4.95,
    reviewCount: 89,
    location: "Lille, France",
    city: "Lille",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Sauna", "Baignoire balnéo", "Cheminée", "WiFi", "Mini-bar", "Room service"],
    hostName: "Lucas",
    type: "Suite",
    reviews: [
      {
        id: "r3",
        author: "Emma P.",
        avatar: "E",
        rating: 5,
        comment:
          "Une nuit inoubliable ! Le sauna est absolument parfait après une longue journée.",
        date: "Janvier 2026",
      },
      {
        id: "r4",
        author: "Paul M.",
        avatar: "P",
        rating: 5,
        comment: "Romantique et dépaysant. On s'y croirait vraiment en montagne.",
        date: "Décembre 2025",
      },
    ],
  },
  {
    id: "3",
    title: "Loft industriel chic calme Garibaldi climatisation balcon",
    description:
      "LOFT INDUSTRIEL CHIC - PLACE GARIBALDI - Cocon d'architecte (briques, poutres, verrière) au calme absolu sur cour. RDC : Salon climatisé (TV, canapé convertible confort). Cuisine ultra-équipée (Nespresso, lave-vaisselle, lave-linge). Chambre avec lit 140x200 & rideaux occultants. MEZZANINE : Lit 140x200 via escalier design. 2 min Vieux-Nice, 5 min Port.",
    image: "/img/airbnb_03.png",
    images: ["/img/airbnb_03.png", "/img/airbnb_01.png", "/img/airbnb_02.png"],
    price: 120,
    rating: 4.7,
    reviewCount: 203,
    location: "Nice, France",
    city: "Nice",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Balcon", "Climatisation", "WiFi", "Nespresso", "Lave-vaisselle", "Vue mer"],
    hostName: "Sophie",
    type: "Loft",
    reviews: [
      {
        id: "r5",
        author: "Julie R.",
        avatar: "J",
        rating: 5,
        comment: "Superbe loft très bien décoré. La vue depuis le balcon est magnifique.",
        date: "Février 2026",
      },
      {
        id: "r6",
        author: "Marc B.",
        avatar: "M",
        rating: 4,
        comment: "Très bien situé, à 2 min du Vieux-Nice. Sophie est très réactive.",
        date: "Janvier 2026",
      },
    ],
  },
];
