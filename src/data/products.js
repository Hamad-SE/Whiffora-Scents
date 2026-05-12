// Mock product data — replace with Supabase fetch when ready

export const products = [
  {
    id: '1',
    name: 'Velora',
    tagline: 'Soft. Warm. Alluring.',
    description:
      'A bold declaration of presence. Elara opens with a cloud of dark saffron before settling into a rich heart of rose oud and amber, leaving a trail of warm sandalwood and musk that lingers long after you\'ve left the room.',
    price: 1599,
    original_price: 1999,
    sizes: [
      { label: '50ml', price: 1599, original_price: 1899 },
    ],
    image_url: '/Velora1.jpeg',
    gallery: [
      '/Velora1.jpeg',
    ],
    category: 'Woody',
    top_notes: ['Lemon', 'Mint', 'Grapefruit'],
    heart_notes: ['Ginger', 'Jasmine', 'Nutmeg'],
    base_notes: ['Sandalwood', 'Incense', 'Cedarwood'],
    is_featured: true,
  },
  {
    id: '2',
    name: 'Elara',
    tagline: 'Light. Ethereal. Unforgettable.',
    description:
      'Born from sunlit gardens and sea breezes. Elara is a luminous white floral — sheer neroli and jasmine over a warm musky base — the perfect companion for morning rituals.',
    price: 1699,
    original_price: 1999,
    sizes: [
      { label: '50ml', price: 1699, original_price: 1999 },
    ],
    image_url: '/Elara.jpeg',
    gallery: [
      '/Elara.jpeg',
    ],
    category: 'Floral',
    top_notes: ['Pomegranate', 'Yuzu', 'Pink Peppercorn'],
    heart_notes: ['Lotus', 'Jasmine', 'Magnolia'],
    base_notes: ['Musk', 'Amber', 'Ambrette'],
    is_featured: true,
  },
  {
    id: '3',
    name: 'Oud Royale',
    tagline: 'Deep woods. Cool earth. Wild spirit.',
    description:
      'Step into a forest at dusk. Pine resin and cold air give way to a heart of cedarwood and iris, rooted in a rich base of dark patchouli and leather — a scent for those who walk their own path.',
    price: 1999,
    original_price: 2499,
    sizes: [
      { label: '50ml', price: 1999, original_price: 2299 },
    ],
    image_url: '/Oud Royale.jpeg',
    gallery: [
      '/Oud Royale.jpeg',
    ],
    category: 'Woody',
    top_notes: ['Saffron', 'Rose', 'Bergamot'],
    heart_notes: ['Oud', 'Leather', 'Amber'],
    base_notes: ['Amber', 'Musk', 'Vetiver'],
    is_featured: true,
  },
  // {
  //   id: '4',
  //   name: 'Citron Éclat',
  //   tagline: 'Fresh. Zesty. Sun-drenched.',
  //   description:
  //     'A burst of Mediterranean sunshine. Citron Éclat opens with sparkling grapefruit and lemon zest, blooms into a heart of neroli and green tea, and dries down to a clean, skin-like musk.',
  //   price: 6500,
  //   sizes: [
  //     { label: '30ml', price: 4200 },
  //     { label: '50ml', price: 6500 },
  //     { label: '100ml', price: 11000 },
  //   ],
  //   image_url: 'https://images.unsplash.com/photo-1601295452898-54d3e75a8a1e?w=800&q=90',
  //   gallery: [
  //     'https://images.unsplash.com/photo-1601295452898-54d3e75a8a1e?w=800&q=90',
  //   ],
  //   category: 'Citrus',
  //   top_notes: ['Grapefruit', 'Lemon Zest', 'Mandarin'],
  //   heart_notes: ['Neroli', 'Green Tea', 'Jasmine'],
  //   base_notes: ['Musk', 'Vetiver', 'Ambergris'],
  //   is_featured: false,
  // },
  // {
  //   id: '5',
  //   name: 'Rose Royale',
  //   tagline: 'Majestic. Velvety. Timeless.',
  //   description:
  //     'The queen of all roses. Rose Royale is a sumptuous, full-bodied rose fragrance enriched with oud, saffron, and warm vanilla — a tribute to timeless femininity and unmatched elegance.',
  //   price: 9200,
  //   sizes: [
  //     { label: '30ml', price: 5900 },
  //     { label: '50ml', price: 9200 },
  //     { label: '100ml', price: 15500 },
  //   ],
  //   image_url: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&q=90',
  //   gallery: [
  //     'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&q=90',
  //     'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=90',
  //   ],
  //   category: 'Floral',
  //   top_notes: ['Saffron', 'Raspberry', 'Bergamot'],
  //   heart_notes: ['Turkish Rose', 'Oud', 'Geranium'],
  //   base_notes: ['Vanilla', 'Patchouli', 'Sandalwood'],
  //   is_featured: true,
  // },
  // {
  //   id: '6',
  //   name: 'Ambre Mystique',
  //   tagline: 'Warm. Seductive. Ancient.',
  //   description:
  //     'Steeped in the mystery of ancient trade routes, Ambre Mystique is a warm, resinous oriental that evolves beautifully on the skin — from sweet labdanum to a final musky embrace.',
  //   price: 7500,
  //   sizes: [
  //     { label: '30ml', price: 4900 },
  //     { label: '50ml', price: 7500 },
  //     { label: '100ml', price: 12800 },
  //   ],
  //   image_url: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=90',
  //   gallery: [
  //     'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=90',
  //   ],
  //   category: 'Oriental',
  //   top_notes: ['Cardamom', 'Cinnamon', 'Clove'],
  //   heart_notes: ['Labdanum', 'Benzoin', 'Jasmine'],
  //   base_notes: ['Amber', 'Musk', 'Vanilla'],
  //   is_featured: false,
  // },
];

export const categories = [
  {
    id: 'floral',
    name: 'Floral',
    description: 'Romantic blooms in every drop',
    icon: '🌸',
    color: 'from-rose-50 to-pink-50',
  },
  {
    id: 'woody',
    name: 'Woody',
    description: 'Earth, bark and ancient forests',
    icon: '🪵',
    color: 'from-amber-50 to-yellow-50',
  },
  {
    id: 'citrus',
    name: 'Citrus',
    description: 'Zesty freshness and bright energy',
    icon: '🍋',
    color: 'from-yellow-50 to-lime-50',
  },
  {
    id: 'oriental',
    name: 'Oriental',
    description: 'Rich spices from distant lands',
    icon: '✨',
    color: 'from-orange-50 to-amber-50',
  },
];

// export const testimonials = [
//   {
//     id: 1,
//     name: 'Aisha Rahman',
//     location: 'Lahore',
//     quote:
//       '"Oud Nocturne is everything I could have ever wanted in a fragrance. Rich, complex, and absolutely magnetic. I receive compliments everywhere I go."',
//     rating: 5,
//     product: 'Oud Nocturne',
//   },
//   {
//     id: 2,
//     name: 'Zainab Ali',
//     location: 'Karachi',
//     quote:
//       '"Blanche Soleil feels like wearing a cloud. It\'s so delicate and beautiful. My new signature scent, without question."',
//     rating: 5,
//     product: 'Blanche Soleil',
//   },
//   {
//     id: 3,
//     name: 'Sara Malik',
//     location: 'Islamabad',
//     quote:
//       '"Rose Royale is the most luxurious thing I have ever worn. The oud and rose combination is absolutely divine. Worth every rupee."',
//     rating: 5,
//     product: 'Rose Royale',
//   },
// ];
