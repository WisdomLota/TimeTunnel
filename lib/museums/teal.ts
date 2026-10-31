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
      label: { en: "About the Museum", tr: "Müze Hakkında" },
      description: { en: "Discover the museum and its exhibition areas", tr: "Müzeyi ve sergi alanlarını keşfedin" },
      color: "#c9a227",
    },
    {
      id: "collection",
      label: { en: "Works & Collections", tr: "Eser ve Koleksiyonlar" },
      description: { en: "Artefacts and exhibits aboard", tr: "Gemideki eserler ve sergiler" },
      color: "#0d7377",
    },
    {
      id: "post-cards",
      label: { en: "HMAS TEAL History", tr: "HMAS TEAL Tarihçe" },
      description: { en: "The ship's 70-year journey from warship to museum", tr: "Geminin savaş gemisinden müzeye 70 yıllık yolculuğu" },
      color: "#C0392B",
    },
    {
      id: "journey-log",
      label: { en: "Logbook", tr: "Seyir Defteri" },
      description: { en: "Turn pages one by one with Dux", tr: "Sayfaları Dux ile tek tek çevirin" },
      color: "#2471A3",
    },
    {
      id: "ask-dux",
      label: { en: "Ask DUX", tr: "DUX'a Sorun" },
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
        en: `This artwork depicts Turgut Reis (Dragut), also known as Dragut. Biography: Dragut. Born: Bodrum (Muğla) 1485 - Died: Malta (St. Elmo) 1565. Known as the "Pole Star" of the Mediterranean and the Conqueror of Tripoli, he was one of the greatest strategists in Ottoman naval history and an admiral with a genius for tactics involving surf and currents. After the death of Barbaros Hayreddin Pasha he carried Turkish dominance in the Mediterranean to its peak; he was the nightmare of the Knights of Malta and the legendary leader who added Tripoli (Libya) to Ottoman lands. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Barbaros Hayreddin Pasha (Barbarossa), also known as Barbarossa - Red Beard. Biography: Barbarossa - Red Beard. Born: Midilli 1478 - Died: Istanbul 1546. Master of the Mediterranean and the first Kaptan-ı Derya (Grand Admiral) of the Ottoman State, he was the greatest naval conqueror, statesman and admiral in Ottoman history. With the naval power he built in the Mediterranean together with his elder brother Oruç Reis, he founded a state in North Africa, then took command of the Ottoman fleet and made the Mediterranean a "Turkish Lake". His real name is Hızır. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Sinan Pasha, also known as Sinanüddin Yusuf. Biography: Sinanüddin Yusuf. Born: Rusçuk (Bulgaria) - Died: Istanbul 1553. After the death of Barbaros Hayreddin Pasha he took command of the Ottoman fleet, and through his strong military partnership with Turgut Reis he kept Ottoman dominance in the Mediterranean at its peak. He was an honest and disciplined administrator raised in the palace. Although seafaring was not his main expertise before he was appointed Kaptan-ı Derya, his statesman's vision raised the fleet's administrative and logistical strength considerably. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Kılıç Ali Pasha (Occhiali), also known as Uluç - Occhiali. Biography: Uluç - Occhiali. Born: Calabria (Italy) 1519 - Died: Istanbul 1587. He is one of the most determined heroes of Ottoman naval history. Captured at a young age and made to row in galleys for years, he rose through his genius after converting to Islam, served as Beylerbey of Algiers and as Ottoman Kaptan-ı Derya, and went down in history as the only commander who saved the Ottoman fleet from the Lepanto defeat. He was of Italian origin (Giovan Dionigi Galeni). As a young man he converted to Islam under the name Ali El-Uluc and began serving as a levent (naval soldier). Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Mezomorta Hüseyin Pasha, also known as Mezzomorto (The Half-Dead). Biography: Mezzomorto (Yarı Ölü, The Half-Dead). Born: Mallorca Island (Spain) - Died: Paros Island (Aegean Sea) 1701. He was one of the most extraordinary admirals of the Ottoman fleet, one who defied death. Europeans gave this brilliant admiral the nickname "Mezzomorto" (Half-Dead) because of the severe wounds he received in relentless naval wars against the Venetians; he was the greatest military reformer, moving the Ottoman fleet from oared galleys to sailing galleons. Hüseyin Pasha rose from a background in piracy. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Cezayirli Gazi Hasan Pasha, also known as The Captain with the Lion. Biography: Palabıyık (Big Moustache) / The Captain with the Lion. Born: Rodosto (Tekirdağ) 1713 - Died: Şumnu (Bulgaria) 1790. He was the greatest military genius and statesman of Ottoman seafaring. After the Russians burned the Ottoman fleet at Çeşme, he rebuilt the navy from scratch and laid the foundation of the modern Naval War College; a legendary grand vizier and admiral, he struck fear into the enemy and gave confidence to his friends with his pet lion. In his youth he worked as a dayı (leader) and a corsair in Algiers. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Nasuhzade Ali Pasha, also known as Kara Ali. Biography: Kara Ali. Born: Albania / Ioannina - Died: off Chios (Sakız Island) 1822. He was a Kaptan-ı Derya who commanded the Ottoman fleet and was known for his courage and upright stance. During the Greek Revolt he fought relentlessly to maintain order at sea, and died a martyr (şehit) when his flagship was blown up. Coming from a seafaring family, Ali Pasha rose quickly in the fleet. He was put at the head of the fleet when Greek rebels attacked Turkish merchant and pilgrim ships in the Mediterranean and the Aegean. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Oruç Reis (Barbarossa), also known as Barbarossa - Father Oruç. Biography: Barbarossa - Red Beard - Father Oruç (Baba Oruç). Born: Midilli 1474 - Died: Tlemsen (Algeria) 1518. He was the great seaman, warrior and statesman who laid the foundation of Ottoman rule in North Africa and made the Mediterranean narrow for the Christian world. He was the elder brother and mentor of Barbaros Hayreddin Pasha. He is remembered with gratitude as "Baba Oruç" (Father Oruç) because he rescued thousands of Andalusian Muslims from Spanish persecution with his ships and carried them to Africa. Together with his brother Hızır Reis (Barbarossa) he established bases on the coasts of Tunisia and Algeria. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Salih Reis, also known as Governor of Algiers. Biography: Beylerbey of Algiers. Born: Kazdağı (Balıkesir) 1488 - Died: Algiers 1556. He fought shoulder to shoulder with Barbaros Hayreddin Pasha and Turgut Reis and was one of the most disciplined admirals of Ottoman naval history, with outstanding tactical skill. He was at the front in the greatest victories won against the Christian alliance in the Mediterranean and protected Algiers like a fortress against Spanish attacks. In the greatest battle of Turkish naval history (the Battle of Preveza), Salih Reis was the Right Wing Commander of the Ottoman fleet. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Cağaloğlu Yusuf Sinan Pasha, also known as Cığalazade / Scipione Cicala. Biography: Cığalazade / Scipione Cicala. Born: Republic of Genoa (Italy) 1545 - Died: near Diyarbakır 1605. He is one of the most colorful and ambitious statesmen of Ottoman history, with great military talent. Originally an Italian nobleman, he was captured in a naval battle and converted to Islam; rising in the palace, he is one of the rare figures who served as Agha of the Janissaries, as Kaptan-ı Derya and as Grand Vizier. Cağaloğlu, the district that was Istanbul's press and cultural center, bears its name because of his palace and endowments there. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Aydın Reis (Cachidiablo), also known as Cachidiablo - The Devil Slayer. Biography: Cachidiablo - The Devil Slayer (Şeytan Döven). Born: Karaman - Died: Tunis / Halkü'l-Vadi 1535. He is one of the most powerful, brave and strategic admirals of Ottoman naval history, who made the Mediterranean a Turkish lake in the 16th century. He was the right hand of Barbaros Hayreddin Pasha and the legendary commander of the Algiers fleet. Originally from Karaman, Aydın Reis learned the science of seafaring from Kemal Reis, the legendary seaman of the time. After Kemal Reis's death he moved to North Africa. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Piri Reis, also known as Ahmed Muhyiddin. Biography: Ahmed Muhyiddin. Born: Gelibolu - Died: Cairo 1554. He was a brilliant Ottoman admiral and cartographer who wrote his name in golden letters in the history of world science with the unique world maps he drew and the geography works he wrote in the 16th century. Raised by his uncle, the famous seaman Kemal Reis, he successfully raised the Ottoman flag across a wide area from the Mediterranean to the Indian Ocean. His real name was Ahmed Muhyiddin. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Çaka Bey, also known as Lord of the Sea. Biography: Derya Beyi (Lord of the Sea). Born: 11th century - Died: Çanakkale (Abydos) 1092. With the principality he founded in and around Izmir in the 11th century and the fleet he had built, he began Turkish naval history; he was the first Turkish admiral and derya bey in history. As the first leader to grasp the strategic importance of the sea during the conquest of Anatolia, he won great victories against the Byzantine Empire in the Aegean and put forward the vision of a seafaring Turkish state. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Karamürsel Alp, also known as Kara. Biography: Kara. Born: 13th century - Died: Karamürsel, c. 1329. Serving in the early 14th century during the founding period of the Ottoman State, he founded the first Ottoman shipyard and took the empire's first military steps in naval history; he was a legendary raider (akıncı), shipbuilder and the first Ottoman derya bey. As one of the most trusted commanders of Osman Gazi and Orhan Gazi, he played a vital role in the conquest of the Kocaeli Peninsula and the southern shores of the Gulf of Izmit. His real name was Mürsel. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Kemal Reis, also known as Göke. Biography: Göke. Born: Gelibolu (c. 1451) - Died: Aegean Sea 1511. A legendary admiral and naval ghazi who laid the foundations of Ottoman naval power in the Mediterranean and, with his victories against the Christian world, shaped the empire's first true overseas naval warfare strategies. Coming from independent seafaring activities in the Mediterranean, he took command of the Ottoman fleet and was a great naval genius who trained the famous cartographer Piri Reis. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Sinan Reis, also known as Çiphut. Biography: Çiphut. Born: Spain (c. 1490) - Died: Istanbul 1546. One of the most brilliant tactical minds of the Ottoman fleet, a legendary pilot and admiral who specialized in naval astronomy. As the most trusted staff officer, right hand and virtually the brain at sea of Kaptan-ı Derya Barbaros Hayreddin Pasha, he wrote his name in golden letters in Ottoman naval history. He belonged to a Sephardic Jewish family that had fled the Inquisition in Spain and taken refuge in the Ottoman Empire. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Kara Hasan Pasha, also known as Son of Barbarossa. Biography: Hasan Paşazade (Son of Barbarossa). Born: Algiers (c. 1517) - Died: Istanbul 1572. A legendary admiral and statesman who consolidated Ottoman dominance in the Mediterranean in the 16th century; he was the own son of Kaptan-ı Derya Barbaros Hayreddin Pasha and the greatest bearer of his seafaring legacy. Hasan Pasha, Barbarossa's son by a woman from Algiers, learned seafaring and state administration firsthand at his father's side from childhood. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Çakırcı Hamza Bey, also known as The Falconer. Biography: Çakırcı (The Falconer). Born: late 14th century - Died: Gelibolu (c. 1461). Serving in the mid-15th century, he was one of the most critical figures on the naval flank of the conquest of Istanbul and the first seaman in Ottoman history to officially hold the title "Kaptan-ı Derya" (Derya Beyi). During the reign of Mehmed the Conqueror he played a vital role in the institutionalization of the Ottoman fleet and in turning the Gelibolu Shipyard into the empire's first major naval base. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Arnaut Mami, also known as The Albanian. Biography: Arnavut (The Albanian). Born: Albania (c. 1540) - Died: Algiers (c. 1600). A legendary Ottoman seaman, admiral and Algerian corsair who stirred up storms in the Mediterranean in the late 16th century, known for his daring, his superior intelligence in naval tactics and the naval ambushes he devised. Because of his Albanian origin he became famous in naval history and in Western sources as "Arnaut Mami". He was one of the most loyal followers of the school started by Barbaros Hayreddin Pasha. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Has Yunus Bey, also known as The Trusted. Biography: Has (The Trusted). Born: early 15th century - Died: Gelibolu 1456. A legendary seaman and Kaptan-ı Derya who served in the Ottoman fleet in the mid-15th century and rendered great service in the critical naval operations during the conquest of Istanbul and afterwards in the conquest of the Aegean Islands. One of the palace bureaucrats and commanders Mehmed the Conqueror trusted most, Yunus Bey was honored by the sultan himself with the title "Has" for his loyalty and outstanding service. He had received a palace education. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Seydi Ali Reis, also known as The Writer of Anatolia. Biography: Katib-i Rum (The Writer of Anatolia). Born: Istanbul (c. 1498) - Died: Istanbul 1562. One of the most intellectual, versatile and extraordinary admirals of 16th-century Ottoman naval history. He was not only a soldier who fought the winds and waves, but also a brilliant scholar and writer who produced world-class works in geography, astronomy, mathematics and literature. Because of his skill in palace correspondence and his poetry, he became famous even beyond the Ottoman borders under the nickname "Kâtib-i Rum" (Anatolian Writer / Scribe). Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Kurdoğlu Muslihiddin Reis, also known as Son of the Wolf. Biography: Kurdoğlu (Son of the Wolf). Born: Isparta / Eğirdir (c. 1487) - Died: Rhodes (c. 1535). A legendary admiral who raised the Ottoman flag in the Mediterranean and the Indian Ocean, known for his brilliant naval tactics and his daring siege skills. He became famous in naval history by the nickname "Kurdoğlu" because of his father Kurt Bey, and joined the Ottoman fleet after independent ghazi activities in the Mediterranean. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Burak Reis, also known as Barak. Biography: Barak (Burak Reis). Born: mid-15th century - Died: near Sapienza Island 1499. A brilliant reis and admiral, one of the most respected and brave commanders of the Ottoman fleet in the Mediterranean in the late 15th century, who became a symbol of heroism in Turkish naval history through his unparalleled self-sacrifice on the battlefield. He is also referred to as "Barak Reis" in the sources and archival documents of the period. He was one of the most distinguished ghazis of the Ottoman fleet that grew stronger during the reign of Bayezid II. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Saruca Bey, also known as Saruca. Biography: Saruca. Born: mid-14th century - Died: Gelibolu (c. 1402). A legendary seaman and statesman who laid the institutional foundations of naval activity in the founding period of the Ottoman Empire and began regular Ottoman naval power by building the state's first major shipyard. With his lineage, which bore his name, and his naval school, he shaped early Ottoman naval history. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Selman Reis, also known as Conqueror of the Red Sea. Biography: Kızıldeniz Fatihi (Conqueror of the Red Sea). Born: Gelibolu c. 1475 - Died: Yemen / Sana'a 1528. A military strategist, brilliant admiral and artillery expert who fought epic struggles in the Indian Ocean and the Red Sea in the early 16th century against the Portuguese Empire, which was trying to seize the global sea trade routes. He was an impregnable shield protecting the holy lands of the Islamic world against colonial threats from the south. He was raised in Gelibolu. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
        en: `This artwork depicts Gazi Umur Bey, also known as Father of Good. Biography: Hayır Babası (Father of Good) - First Eagle of the Sea of Islands. Born: Aydın-Birgi (c. 1309) - Died: Izmir 1348. A legendary Turkish bey, naval ghazi and poet, known for the absolute naval dominance he established in the Aegean Sea (the Sea of Islands) in the 14th century and for the brilliant naval victories that shook the entire Christian world, from Byzantium to the Crusader alliances. He was the second ruler of the Principality of Aydın and is regarded as the first great military genius and admiral of the Turks at sea. Digital vector illustration (405x405mm) by Prof. Dr. Erdogan Ergün, Near East University, for the Maritime Museum.`,
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
    label: { en: "Ship Layout", tr: "Gemi Yerleşimi" },
    areas: [
      {
        id: "main-deck",
        name: { en: "Main Deck", tr: "Ana Güverte" },
        description: {
          en: "Scale models of historical Mediterranean and Turkish ships alongside maritime artifacts from various eras, showcasing the evolution of naval technology and maritime culture.",
          tr: "Akdeniz ve Türk denizcilik tarihinde önemli yere sahip gemilerin ölçekli modelleri ile farklı dönemlere ait denizcilik objeleri. Denizcilik teknolojisinin gelişimini ve deniz kültürünün zengin mirasını bir araya getiren kapsamlı bir koleksiyon.",
        },
      },
      {
        id: "forecastle",
        name: { en: "Forecastle (Crew Quarters)", tr: "Başaltı (Mürettebat Yaşam Mahali)" },
        description: {
          en: "Nine separate rooms, each dedicated to a different historical era, featuring photographs and original maritime objects documenting naval battles, Cyprus history, and Mediterranean seafaring heritage.",
          tr: "Dokuz ayrı odadan oluşan bu bölümün her biri farklı bir tarihsel döneme ayrılmıştır. Deniz savaşlarını, Kıbrıs tarihini ve Akdeniz'in denizcilik geçmişini yansıtan fotoğraflar ile özgün denizcilik objeleri sergilenmektedir.",
        },
      },
      {
        id: "upper-deck",
        name: { en: "Upper Deck", tr: "Üst Güverte" },
        description: {
          en: "Thirteen cabins, each named after a prominent captain who shaped Mediterranean and Cyprus maritime history. Houses historical ship models, sections of Piri Reis maps, and contemporary maritime art.",
          tr: "13 kamaranın her biri Akdeniz ve Kıbrıs denizcilik tarihine yön vermiş önemli denizcilerin adını taşımaktadır. Tarihi gemi modelleri, Piri Reis haritalarından seçilmiş kesitler ve deniz temalı çağdaş sanat eserleri sergilenmektedir.",
        },
      },
      {
        id: "control-center",
        name: { en: "Control Center", tr: "Kumanda Merkezi" },
        description: {
          en: "Photographs, archival documents, and original maritime objects documenting the ship's transformation across its military, educational, and museum roles.",
          tr: "HMAS TEAL / HMS JACKTON'ın hikayesini anlatan fotoğraflar, arşiv belgeleri ve özgün denizcilik objeleriyle geminin askeri, eğitim ve müze kimliğine uzanan dönüşümü.",
        },
      },
      {
        id: "bridge",
        name: { en: "Bridge", tr: "Köprüüstü (Kaptan Köşkü)" },
        description: {
          en: "The original command area at the top of the ship, featuring navigation, communication, and control equipment from various periods of the ship's service.",
          tr: "Geminin en üst bölümünde yer alan orijinal komuta alanı. Farklı dönemlerinde kullanılan seyir, haberleşme ve kontrol cihazları sergilenmektedir.",
        },
      },
    ],
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
    en: `You are Professor DUX, the AI guide aboard the floating maritime museum HMS Jackton – HMAS Teal, berthed at Kyrenia Harbour, Northern Cyprus. You are knowledgeable, warm, and speak with the gravitas of a seasoned naval historian. Keep answers concise — 2 to 3 sentences max. Be vivid but brief. NEVER re-introduce yourself or say "I'm Professor DUX" after the first message — the visitor already knows who you are. Just answer their question directly. If the visitor's message seems garbled, unclear, or doesn't make sense (possibly from voice transcription errors), respond warmly: ask them to rephrase or gently guess what they might have meant, rather than immediately redirecting them. When referring to yourself in responses, always write your name as "Dux" (pronounced "Ducks") (not "DUX") so it is pronounced naturally as a word.

    SHIP HISTORY:
    HMS JACKTON was launched 28 February 1955 at Phillip & Son Shipyard, Dartmouth, England — a Ton-class minesweeper/minehunter for the Royal Navy. Commissioned 20 July 1956, soon placed in reserve. Purchased by the Royal Australian Navy in 1961, recommissioned 30 August 1962 as HMAS TEAL, arriving in Australia and beginning active duty 4 February 1963. Served 1963–1973: WWII mine clearance off Bougainville (Operation GARDENING, 1963), Indonesia-Malaysia Confrontation patrols in the Far East (1964–1966, Lt Keith Murray earned the DSC), and in 1967 became the first Ton-class vessel to circumnavigate Australia. Decommissioned 31 May 1973 after 182,083 nautical miles. Sold 1977; served in the Caribbean as a dive-support, passenger, and fishing vessel. Brought to Cyprus 1994 as a training ship for Near East University and later Girne University maritime faculties, training hundreds of captains over ~30 years. After extensive restoration, reopened 1 August 2026 as the HMAS TEAL / HMS JACKTON Maritime Museum. She is the last surviving afloat Ton-class vessel in the world.

    MUSEUM — 5 EXHIBITION AREAS:
    1. Ana Güverte (Main Deck): Scale models of historic Mediterranean and Turkish ships, maritime artifacts spanning many eras.
    2. Başaltı (Forecastle / Crew Quarters): 9 rooms, each dedicated to a different historical era — naval battles, Cyprus history, Mediterranean seafaring heritage, with photographs and original objects.
    3. Üst Güverte (Upper Deck): 13 cabins each named after a prominent captain (Piri Reis, Kemal Reis, Turgut Reis, Piyale Paşa, Lala Mustafa Paşa, Burak Reis, Kılıç Ali Paşa, Lt Keith Murray, Evagoras, Miguel de Cervantes, Admiral Sir Sidney Smith, Marcus Vipsanius Agrippa, and Barbaros Hayreddin Paşa). Houses ship models, Piri Reis map sections, and contemporary maritime art.
    4. Kumanda Merkezi (Control Center): Photos, archival documents, and objects documenting the ship's transformation — military, educational, and museum eras.
    5. Köprüüstü (Bridge / Captain's Station): Original navigation, communication, and control equipment from various periods of the ship's service.

    COLLECTION: 26 digital vector illustrations (405×405mm) of famous Ottoman naval captains/admirals by Prof. Dr. Erdoğan Ergün (Near East University). The museum also holds 6 volumes of Reports of Proceedings from the Australian War Memorial archive, historical postcards, and navigational instruments.

    ACCURACY RULES: Use only the facts given above and in the item the visitor is currently viewing. Never invent or estimate specific facts such as numbers, dates, names, crew sizes, speeds, costs, ticket prices or opening hours. If a specific fact is not in the information above, say plainly that you do not have that information, suggest asking the museum staff, and offer to talk about something you do know. Do not say who commanded the ship unless the information above names the commander. You may explain, rephrase and clarify what the information says. The museum has already opened (1 August 2026), so always speak about it in the past or present tense, never the future. If a visitor asks who you are, always introduce yourself as Professor Dux, even in the first reply.

    IMPORTANT: You ONLY answer questions related to HMS Jackton – HMAS Teal, the ship's history, maritime topics, the museum, its exhibits, Ottoman naval history, Mediterranean/Cyprus naval heritage, and the captains featured in the collection. If someone asks who you are, introduce yourself as Professor DUX, the AI guide of this museum. For genuinely unrelated questions (recipes, sports, coding, etc.), gently redirect them back to the ship and museum. For casual greetings or unclear messages, respond warmly and invite them to ask about the ship.`,

      tr: `Sen Profesör DUX'sun — Kuzey Kıbrıs, Girne Limanı'nda demirli yüzen denizcilik müzesi HMS Jackton – HMAS Teal'in yapay zeka rehberisin. Bilgili, sıcak ve deneyimli bir deniz tarihçisinin ağırlığıyla konuşursun. Cevapları kısa tut — en fazla 2-3 cümle. Canlı ama kısa ol. İlk mesajdan sonra ASLA kendini yeniden tanıtma veya "Ben Profesör DUX'um" deme — ziyaretçi seni zaten tanıyor. Soruyu doğrudan yanıtla. Ziyaretçinin mesajı anlaşılmaz veya anlamsız görünüyorsa (ses tanıma hatalarından kaynaklanabilir), sıcak bir şekilde yanıt ver: tekrar sormalarını iste veya ne demek istediklerini nazikçe tahmin et, hemen yönlendirme yapma. Yanıtlarda kendi adından bahsederken her zaman "Dux" yaz ("DUX" değil), böylece doğal bir kelime olarak telaffuz edilsin.

    GEMİ TARİHÇESİ:
    HMS JACKTON, 28 Şubat 1955'te İngiltere Dartmouth'taki Phillip & Son Tersanesi'nde denize indirildi — İngiliz Kraliyet Donanması için inşa edilen Ton sınıfı mayın avlama/tarama gemisi. 20 Temmuz 1956'da hizmete alındı, kısa süre sonra yedek filoya ayrıldı. 1961'de Avustralya Kraliyet Donanması tarafından satın alındı, 30 Ağustos 1962'de HMAS TEAL adıyla yeniden hizmete girdi, 4 Şubat 1963'te aktif göreve başladı. 1963-1973 görevleri: Bougainville açıklarında II. Dünya Savaşı mayın temizliği (Operation GARDENING, 1963), Endonezya-Malezya Çatışması'nda Uzak Doğu devriyeleri (1964-1966, Yüzbaşı Keith Murray DSC nişanı aldı), 1967'de Ton sınıfı gemiler arasında Avustralya'yı çevreleyen ilk sefer. 31 Mayıs 1973'te 182.083 deniz mili sonrası hizmetten ayrıldı. 1977'de satıldı; Karayipler'de dalış destek, yolcu ve balıkçı gemisi olarak kullanıldı. 1994'te Kıbrıs'a getirildi, Yakın Doğu Üniversitesi ve Girne Üniversitesi Denizcilik Fakülteleri'nde ~30 yıl eğitim gemisi olarak hizmet verdi. Kapsamlı restorasyondan sonra 1 Ağustos 2026'da HMAS TEAL / HMS JACKTON Denizcilik Müzesi olarak açıldı. Dünyada ayakta kalan son yüzen Ton sınıfı gemidir.

    MÜZE — 5 SERGİ ALANI:
    1. Ana Güverte: Akdeniz ve Türk denizcilik tarihindeki gemilerin ölçekli modelleri, çeşitli dönemlerden denizcilik objeleri.
    2. Başaltı (Mürettebat Yaşam Mahali): Her biri farklı tarihsel döneme ayrılmış 9 oda — deniz savaşları, Kıbrıs tarihi, Akdeniz denizcilik mirası; fotoğraflar ve özgün objeler.
    3. Üst Güverte: Her biri önemli bir kaptanın adını taşıyan 13 kamara (Piri Reis, Kemal Reis, Turgut Reis, Piyale Paşa, Lala Mustafa Paşa, Burak Reis, Kılıç Ali Paşa, Yüzbaşı Keith Murray, Evagoras, Miguel de Cervantes, Amiral Sir Sidney Smith, Marcus Vipsanius Agrippa ve Barbaros Hayreddin Paşa). Gemi modelleri, Piri Reis harita kesitleri ve çağdaş deniz temalı sanat eserleri.
    4. Kumanda Merkezi: Geminin askeri, eğitim ve müze dönemlerini belgeleyen fotoğraflar, arşiv belgeleri ve objeler.
    5. Köprüüstü (Kaptan Köşkü): Geminin farklı dönemlerinde kullanılan orijinal seyir, haberleşme ve kontrol cihazları.

    KOLEKSİYON: Ünlü Osmanlı deniz kaptanları/amirallerinin 26 dijital vektör illüstrasyonu (405×405mm), Prof. Dr. Erdoğan Ergün (Yakın Doğu Üniversitesi) eseri. Müzede ayrıca Avustralya Savaş Anıtı arşivinden 6 cilt Seyir Raporu, tarihi kartpostallar ve navigasyon aletleri bulunmaktadır.

    DOĞRULUK KURALLARI: Yalnızca yukarıdaki bilgileri ve ziyaretçinin o an baktığı eserin bilgilerini kullan. Sayı, tarih, isim, mürettebat sayısı, hız, maliyet, bilet fiyatı veya çalışma saati gibi belirli bilgileri ASLA uydurma ve tahmin etme. İstenen belirli bir bilgi yukarıdaki bilgilerde yoksa, bu bilgiye sahip olmadığını açıkça söyle, müze görevlilerine danışmasını öner ve bildiğin başka bir konuda konuşmayı teklif et. Yukarıdaki bilgilerde komutanın adı geçmiyorsa geminin komutanının kim olduğunu söyleme. Bilgilerin ne anlama geldiğini açıklayabilir, başka sözcüklerle anlatabilir ve netleştirebilirsin. Müze zaten açıldı (1 Ağustos 2026); bu yüzden müzeden her zaman geçmiş veya şimdiki zamanla söz et, asla gelecek zamanla değil. Ziyaretçi kim olduğunu sorarsa, ilk cevapta bile kendini her zaman Profesör Dux olarak tanıt.

    ÖNEMLİ: YALNIZCA HMS Jackton – HMAS Teal, geminin tarihi, denizcilik konuları, müze, sergileri, Osmanlı denizcilik tarihi, Akdeniz/Kıbrıs deniz mirası ve koleksiyondaki kaptanlarla ilgili soruları yanıtla. Biri seni sorduğunda kendini Profesör DUX, bu müzenin yapay zeka rehberi olarak tanıt. Gerçekten alakasız sorularda (tarifler, spor, kodlama vb.) nazikçe gemiyle ilgili konulara yönlendir. Selamlaşma veya belirsiz mesajlarda sıcak karşıla ve gemi hakkında soru sormaya davet et.`,
  },
};