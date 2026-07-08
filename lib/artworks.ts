export type Artwork = {
  id: string;          // matches plaque catalog ID
  artist: string;
  country: string;
  artistYear: string;
  title: string;
  titleEn: string;
  year: string;
  medium: string;
  dimensions: string;
  image: string;       // /public path — your photo of the piece
  narrative: string;   // your written story; Prof Dux will draw from this later
};

export const ARTWORKS: Artwork[] = [
  {
    id: "YDU-KMSM-23247",
    artist: "Farruh Akhamdaliyev",
    country: "Uzbekistan",
    artistYear: "b. 1982",
    title: "Kutsal Gün",
    titleEn: "Sacred Day",
    year: "2020",
    medium: "Acrylic on canvas",
    dimensions: "500 × 210 cm",
    image: "/crest-sample.jpg",
    narrative:
      "A sweeping crowd scene alive with pattern and ceremony — placeholder narrative. Replace with the researched story of the work: its festival subject, the artist's Uzbek visual heritage, and what the gathering depicts.",
  },
  {
    id: "YDU-KMSM-24124",
    artist: "İsken Abdaliev",
    country: "Kyrgyzstan",
    artistYear: "b. 1979",
    title: "Afrikalı Bayan 6",
    titleEn: "African Woman 6",
    year: "2020",
    medium: "Plaster",
    dimensions: "65 × 45 × 30 cm",
    image: "/art-african-woman.jpg",
    narrative:
      "A patinated bust adorned with vivid beadwork — placeholder narrative. Replace with the story of the series, the artist's material choices, and the cross-cultural dialogue the piece stages.",
  },
  {
    id: "YDU-KMSM-4004",
    artist: "Azat Myradov",
    country: "Turkmenistan",
    artistYear: "b. 1979",
    title: "Zühre Tahir'in Mektubunu Okuyor",
    titleEn: "Zühre Reads Tahir's Letter",
    year: "2019",
    medium: "Oil on canvas",
    dimensions: "3.5 × 2 m",
    image: "/art-zuhre.jpg",
    narrative:
      "A scene drawn from the Central Asian legend of Zühre and Tahir — placeholder narrative. Replace with the tale's context, the moment depicted, and the artist's treatment of light and longing.",
  },
];

export const getArtwork = (id: string) =>
  ARTWORKS.find((a) => a.id.toLowerCase() === id.toLowerCase());