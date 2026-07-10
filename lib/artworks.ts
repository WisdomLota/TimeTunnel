export type Artwork = {
  id: string;           // full catalog ID, e.g. "YDU-KMSM-40072"
  num: string;          // short number for image filename, e.g. "40072"
  title: string;
  artist: string;
  country: string;
  category: string;     // Painting | Sculpture | Print
  keywords: string[];
  location: string;
  narrative: string;    // grounding blurb; Prof Dux may go beyond it
};

const A = (
  num: string, title: string, artist: string, country: string,
  category: string, keywords: string[], location: string, narrative: string
): Artwork => ({
  id: `YDU-KMSM-${num}`, num, title, artist, country, category, keywords, location, narrative,
});

export const ARTWORKS: Artwork[] = [
  A("10623", "Birliğin Ruhu", "İlham Enveroğlu", "Azerbaijan", "Painting", [], "Günsel Sanat Müzesi",
    "A painting by the Azerbaijani artist İlham Enveroğlu. Its title translates as 'The Spirit of Unity'. Placeholder narrative — refine with the museum's own description; Prof Dux may also discuss the artist, Azerbaijani modern painting, and technique."),
  A("11175", "Tomris", "Orazbek Yessenbayev", "Kazakhstan", "Painting", [], "Günsel Sanat Müzesi",
    "A work by Kazakh artist Orazbek Yessenbayev titled 'Tomris' — the name of the ancient Massagetae queen. Placeholder narrative; Prof Dux can expand on the legend of Tomris and Central Asian themes."),
  A("12479", "Okyanus", "Assim Resuloğlu", "Azerbaijan", "Painting", ["Ocean","Ship","Fish"], "Günsel Sanat Müzesi",
    "'Okyanus' (The Ocean) by Azerbaijani artist Assim Resuloğlu, evoking ships and sea life. Placeholder narrative."),
  A("16669", "İlk Kar", "Urinboy Kambarov", "Uzbekistan", "Painting", ["Abstract"], "Günsel Sanat Müzesi",
    "'İlk Kar' (First Snow) by Uzbek artist Urinboy Kambarov, an abstract evocation of the season's first snowfall. Placeholder narrative."),
  A("17539", "Mars'ta Kazak Düğünü", "Nurbek Zhardemov", "Kazakhstan", "Painting", [], "Günsel Sanat Müzesi",
    "'A Kazakh Wedding on Mars' by Nurbek Zhardemov — a playful fusion of tradition and science fiction. Placeholder narrative."),
  A("18805", "Salamander Kız", "Kubanychbek İbragimov", "Kyrgyzstan", "Painting", ["Woman","Animal","Fish","Iguana"], "Günsel Sanat Müzesi",
    "'Salamander Girl' by Kyrgyz artist Kubanychbek İbragimov, blending human and animal forms. Placeholder narrative."),
  A("18817", "Ammonit", "Kubanychbek İbragimov", "Kyrgyzstan", "Painting", ["Ammonite","Woman","Animal"], "Günsel Sanat Müzesi",
    "'Ammonite' by Kubanychbek İbragimov, weaving the ancient fossil spiral into a figurative scene. Placeholder narrative."),
  A("19159", "Ressamın Dünyaya Gelişi", "Nurtay Zhardemov", "Kazakhstan", "Painting", ["Palette","Brush","Paint","Hand"], "Günsel Sanat Müzesi",
    "'The Painter's Coming into the World' by Nurtay Zhardemov — an allegory of the artist's birth, rich with palette and brush. Placeholder narrative."),
  A("20197", "Gece Müziği", "Oleg Drozdov", "Kazakhstan", "Painting", ["Instrument","Dog","Night","Music"], "Günsel Sanat Müzesi",
    "'Night Music' by Oleg Drozdov, a nocturne of figures, instruments and a dog under darkness. Placeholder narrative."),
  A("20326", "Saklambaç Oyunu", "Marina Sinitsyna", "Russia", "Painting", ["Abstract","Hide-and-seek","Play"], "Günsel Sanat Müzesi",
    "'The Game of Hide-and-Seek' by Russian artist Marina Sinitsyna (Tiyk), an abstract take on childhood play. Placeholder narrative."),
  A("34425", "At Kadın", "Sembigali Smagulov", "Kazakhstan", "Sculpture", ["Horse-Woman"], "Günsel Sanat Müzesi",
    "'Horse-Woman' by Kazakh sculptor Sembigali Smagulov, a mythic hybrid figure in bronze. Placeholder narrative."),
  A("35832", "Müzisyen", "Tolkunbek Esenaliyev", "Kyrgyzstan", "Sculpture", ["Musician","Saxophone"], "Günsel Sanat Müzesi",
    "'Musician' by Kyrgyz sculptor Tolkunbek Esenaliyev, an elongated figure with a saxophone. Placeholder narrative."),
  A("36323", "Müzisyen", "Tolkunbek Esenaliyev", "Kyrgyzstan", "Sculpture", ["Woman","Violin","Musician"], "Günsel Sanat Müzesi",
    "Another 'Musician' by Tolkunbek Esenaliyev — a woman with a violin, rendered in his signature slender bronze style. Placeholder narrative."),
  A("40072", "Ufka Düşen Saracino", "Yücel Yazgın", "TRNC", "Print", ["Grass","Thorn","Saracino"], "Günsel Tower Sergi Salonu",
    "A print by Cypriot artist Yücel Yazgın from the 'Fallen to the Horizon' series. Placeholder narrative."),
  A("40109", "Namık Kemal (Altın Seri)", "Raif Kızıl", "TRNC–England", "Print", ["Namık Kemal","House"], "Günsel Tower Sergi Salonu",
    "From Raif Kızıl's 'Gold Series' — depicting the house of poet Namık Kemal in Famagusta. Placeholder narrative."),
  A("40114", "Aşk 02", "Gökhan Okur", "Turkey", "Painting", ["Heart","Love"], "Günsel Tower Sergi Salonu",
    "'Love 02' by Turkish artist Gökhan Okur, an ornate meditation on the heart. Placeholder narrative."),
  A("40128", "Babil", "Rana Amrahova", "Azerbaijan", "Painting", ["Number","Letter","Triangle","Babel"], "Günsel Tower Sergi Salonu",
    "'Babel' by Azerbaijani artist Rana Amrahova, dense with numbers, letters and symbols. Placeholder narrative."),
  A("40137", "Spam", "Erdoğan Ergün", "TRNC", "Painting", ["Woman","Telephone","Knife"], "Günsel Tower Sergi Salonu",
    "'Spam' by Cypriot artist Erdoğan Ergün — a wry contemporary scene with a woman, a telephone and a knife. Placeholder narrative."),
];

export const getArtwork = (id: string) =>
  ARTWORKS.find((a) => a.id.toLowerCase() === id.toLowerCase() || a.num === id);

export const artworkImage = (a: Artwork) => `/artworks/${a.num}.jpg`;