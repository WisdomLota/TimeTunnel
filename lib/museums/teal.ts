// lib/museums/teal.ts

import type { MuseumConfig } from "./types";

export const tealConfig: MuseumConfig = {
  slug: "teal",
  name: "HMS Jackton – HMAS Teal",
  branding: {
    logo: "/museums/teal/logo.svg",
    museumLogo: undefined, // placeholder for museum's own logo
    colors: {
      primary: "#0d7377",
      void: "#040e10",
      accent: "#c9a227",
      layerColors: [
        "#c9a227",  // Floor Plan — brass
        "#0d7377",  // Collection — teal
        "#C0392B",  // Post Cards — signal red
        "#2471A3",  // Journey Log — ocean blue
        "#1E8449",  // Ask Dux — living green
      ],
    },
    font: "Chakra Petch",
  },

  yearRange: [1955, 2021],

  // ── NEW: Category-based sections ──
  categories: [
    {
      id: "floor-plan",
      label: { en: "Floor Plan", tr: "Kat Planı" },
      description: { en: "Explore the ship's layout", tr: "Geminin yerleşimini keşfedin" },
      color: "#c9a227",
    },
    {
      id: "collection",
      label: { en: "Collection", tr: "Koleksiyon" },
      description: { en: "Artefacts and exhibits aboard", tr: "Gemideki eserler ve sergiler" },
      color: "#0d7377",
    },
    {
      id: "post-cards",
      label: { en: "Post Cards", tr: "Kartpostallar" },
      description: { en: "Historical postcards and photos", tr: "Tarihi kartpostallar ve fotoğraflar" },
      color: "#C0392B",
    },
    {
      id: "journey-log",
      label: { en: "Journey Log", tr: "Yolculuk Günlüğü" },
      description: { en: "Turn pages one by one with Dux", tr: "Sayfaları Dux ile tek tek çevirin" },
      color: "#2471A3",
    },
    {
      id: "ask-dux",
      label: { en: "Ask Dux", tr: "Dux'a Sor" },
      description: { 
        en: "Chat with Prof Dux about HMS Jackton - HMAS Teal", 
        tr: "Prof Dux ile HMS Jackton - HMAS Teal hakkında sohbet edin" 
      },
      color: "#1E8449",
    },
  ],

  // Legacy layers (kept for backward compat, can be removed later)
  layers: [
    { id: "origins", label: { en: "Origins", tr: "Kökenler" }, yearRange: [1955, 1962], color: "#8B7355" },
    { id: "first-ops", label: { en: "First Operations", tr: "İlk Operasyonlar" }, yearRange: [1963, 1964], color: "#0d7377" },
    { id: "confrontation", label: { en: "Confrontation", tr: "Çatışma" }, yearRange: [1964, 1966], color: "#C0392B" },
    { id: "home-waters", label: { en: "Home Waters", tr: "Ana Sular" }, yearRange: [1966, 1973], color: "#2471A3" },
    { id: "rebirth", label: { en: "Rebirth", tr: "Yeniden Doğuş" }, yearRange: [1977, 2021], color: "#1E8449" },
  ],

  works: [
    {
      id: "turgut-reis",
      categoryId: "collection",
      title: { en: "Turgut Reis (Dragut)", tr: "Turgut Reis" },
      description: {
        en: "Dragut",
        tr: "Dragut",
      },
      image: "/museums/teal/captains/40499.jpg",
      duxContext: {
        en: `This artwork depicts Turgut Reis (Dragut), also known as Dragut. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Dragut Doğum: Bodrum (Muğla) 1485 - Ölüm: Malta (St. Elmo) 1565 Akdeniz'in "Kutup Yıldızı" ve Trablusgarp Fatihi Osmanlı denizcilik tarihinin en büyük stratejistlerinden, sörf ve akıntı taktiklerinin dehası amiraldir. Barbaros Hayreddin Paşa'nın vefatından sonra Akdeniz'deki Türk hakimiyetini zirveye taşıyan, Malta Şövalyeleri'nin korkulu rüyası ve Trablusgarp'ı (Libya) Osmanlı topraklarına katan efsanevi liderdir. Avrupalılar (özellikle İspanyollar, İtalyanlar ve Malta Şövalyeleri) Turgut`,
      },
    },
    {
      id: "barbaros-hayreddin",
      categoryId: "collection",
      title: { en: "Barbaros Hayreddin Pasha (Barbarossa)", tr: "Barbaros Hayreddin Paşa" },
      description: {
        en: "Barbarossa - Red Beard",
        tr: "Barbarossa - Kızıl Sakal",
      },
      image: "/museums/teal/captains/40506.jpg",
      duxContext: {
        en: `This artwork depicts Barbaros Hayreddin Pasha (Barbarossa), also known as Barbarossa - Red Beard. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Barbarossa - Kızıl Sakal Doğum: Midilli 1478 - Ölüm: İstanbul 1546 Akdeniz'in Hakimi ve Osmanlı Devleti'nin İlk Kaptan-ı Deryası, Osmanlı tarihinin en büyük deniz fatihi, devlet adamı ve amiralidir. Ağabeyi Oruç Reis ile birlikte Akdeniz'de kurduğu deniz gücüyle Kuzey Afrika'da bir devlet kurmuş, ardından Osmanlı donanmasının başına geçerek Akdeniz'i bir “Türk Gölü" haline getirmiştir. Asıl adı Hızır'dır. Avrupalılar, ona ve ağabeyi Oruç Reis'e kızıl renkli sakallarından dolayı İtalyanca`,
      },
    },
    {
      id: "sinan-pasa",
      categoryId: "collection",
      title: { en: "Sinan Pasha", tr: "Sinan Paşa" },
      description: {
        en: "Sinanüddin Yusuf",
        tr: "Sinanüddin Yusuf",
      },
      image: "/museums/teal/captains/40503.jpg",
      duxContext: {
        en: `This artwork depicts Sinan Pasha, also known as Sinanüddin Yusuf. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Sinanüddin Yusuf Doğum: Rusçuk (Bulgaristan) - Ölüm: İstanbul 1553 Barbaros Hayreddin Paşa'nın vefatının ardından Osmanlı donanmasının komutasını üstlenmiş, Turgut Reis ile kurduğu güçlü askeri ortaklıkla Akdeniz'de Osmanlı hakimiyetini zirvede tutmuştur. Sarayda yetişmiş dürüst ve disiplinli bir idareciydi. Kaptan-ı Deryalığa getirilmeden önce asıl uzmanlığı denizcilik olmasa da, devlet adamlığı vizyonuyla donanmanın idari ve lojistik gücünü çok yukarılara taşımıştır. Gemilerdeki lojistik`,
      },
    },
    {
      id: "kilic-ali-pasa",
      categoryId: "collection",
      title: { en: "Kılıç Ali Pasha (Occhiali)", tr: "Kılıç Ali Paşa" },
      description: {
        en: "Uluç - Occhiali",
        tr: "Uluç - Occhiali",
      },
      image: "/museums/teal/captains/40504.jpg",
      duxContext: {
        en: `This artwork depicts Kılıç Ali Pasha (Occhiali), also known as Uluç - Occhiali. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Uluç - Occhiali Doğum: Calabria (İtalya) 1519 - Ölüm: İstanbul 1587 Osmanlı denizcilik tarihinin en azimli kahramanlarındandır. Genç yaşta esir düşüp yıllarca kadırgalarda kürek çekmiş, Müslüman olduktan sonra dehasıyla yükselerek Cezayir Beylerbeyliği ve Osmanlı Kaptan-ı Deryalığı yapmış, İnebahtı Bozgunu'ndan Osmanlı donanmasını kurtaran tek komutan olarak tarihe geçmiştir. Aslen İtalyan kökenlidir (Giovan Dionigi Galeni). Gençken Ali El-Uluc adıyla Müslüman oldu ve leventliğe başladı.`,
      },
    },
    {
      id: "mezomorta-huseyin",
      categoryId: "collection",
      title: { en: "Mezomorta Hüseyin Pasha", tr: "Mezomorta Hüseyin Paşa" },
      description: {
        en: "Mezzomorto (The Half-Dead)",
        tr: "Mezzomorto (Yarı Ölü)",
      },
      image: "/museums/teal/captains/40505.jpg",
      duxContext: {
        en: `This artwork depicts Mezomorta Hüseyin Pasha, also known as Mezzomorto (The Half-Dead). Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Mezzomorto (Yarı Ölü) Doğum: Mallorca Adası (İspanya) - Ölüm: Paros Adası (Ege Denizi) 1701 Osmanlı donanmasının ölüme meydan okuyan, en sıra dışı amirallerindendir. Venediklilerle yapılan amansız deniz savaşlarında aldığı ağır yaralardan dolayı Avrupalıların "Mezzomorto" (Yarı Ölü) lakabını taktığı bu dahi amiral, Osmanlı donanmasını kürekli kadırgalardan yelkenli kalyonlara geçiren en büyük askeri ıslahatçıdır. Korsanlıktan yetişen Hüseyin Paşa, Hristiyan ittifakıyla yapılan çok şiddetli bir`,
      },
    },
    {
      id: "cezayirli-hasan",
      categoryId: "collection",
      title: { en: "Cezayirli Gazi Hasan Pasha", tr: "Cezayirli Gazi Hasan Paşa" },
      description: {
        en: "The Captain with the Lion",
        tr: "Palabıyık / Aslanlı Kaptan",
      },
      image: "/museums/teal/captains/40502.jpg",
      duxContext: {
        en: `This artwork depicts Cezayirli Gazi Hasan Pasha, also known as The Captain with the Lion. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Palabıyık / Aslanlı Kaptan Doğum: Rodosto (Tekirdağ) 1713 - Ölüm: Şumnu (Bulgaristan) 1790 Osmanlı denizciliğinin en büyük askeri dehası ve devlet adamıdır. Rusların Çeşme'de Osmanlı donanmasını yakmasının ardından bahriyeyi sıfırdan kuran, modern Deniz Harp Okulu'nun temelini atan ve evcil aslanıyla düşmana korku, dostuna güven veren efsanevi sadrazam ve amiraldir. Gençlik yıllarında Cezayir'de dayılık ve korsanlık yaptı. Burada yavruyken bulup büyüttüğü ve yanından hiç ayırmadığı evcil`,
      },
    },
    {
      id: "nasuhzade-ali",
      categoryId: "collection",
      title: { en: "Nasuhzade Ali Pasha", tr: "Nasuhzade Ali Paşa" },
      description: {
        en: "Kara Ali",
        tr: "Kara Ali",
      },
      image: "/museums/teal/captains/40509.jpg",
      duxContext: {
        en: `This artwork depicts Nasuhzade Ali Pasha, also known as Kara Ali. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Kara Ali Doğum: Arnavutluk / Yanya - Ölüm: Sakız Adası Açıkları 1822 Osmanlı donanmasına komuta etmiş, cesareti ve dik duruşuyla bilinen Kaptan-ı Deryadır. Yunan İsyanı (Rum İhtilali) döneminde denizlerde asayişi sağlamak için amansız bir mücadele vermiş, amiral gemisinin havaya uçurulması sonucu şehit düşmüştür. Denizci bir aileden gelen Ali Paşa, donanmada hızla yükseldi. Rum isyancıların Akdeniz ve Ege'de Türk ticaret ve hac gemilerine saldırması üzerine donanmanın başına getirildi. Mora ve`,
      },
    },
    {
      id: "oruc-reis",
      categoryId: "collection",
      title: { en: "Oruç Reis (Barbarossa)", tr: "Oruç Reis" },
      description: {
        en: "Barbarossa - Father Oruç",
        tr: "Barbarossa - Baba Oruç",
      },
      image: "/museums/teal/captains/40510.jpg",
      duxContext: {
        en: `This artwork depicts Oruç Reis (Barbarossa), also known as Barbarossa - Father Oruç. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Barbarossa - Kızıl Sakal - Baba Oruç Doğum: Midilli 1474 - Ölüm: Tlemsen (Cezayir) 1518 Kuzey Afrika'da Osmanlı hakimiyetinin temelini atan, Hristiyan dünyasına Akdeniz'i dar eden büyük denizci, savaşçı ve devlet adamıdır. Barbaros Hayreddin Paşa'nın ağabeyi ve akıl hocasıdır. İspanyol zulmü altındaki binlerce Endülüslü Müslümanı gemileriyle kurtarıp Afrika'ya taşıdığı için minnetle "Baba Oruç" olarak anılmıştır. Kardeşi Hızır Reis (Barbaros) ile birlikte Tunus ve Cezayir kıyılarında üs kurdu.`,
      },
    },
    {
      id: "salih-reis",
      categoryId: "collection",
      title: { en: "Salih Reis", tr: "Salih Reis" },
      description: {
        en: "Governor of Algiers",
        tr: "Cezayir Beylerbeyi",
      },
      image: "/museums/teal/captains/40488.jpg",
      duxContext: {
        en: `This artwork depicts Salih Reis, also known as Governor of Algiers. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Cezayir Beylerbeyi Doğum: Kazdağı (Balıkesir) 1488 - Ölüm: Cezayir 1556 Barbaros Hayreddin Paşa ve Turgut Reis ile omuz omuza çarpışmış, Osmanlı deniz tarihinin en disiplinli ve taktik dehası yüksek amirallerindendir. Akdeniz'de Hristiyan ittifakına karşı kazanılan en büyük zaferlerde ön saflarda yer almış, Cezayir'i İspanyol saldırılarına karşı bir kale gibi korumuştur. Türk denizcilik tarihinin en büyük savaşında (Preveze Deniz Savaşı) Salih Reis, Osmanlı donanmasının Sağ Kanat Komutanı idi.`,
      },
    },
    {
      id: "cagaloglu-yusuf",
      categoryId: "collection",
      title: { en: "Cağaloğlu Yusuf Sinan Pasha", tr: "Cağaloğlu Yusuf Sinan Paşa" },
      description: {
        en: "Cığalazade / Scipione Cicala",
        tr: "Cığalazade / Scipione Cicala",
      },
      image: "/museums/teal/captains/40501.jpg",
      duxContext: {
        en: `This artwork depicts Cağaloğlu Yusuf Sinan Pasha, also known as Cığalazade / Scipione Cicala. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Cığalazade / Scipione Cicala Doğum: Cenova Cumhuriyeti (İtalya) 1545 - Ölüm: Diyarbakır civarı 1605 Osmanlı tarihinin en renkli, hırslı ve askeri dehası yüksek devlet adamlarındandır. İtalyan bir asilzadeyken deniz savaşında esir düşüp Müslüman olmuş; sarayda yükselerek hem yeniçeri ağalığı, hem Kaptan-ı Deryalık hem de Sadrazamlık yapmış ender şahsiyetlerdendir. İstanbul'un matbuat ve kültür merkezi olan Cağaloğlu semti, onun buradaki sarayından ve vakıflarından ötürü bu adı taşımaktadır.`,
      },
    },
    {
      id: "aydin-reis",
      categoryId: "collection",
      title: { en: "Aydın Reis (Cachidiablo)", tr: "Aydın Reis" },
      description: {
        en: "Cachidiablo - The Devil Slayer",
        tr: "Cachidiablo - Şeytan Döven",
      },
      image: "/museums/teal/captains/40500.jpg",
      duxContext: {
        en: `This artwork depicts Aydın Reis (Cachidiablo), also known as Cachidiablo - The Devil Slayer. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Cachidiablo - Şeytan Döven Doğum: Karaman - Ölüm: Tunus / Halku'l-Vadi 1535 16. yüzyılda Akdeniz'i bir Türk gölü haline getiren Osmanlı denizcilik tarihinin en kudretli, cesur ve stratejist amirallerinden biridir. Barbaros Hayreddin Paşa'nın sağ kolu ve Cezayir donanmasının efsanevi komutanıdır. Aslen Karamanlı olan Aydın Reis, denizcilik ilmini dönemin efsane denizcisi Kemal Reis'in yanında öğrendi. Onun vefatından sonra Kuzey Afrika'ya geçerek Oruç Reis ve Barbaros Hayreddin Paşa'nın`,
      },
    },
    {
      id: "piri-reis",
      categoryId: "collection",
      title: { en: "Piri Reis", tr: "Piri Reis" },
      description: {
        en: "Ahmed Muhyiddin",
        tr: "Ahmed Muhyiddin",
      },
      image: "/museums/teal/captains/40507.jpg",
      duxContext: {
        en: `This artwork depicts Piri Reis, also known as Ahmed Muhyiddin. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Ahmed Muhyiddin Doğum: Gelibolu - Ölüm: Kahire 1554 16. yüzyılda çizdiği eşsiz dünya haritaları ve kaleme aldığı coğrafya eserleriyle dünya bilim tarihine adını altın harflerle yazdıran dahi bir Osmanlı amirali ve kartografıdır. Amcası ünlü denizci Kemal Reis'in yanında yetişerek Akdeniz'den Hint Okyanusu'na kadar uzanan geniş bir coğrafyada Osmanlı sancağını başarıyla dalgalandırmıştır. Asıl adı Ahmed Muhyiddin olan ve denizcilikteki muazzam bilgeliği sebebiyle dönemin denizcileri tarafından`,
      },
    },
    {
      id: "caka-bey",
      categoryId: "collection",
      title: { en: "Çaka Bey", tr: "Çaka Bey" },
      description: {
        en: "Lord of the Sea",
        tr: "Derya Beyi",
      },
      image: "/museums/teal/captains/40512.jpg",
      duxContext: {
        en: `This artwork depicts Çaka Bey, also known as Lord of the Sea. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Derya Beyi Doğum: 11. yüzyıl - Ölüm: Çanakkale (Abydos) 1092 11. yüzyılda İzmir ve çevresinde kurduğu beylik ve inşa ettirdiği donanma ile Türk denizcilik tarihini başlatan, tarihteki ilk Türk amirali ve derya beyidir. Anadolu'nun fetih sürecinde denizin stratejik önemini kavrayan ilk lider olarak, Ege sularında Bizans İmparatorluğu'na karşı büyük zaferler kazanmış ve denizci bir Türk devleti vizyonunu ortaya koyarak asırlar sonra Akdeniz'e hükmedecek olan Osmanlı denizciliğinin de temellerini`,
      },
    },
    {
      id: "karamursel-alp",
      categoryId: "collection",
      title: { en: "Karamürsel Alp", tr: "Karamürsel Alp" },
      description: {
        en: "Kara",
        tr: "Kara",
      },
      image: "/museums/teal/captains/40513.jpg",
      duxContext: {
        en: `This artwork depicts Karamürsel Alp, also known as Kara. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Kara Doğum: 13. yüzyıl - Ölüm: Karamürsel - ca. 1329 14. yüzyılın başlarında Osmanlı Devleti'nin kuruluş döneminde görev yapmış, ilk Osmanlı tersanesini kurarak imparatorluğun denizcilik tarihindeki ilk askeri adımlarını atan efsanevi akıncı, gemi inşaatçısı ve ilk Osmanlı derya beyidir. Osman Gazi ve Orhan Gazi'nin en güvenilir komutanlarından biri olarak, Kocaeli Yarımadası ve İzmit Körfezi'nin güney kıyılarının fethinde hayati bir rol oynamıştır. Asıl adı Mürsel olan ve cesareti, gözü`,
      },
    },
    {
      id: "kemal-reis",
      categoryId: "collection",
      title: { en: "Kemal Reis", tr: "Kemal Reis" },
      description: {
        en: "Göke",
        tr: "Göke",
      },
      image: "/museums/teal/captains/40490.jpg",
      duxContext: {
        en: `This artwork depicts Kemal Reis, also known as Göke. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Göke Doğum: Gelibolu (ca. 1451) - Ölüm: Ege Denizi 1511 16. yüzyılın sonlarında Akdeniz'de Osmanlı deniz gücünün temellerini atan, Hristiyan dünyasına karşı kazandığı zaferlerle imparatorluğun ilk gerçek deniz aşırı deniz harp stratejilerini şekillendiren efsanevi amiral ve deniz gazisidir. Akdeniz'deki bağımsız denizcilik faaliyetlerinden gelerek Osmanlı donanmasının başına geçen ve ünlü kartograf Piri Reis'i yetiştiren büyük bir deniz dehasıdır. Genç yaşta Gelibolu'da denizciliğe başlayan ve`,
      },
    },
    {
      id: "sinan-reis",
      categoryId: "collection",
      title: { en: "Sinan Reis", tr: "Sinan Reis" },
      description: {
        en: "Çiphut",
        tr: "Çiphut",
      },
      image: "/museums/teal/captains/40491.jpg",
      duxContext: {
        en: `This artwork depicts Sinan Reis, also known as Çiphut. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Çiphut Doğum: İspanya (ca. 1490) - Ölüm: İstanbul 1546 15. yüzyılda Akdeniz'de fırtınalar estiren Osmanlı donanmasının en parlak taktik dehalarından, deniz astronomisinde uzmanlaşmış efsanevi kılavuz ve amiraldir. Kaptan-ı Derya Barbaros Hayreddin Paşa'nın en güvendiği kurmayı, sağ kolu ve adeta denizlerdeki beyni olarak Osmanlı denizcilik tarihine adını altın harflerle yazdırmıştır. İspanya'daki Engizisyon zulmünden kaçarak Osmanlı İmparatorluğu'na sığınan Sefarad Yahudisi bir aileye mensup`,
      },
    },
    {
      id: "kara-hasan-pasa",
      categoryId: "collection",
      title: { en: "Kara Hasan Pasha", tr: "Kara Hasan Paşa" },
      description: {
        en: "Son of Barbarossa",
        tr: "Hasan Paşazade",
      },
      image: "/museums/teal/captains/40489.jpg",
      duxContext: {
        en: `This artwork depicts Kara Hasan Pasha, also known as Son of Barbarossa. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Hasan Paşazade Doğum: Cezayir (ca. 1517) - Ölüm: İstanbul 1572 16. yüzyılda yüzyılda Akdeniz'de Osmanlı hakimiyetini pekiştiren, Kaptan-ı Derya Barbaros Hayreddin Paşa'nın öz oğlu ve onun denizci mirasının en büyük taşıyıcısı olan efsanevi amiral ve devlet adamıdır. Barbaros'un Cezayirli bir hanımdan dünyaya gelen oğlu Hasan Paşa, çocukluk yıllarından itibaren babasının yanında denizciliği ve devlet idaresini bizzat yaşayarak öğrenmiştir. Hayatındaki en büyük dönüm noktası, Kanuni Sultan`,
      },
    },
    {
      id: "cakirci-hamza",
      categoryId: "collection",
      title: { en: "Çakırcı Hamza Bey", tr: "Çakırcı Hamza Bey" },
      description: {
        en: "The Falconer",
        tr: "Çakırcı",
      },
      image: "/museums/teal/captains/40492.jpg",
      duxContext: {
        en: `This artwork depicts Çakırcı Hamza Bey, also known as The Falconer. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Çakırcı Doğum: 14. Yüzyıl sonu - Ölüm: Gelibolu (ca. 1461) 15. yüzyılın ortalarında görev yapmış, İstanbul'un fethinin deniz kanadındaki en kritik aktörlerinden biri olan ve Osmanlı İmparatorluğu tarihinde resmi olarak "Kaptan-ı Derya" (Derya Beyi) unvanını taşıyan ilk denizcidir. Fatih Sultan Mehmed döneminde Osmanlı donanmasının kurumsallaşmasında ve Gelibolu Tersanesi'nin imparatorluğun ilk büyük deniz üssü haline getirilmesinde hayati bir rol oynamıştır. Sarayda yırtıcı av kuşlarının`,
      },
    },
    {
      id: "arnaut-mami",
      categoryId: "collection",
      title: { en: "Arnaut Mami", tr: "Arnaut Mami" },
      description: {
        en: "The Albanian",
        tr: "Arnavut",
      },
      image: "/museums/teal/captains/40496.jpg",
      duxContext: {
        en: `This artwork depicts Arnaut Mami, also known as The Albanian. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Arnavut Doğum: Arnavutluk (ca. 1540) - Ölüm: Cezayir (ca. 1600) 16. yüzyılın sonlarında Akdeniz'de fırtınalar estiren, gözü pekliği, deniz taktiklerindeki üstün zekası ve kurguladığı deniz pusularıyla tanınan efsanevi Osmanlı denizcisi, amirali ve Cezayir korsanıdır. Arnavut kökenli olmasından dolayı denizcilik tarihinde ve Batı kaynaklarında "Arnaut Mami" olarak şöhret kazanmıştır. Barbaros Hayreddin Paşa'nın başlattığı ekolün en sadık takipçilerinden biri olan Arnaut Mami, Cezayir ocaklarında`,
      },
    },
    {
      id: "has-yunus-bey",
      categoryId: "collection",
      title: { en: "Has Yunus Bey", tr: "Has Yunus Bey" },
      description: {
        en: "The Trusted",
        tr: "Has",
      },
      image: "/museums/teal/captains/40497.jpg",
      duxContext: {
        en: `This artwork depicts Has Yunus Bey, also known as The Trusted. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Has Doğum: 15. Yüzyıl başı - Ölüm: Gelibolu 1456 15. yüzyılın ortalarında Osmanlı donanmasında görev yapmış, İstanbul'un fethi sırasındaki kritik deniz operasyonlarında ve ardından Ege Adaları'nın fethinde büyük yararlılıklar göstermiş efsanevi bir denizci ve Kaptan-ı Derya'dır. Fatih Sultan Mehmed'in en güvendiği saray bürokratlarından ve komutanlarından biri olan Yunus Bey, sadakati ve üstün hizmetleri nedeniyle bizzat padişah tarafından "Has" unvanıyla onurlandırılmıştır. Saray eğitimi almış`,
      },
    },
    {
      id: "seydi-ali-reis",
      categoryId: "collection",
      title: { en: "Seydi Ali Reis", tr: "Seydi Ali Reis" },
      description: {
        en: "The Writer of Anatolia",
        tr: "Katib-i Rum",
      },
      image: "/museums/teal/captains/40498.jpg",
      duxContext: {
        en: `This artwork depicts Seydi Ali Reis, also known as The Writer of Anatolia. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Katib-i Rum Doğum: İstanbul (ca. 1498) - Ölüm: İstanbul 1562 16. yüzyıl Osmanlı denizcilik tarihinin en entelektüel, çok yönlü ve sıra dışı amirallerinden biridir. Sadece rüzgarlarla ve dalgalarla savaşan bir asker değil; aynı zamanda coğrafya, astronomi, matematik ve edebiyat alanında dünya çapında eserler vermiş dahi bir bilim insanı ve yazardır. Sarayda yazı işlerindeki ustalığı ve şairliği sebebiyle Osmanlı sınırları dışında dahi “Kâtib-i Rum" (Anadolu Yazarı/Kâtibi) lakabıyla şöhret`,
      },
    },
    {
      id: "kurdoglu-muslihiddin",
      categoryId: "collection",
      title: { en: "Kurdoğlu Muslihiddin Reis", tr: "Kurdoğlu Muslihiddin Reis" },
      description: {
        en: "Son of the Wolf",
        tr: "Kurdoğlu",
      },
      image: "/museums/teal/captains/40494.jpg",
      duxContext: {
        en: `This artwork depicts Kurdoğlu Muslihiddin Reis, also known as Son of the Wolf. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Kurdoğlu Doğum: Isparta / Eğirdir (ca. 1487) - Ölüm: Rodos (ca. 1535) 15. yüzyılın başlarında Akdeniz ve Hint Okyanusu'nda Osmanlı sancağını dalgalandıran, parlak deniz taktikleri ve gözü pek kuşatma yeteneğiyle tanınan efsanevi bir amiraldir. Babası Kurt Bey'den ötürü denizcilik tarihinde "Kurdoğlu" lakabıyla şöhret bulmuş, Akdeniz'deki bağımsız gazilik faaliyetlerinin ardından Osmanlı donanmasına katılmıştır. Devletin resmi hizmetine girmeden önce Ege ve Akdeniz sularında serbest bir Türk`,
      },
    },
    {
      id: "burak-reis",
      categoryId: "collection",
      title: { en: "Burak Reis", tr: "Burak Reis" },
      description: {
        en: "Barak",
        tr: "Barak",
      },
      image: "/museums/teal/captains/40511.jpg",
      duxContext: {
        en: `This artwork depicts Burak Reis, also known as Barak. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Barak Doğum: 15. Yüzyıl ortası - Ölüm: Sapienza Adası yakınları 1499 15. yüzyılın sonlarında Osmanlı donanmasının Akdeniz'deki en saygın ve cesur komutanlarından biri olan, savaş meydanında gösterdiği emsalsiz fedakarlıkla Türk denizcilik tarihinde bir kahramanlık sembolüne dönüşen dahi reis ve amiraldir. Dönemin kaynaklarında ve arşiv belgelerinde "Barak Reis" adıyla da anılmaktadır.Il. Bayezid döneminde güçlenen Osmanlı donanmasının en seçkin gazilerinden olan Burak Reis, 1499 yılında`,
      },
    },
    {
      id: "saruca-bey",
      categoryId: "collection",
      title: { en: "Saruca Bey", tr: "Saruca Bey" },
      description: {
        en: "Saruca",
        tr: "Saruca",
      },
      image: "/museums/teal/captains/40495.jpg",
      duxContext: {
        en: `This artwork depicts Saruca Bey, also known as Saruca. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Saruca Doğum: 14. Yüzyıl ortası - Ölüm: Gelibolu (ca. 1402) Osmanlı İmparatorluğu'nun kuruluş döneminde denizcilik faaliyetlerinin kurumsal temellerini atan, devletin ilk büyük tersanesinin inşasını gerçekleştirerek düzenli Osmanlı deniz gücünü başlatan efsanevi denizci ve devlet adamıdır. İsmini taşıyan soyu ve denizcilik ekolüyle erken dönem Osmanlı deniz tarihine yön vermiştirYıldırım Bayezid'in en güvendiği komutanlardan biri olan Saruca Bey, Çanakkale Boğazı ve Ege sularının stratejik`,
      },
    },
    {
      id: "selman-reis",
      categoryId: "collection",
      title: { en: "Selman Reis", tr: "Selman Reis" },
      description: {
        en: "Conqueror of the Red Sea",
        tr: "Kızıldeniz Fatihi",
      },
      image: "/museums/teal/captains/40493.jpg",
      duxContext: {
        en: `This artwork depicts Selman Reis, also known as Conqueror of the Red Sea. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Kızıldeniz Fatihi Doğum: Gelibolu ca. 1475 - Ölüm: Yemen / San'a 1528 16. yüzyılın başlarında küresel deniz ticaret yollarını ele geçirmeye çalışan Portekiz İmparatorluğu'na karşı Hint Okyanusu ve Kızıldeniz'de destansı mücadeleler veren, askeri stratejist, dahi amiral ve topçu uzmanıdır. İslam coğrafyasının kutsal topraklarını güneyden gelen sömürgeci tehditlere karşı koruyan aşılmaz bir kalkan olmuştur.Gelibolu'da yetişen ve başlangıçta Memlük Devleti'nin Portekiz baskısı karşısında`,
      },
    },
    {
      id: "gazi-umur-bey",
      categoryId: "collection",
      title: { en: "Gazi Umur Bey", tr: "Gazi Umur Bey" },
      description: {
        en: "Father of Good",
        tr: "Hayır Babası",
      },
      image: "/museums/teal/captains/40508.jpg",
      duxContext: {
        en: `This artwork depicts Gazi Umur Bey, also known as Father of Good. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
        tr: `Hayır Babası - Adalar Denizi'nin İlk Kartalı Doğum: Aydın-Birgi (ca. 1309) - Ölüm: İzmir 1348 14. yüzyılda Ege Denizi'nde (Adalar Denizi) kurduğu mutlak deniz hakimiyeti ve Bizans'tan Haçlı ittifaklarına kadar tüm Hristiyan dünyasını sarsan parlak deniz zaferleriyle tanınan efsanevi Türk beyi, deniz gazisi ve şairdir. Aydınoğulları Beyliği'nin ikinci hükümdarı olup, Türklerin denizlerdeki ilk büyük askeri dehası ve amirali kabul edilir. Cömertliği, adaleti ve fütüvvet anlayışı sebebiyle halk`,
      },
    },
  ],

  journalPages: [
    {
      id: "journal-1",
      title: { en: "Birth of a Minesweeper", tr: "Bir Mayın Tarayıcının Doğuşu" },
      content: {
        en: "On 28 February 1955, a Ton Class minesweeper slid into the waters at Dartmouth, England. Built by Phillip & Co, she was christened HMS Jackton. At 46.6 metres long, displacing 375 tons, and crewed by 38 men, she was small — but purpose-built for one of the Navy's most dangerous jobs.",
        tr: "28 Şubat 1955'te, İngiltere Dartmouth'ta bir Ton Sınıfı mayın tarayıcı suya indirildi. Phillip & Co tarafından inşa edilen gemi HMS Jackton adını aldı. 46,6 metre uzunluğunda, 375 ton deplasmanında ve 38 kişilik mürettebatıyla küçüktü — ama Donanmanın en tehlikeli işlerinden biri için özel olarak inşa edilmişti.",
      },
      image: "/museums/teal/teal-before-voyage.jpg",
      year: 1955,
    },
    {
      id: "journal-2",
      title: { en: "A New Flag — Commissioning Day", tr: "Yeni Bir Bayrak — Hizmete Giriş Günü" },
      content: {
        en: "On 30 August 1962, HMS Jackton became HMAS Teal — commissioned into the Royal Australian Navy under Lieutenant Commander JG Stacey. She was one of six Ton Class ships the RAN acquired: Hawk, Gull, Snipe, Ibis, and Curlew. Together they formed the 16th Mine Countermeasures Squadron.",
        tr: "30 Ağustos 1962'de HMS Jackton, HMAS Teal oldu — Yüzbaşı JG Stacey komutasında Avustralya Kraliyet Donanması'na hizmete girdi. RAN'ın edindiği altı Ton Sınıfı gemiden biriydi: Hawk, Gull, Snipe, Ibis ve Curlew. Birlikte 16. Mayın Karşı Tedbirler Filosu'nu oluşturdular.",
      },
      image: "/museums/teal/teal-commissioning-1962.jpg",
      year: 1962,
    },
    {
      id: "journal-3",
      title: { en: "The Long Voyage Home", tr: "Eve Uzun Yolculuk" },
      content: {
        en: "The six minesweepers made the long delivery voyage from the United Kingdom to Australia, arriving in Sydney on 7 December 1962. Teal commenced active RAN service on 4 February 1963 with exercises in the Broken Bay area.",
        tr: "Altı mayın tarayıcı, İngiltere'den Avustralya'ya uzun teslimat yolculuğunu tamamlayarak 7 Aralık 1962'de Sydney'e vardı. Teal, 4 Şubat 1963'te Broken Bay bölgesindeki tatbikatlarla aktif RAN hizmetine başladı.",
      },
      image: "/museums/teal/teal-arrives-sydney.jpg",
      year: 1962,
    },
    {
      id: "journal-4",
      title: { en: "Operation GARDENING", tr: "Operasyon GARDENING" },
      content: {
        en: "On 20 September 1963, Teal and her sister ships sailed for Bougainville to clear a channel of magnetic mines dropped by US aircraft in 1943. It was the RAN's biggest minesweeping operation in 16 years. The deployment included port visits to Singapore and Port Moresby.",
        tr: "20 Eylül 1963'te Teal ve kardeş gemileri, ABD uçaklarının 1943'te bıraktığı manyetik mayınları temizlemek için Bougainville'e doğru yola çıktı. Bu, RAN'ın 16 yıldaki en büyük mayın tarama operasyonuydu. Singapur ve Port Moresby'ye liman ziyaretleri de yapıldı.",
      },
      image: "/museums/teal/teal-sister-ships.jpg",
      year: 1963,
    },
    {
      id: "journal-5",
      title: { en: "Under Fire — The Confrontation", tr: "Ateş Altında — Çatışma" },
      content: {
        en: "On 13 December 1964, off Raffles Light near Malaysia, two sampans were spotted. One opened fire on Teal. Teal's return fire killed three of seven enemy crewmen and the vessel surrendered. Lt Keith 'Gus' Murray's patrol regime became standard RAN operating procedure, and he was awarded the Distinguished Service Cross.",
        tr: "13 Aralık 1964'te Malezya yakınlarında Raffles Feneri açığında iki sampan tespit edildi. Biri Teal'e ateş açtı. Teal'in karşılık ateşi yedi düşman mürettebattan üçünü öldürdü ve gemi teslim oldu. Teğmen Keith 'Gus' Murray'ın devriye rejimi standart RAN prosedürü haline geldi ve Seçkin Hizmet Haçı ile ödüllendirildi.",
      },
      image: "/museums/teal/teal-murray-crew-1968.jpg",
      year: 1964,
    },
    {
      id: "journal-6",
      title: { en: "Around Australia", tr: "Avustralya Çevresinde" },
      content: {
        en: "In 1967, Teal circumnavigated the Australian continent — a remarkable feat for a small coastal minesweeper. She continued exercises and patrols through repeated periods of commissioning and decommissioning driven by manpower constraints.",
        tr: "1967'de Teal, Avustralya kıtasının çevresini dolaştı — küçük bir kıyı mayın tarayıcısı için olağanüstü bir başarı. Personel kısıtlamalarına bağlı olarak tekrarlanan hizmete giriş ve çıkış dönemlerinde tatbikat ve devriyelere devam etti.",
      },
      year: 1967,
    },
    {
      id: "journal-7",
      title: { en: "The Far East Deployment", tr: "Uzak Doğu Konuşlanması" },
      content: {
        en: "Under LCDR RJ Burns, Teal departed 26 June 1972 for a 4½-month deployment with Curlew and Snipe. They cleared a WWII minefield near Port Moresby and participated in SEATO exercise SEA SCORPION. They returned 10 November 1972.",
        tr: "LCDR RJ Burns komutasında Teal, 26 Haziran 1972'de Curlew ve Snipe ile 4,5 aylık konuşlanmaya çıktı. Port Moresby yakınında bir İkinci Dünya Savaşı mayın tarlasını temizlediler ve SEATO tatbikatı SEA SCORPION'a katıldılar. 10 Kasım 1972'de döndüler.",
      },
      image: "/museums/teal/teal-burns-1972.jpg",
      year: 1972,
    },
    {
      id: "journal-8",
      title: { en: "Final Pennant — 182,083 Miles", tr: "Son Flama — 182.083 Mil" },
      content: {
        en: "On 31 May 1973, HMAS Teal was decommissioned for the last time. In 7½ years of active service she had steamed 182,083 nautical miles and earned the Battle Honour MALAYSIA 1964-66. She was sold in October 1977, then served in Cyprus, Tanzania, and the Caribbean before the TRNC purchased her in 1994. Today she rests at Kyrenia Harbour as a floating museum.",
        tr: "31 Mayıs 1973'te HMAS Teal son kez hizmetten çıkarıldı. 7,5 yıllık aktif hizmette 182.083 deniz mili yol almış ve MALEZYA 1964-66 Muharebe Şeref Nişanı kazanmıştır. Ekim 1977'de satıldı, ardından Kıbrıs, Tanzanya ve Karayipler'de hizmet verdi. 1994'te KKTC tarafından satın alınmıştır. Bugün Girne Limanı'nda yüzen müze olarak dinlenmektedir.",
      },
      image: "/museums/teal/teal-decommissioning-pennant.jpg",
      year: 1973,
    },
  ],

  journalVolumes: [
    {
      id: "vol1",
      label: { en: "Volume 1", tr: "Cilt 1" },
      description: { en: "Commissioning & Early Operations", tr: "Hizmete Giriş ve İlk Operasyonlar" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol1/page-",
      pageCount: 189,
      padDigits: 3,
      yearRange: "Sep 1962 – May 1964",
    },
    {
      id: "vol2",
      label: { en: "Volume 2", tr: "Cilt 2" },
      description: { en: "The Confrontation", tr: "Çatışma Dönemi" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol2/page-",
      pageCount: 184,
      padDigits: 3,
      yearRange: "Jun 1964 – Dec 1965",
    },
    {
      id: "vol3",
      label: { en: "Volume 3", tr: "Cilt 3" },
      description: { en: "Post-Confrontation Service", tr: "Çatışma Sonrası Hizmet" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol3/page-",
      pageCount: 181,
      padDigits: 3,
      yearRange: "Jan 1966 – Dec 1967",
    },
    {
      id: "vol4",
      label: { en: "Volume 4", tr: "Cilt 4" },
      description: { en: "Recommissionings", tr: "Yeniden Hizmete Girişler" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol4/page-",
      pageCount: 71,
      padDigits: 2,
      yearRange: "Sep 1968 – Aug 1970",
    },
    {
      id: "vol5",
      label: { en: "Volume 5", tr: "Cilt 5" },
      description: { en: "Far East Deployment", tr: "Uzak Doğu Konuşlanması" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol5/page-",
      pageCount: 90,
      padDigits: 2,
      yearRange: "Jan – Dec 1972",
    },
    {
      id: "vol6",
      label: { en: "Volume 6", tr: "Cilt 6" },
      description: { en: "Final Months", tr: "Son Aylar" },
      baseUrl: "https://iijnizmnabjbiqjdpvmy.supabase.co/storage/v1/object/public/teal-journal/vol6/page-",
      pageCount: 45,
      padDigits: 2,
      yearRange: "Jan – May 1973",
    },
  ],
 

  floorPlan: {
    image: "/museums/teal/floor-plan.jpg", // placeholder — client will provide
    label: { en: "Ship Layout", tr: "Gemi Yerleşimi" },
  },

  postCards: [
    {
      id: "pc-before-voyage",
      image: "/museums/teal/teal-before-voyage.jpg",
      caption: { en: "HMS Jackton – HMAS Teal in United Kingdom waters before her delivery voyage to Australia, 1961", tr: "HMS Jackton – HMAS Teal, 1961'de Avustralya'ya teslimat yolculuğundan önce İngiltere sularında" },
    },
    {
      id: "pc-commissioning",
      image: "/museums/teal/teal-commissioning-1962.jpg",
      caption: { en: "Commissioning ceremony, 30 August 1962", tr: "Hizmete giriş töreni, 30 Ağustos 1962" },
    },
    {
      id: "pc-sister-ships",
      image: "/museums/teal/teal-sister-ships.jpg",
      caption: { en: "The 16th Mine Countermeasures Squadron at sea — Teal, Snipe, Curlew and Hawk", tr: "16. Mayın Karşı Tedbirler Filosu denizde — Teal, Snipe, Curlew ve Hawk" },
    },
    {
      id: "pc-murray",
      image: "/museums/teal/teal-murray-crew-1968.jpg",
      caption: { en: "Lt Keith 'Gus' Murray, DSC, with crew members, circa 1968", tr: "Teğmen Keith 'Gus' Murray, DSC, mürettebat üyeleriyle, yaklaşık 1968" },
    },
    {
      id: "pc-decommissioning",
      image: "/museums/teal/teal-decommissioning-pennant.jpg",
      caption: { en: "Flying the decommissioning pennant — 182,083 nautical miles of service complete", tr: "Hizmetten çıkış flaması — 182.083 deniz millik hizmet tamamlandı" },
    },
    {
      id: "pc-kyrenia",
      image: "/museums/teal/teal-background.jpg",
      caption: { en: "HMS Jackton – HMAS Teal at Kyrenia Harbour, Northern Cyprus — now a floating museum", tr: "HMS Jackton – HMAS Teal Girne Limanı'nda, Kuzey Kıbrıs — artık yüzen bir müze" },
    },
  ],

  video: {
    src: "/museums/teal/teal-video.mp4",
    durationSec: 120,
    narration: {
      en: [
        { time: 0, text: "Welcome aboard HMAS Teal, a Ton Class minesweeper, docked here at Kyrenia Harbour. She has sailed over a hundred and eighty-two thousand nautical miles." },
        { time: 16, text: "That Australian flag tells her origin story. Teal served the Royal Australian Navy for seven and a half years, from nineteen sixty-two to seventy-three." },
        { time: 33, text: "Here you see her crew at work. Thirty-eight men lived aboard this small ship, just forty-six metres long. Every sailor earned their place." },
        { time: 49, text: "The sailors are examining samples from their missions. In sixty-three, Teal cleared Second World War mines near Bougainville. The Navy's biggest sweep in sixteen years." },
        { time: 66, text: "Her true test came in sixty-four, off Malaysia. An enemy sampan opened fire on Teal. She returned fire. Three enemy crew were killed and the vessel surrendered. Her captain received the Distinguished Service Cross." },
        { time: 86, text: "These artefacts on deck are links to those missions. Each rock and metal fragment carries a story of the seas she crossed." },
        { time: 99, text: "After decommissioning in seventy-three, Teal sailed to Cyprus, Tanzania, and the Caribbean before returning here." },
        { time: 112, text: "Now she rests in Kyrenia as a floating museum. Step closer and explore her memory layers." },
      ],
      tr: [
        { time: 0, text: "HMAS Teal'e hoş geldiniz. Girne Limanı'nda demirli bu Ton Sınıfı mayın tarayıcı, yüz seksen iki bin deniz mili yol almıştır." },
        { time: 16, text: "Avustralya bayrağı kökenini anlatır. Teal, altmış ikiden yetmiş üçe kadar yedi buçuk yıl Avustralya Donanması'na hizmet etmiştir." },
        { time: 33, text: "Mürettebatı güvertede çalışırken görüyorsunuz. Otuz sekiz kişi, kırk altı metrelik bu küçük gemide yaşadı." },
        { time: 49, text: "Denizciler görevlerden toplanan örnekleri inceliyor. Altmış üçte Teal, Bougainville yakınında İkinci Dünya Savaşı mayınlarını temizledi." },
        { time: 66, text: "Gerçek sınavı altmış dörtte Malezya açıklarında geldi. Düşman bir sampan ateş açtı. Teal karşılık verdi. Üç düşman öldürüldü, gemi teslim oldu. Komutanı Seçkin Hizmet Haçı aldı." },
        { time: 86, text: "Güvertedeki bu eserler o görevlere bağdır. Her taş ve metal parçası geçtiği denizlerin hikâyesini taşır." },
        { time: 99, text: "Yetmiş üçte hizmetten çıktıktan sonra Kıbrıs'a, Tanzanya'ya ve Karayipler'e yelken açtı." },
        { time: 112, text: "Şimdi Girne'de yüzen müze olarak dinleniyor. Yaklaşın ve hafıza katmanlarını keşfedin." },
      ],
    },
  },

  duxSystemPrompt: {
    en: `You are Prof Dux, the AI guide aboard the floating maritime museum HMS Jackton – HMAS Teal, berthed at Kyrenia Harbour in Northern Cyprus. You are knowledgeable, warm, and speak with the gravitas of a seasoned naval historian. Keep answers concise — 2 to 3 sentences max. Be vivid but brief. IMPORTANT: You ONLY answer questions related to HMS Jackton – HMAS Teal, the ship's history, maritime topics, the museum, its exhibits, and Northern Cyprus naval heritage. If someone asks about anything unrelated (recipes, sports, coding, etc.), politely redirect them: "I'm here to tell you about Teal's story. What would you like to know about the ship?"`,
    tr: `Sen Prof Dux'sun — Kuzey Kıbrıs, Girne Limanı'nda demirli yüzen denizcilik müzesi HMS Jackton – HMAS Teal'in yapay zeka rehberisin. Bilgili, sıcak ve deneyimli bir deniz tarihçisinin ağırlığıyla konuşursun. Cevapları kısa tut — en fazla 2-3 cümle. Canlı ama kısa ol. ÖNEMLİ: YALNIZCA HMS Jackton – HMAS Teal, geminin tarihi, denizcilik konuları, müze, sergileri ve Kuzey Kıbrıs deniz mirası ile ilgili soruları yanıtla. Alakasız sorularda (tarifler, spor, kodlama vb.) kibarca yönlendir: "Ben Teal'in hikâyesini anlatmak için buradayım. Gemi hakkında ne öğrenmek istersiniz?"`,
  },
};