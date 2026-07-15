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
      id: "teal-before-voyage",
      categoryId: "collection",
      title: { en: "Before the Voyage", tr: "Yolculuk Öncesi" },
      description: {
        en: "HMAS Teal photographed in the United Kingdom before her delivery voyage to Australia. Originally HMS Jackton, she was accepted into Royal Navy service on 20 July 1956.",
        tr: "HMAS Teal, Avustralya'ya teslimat yolculuğundan önce Birleşik Krallık'ta fotoğraflanmıştır. Orijinal adı HMS Jackton olan gemi, 20 Temmuz 1956'da Kraliyet Donanması hizmetine kabul edilmiştir.",
      },
      image: "/museums/teal/teal-before-voyage.jpg",
      year: 1961,
      duxContext: { en: "Photo of Teal in UK waters before RAN purchase in 1961.", tr: "1961'de RAN tarafından satın alınmadan önce İngiliz sularında Teal'in fotoğrafı." },
    },
    {
      id: "teal-commissioning",
      categoryId: "collection",
      title: { en: "Commissioning Day", tr: "Hizmete Giriş Günü" },
      description: {
        en: "HMAS Teal was commissioned on 30 August 1962 under Lieutenant Commander JG Stacey, RAN.",
        tr: "HMAS Teal, 30 Ağustos 1962'de Yüzbaşı JG Stacey komutasında hizmete girmiştir.",
      },
      image: "/museums/teal/teal-commissioning-1962.jpg",
      year: 1962,
      duxContext: { en: "Commissioned 30 August 1962 as one of six Ton Class minesweepers.", tr: "Altı Ton Sınıfı mayın tarayıcısından biri olarak 30 Ağustos 1962'de hizmete girmiştir." },
    },
    {
      id: "teal-arrives-sydney",
      categoryId: "collection",
      title: { en: "Arrival in Sydney", tr: "Sydney'e Varış" },
      description: {
        en: "HMAS Teal arrived in Sydney with her sister ships on 7 December 1962.",
        tr: "HMAS Teal, kardeş gemileriyle birlikte 7 Aralık 1962'de Sydney'e ulaşmıştır.",
      },
      image: "/museums/teal/teal-arrives-sydney.jpg",
      year: 1962,
      duxContext: { en: "Arrived Sydney 7 December 1962 after delivery voyage from UK.", tr: "İngiltere'den teslimat yolculuğunun ardından 7 Aralık 1962'de Sydney'e varmıştır." },
    },
    {
      id: "teal-sister-ships",
      categoryId: "collection",
      title: { en: "The Squadron at Sea", tr: "Denizde Filo" },
      description: {
        en: "HMAS Teal (foreground) with sister ships Snipe, Curlew and Hawk during operations.",
        tr: "HMAS Teal (ön planda), operasyonlar sırasında kardeş gemileri Snipe, Curlew ve Hawk ile birlikte.",
      },
      image: "/museums/teal/teal-sister-ships.jpg",
      year: 1963,
      duxContext: { en: "Teal with sister ships during Operation GARDENING, 1963.", tr: "1963'te Operasyon GARDENING sırasında Teal ve kardeş gemiler." },
    },
    {
      id: "teal-murray-crew",
      categoryId: "collection",
      title: { en: "Lt Murray & Crew", tr: "Teğmen Murray ve Mürettebat" },
      description: {
        en: "Lieutenant Keith 'Gus' Murray, DSC, RAN, with members of Teal's crew. Murray received the Distinguished Service Cross for actions during the Indonesian Confrontation.",
        tr: "Teğmen Keith 'Gus' Murray, DSC, RAN, Teal'in mürettebat üyeleriyle. Murray, Endonezya Çatışması sırasındaki eylemleri nedeniyle Seçkin Hizmet Haçı ile ödüllendirilmiştir.",
      },
      image: "/museums/teal/teal-murray-crew-1968.jpg",
      year: 1965,
      duxContext: { en: "Lt Murray's patrol regime became standard RAN operating procedure. He received the DSC on 30 November 1965.", tr: "Murray'ın devriye rejimi standart RAN prosedürü haline gelmiştir." },
    },
    {
      id: "teal-commissioning-order-1971",
      categoryId: "collection",
      title: { en: "1971 Recommissioning", tr: "1971 Yeniden Hizmete Giriş" },
      description: {
        en: "HMAS Teal's 1971 Commissioning Order — recommissioned under LCDR RJ Burns, RAN.",
        tr: "HMAS Teal'in 1971 Hizmete Giriş Emri — LCDR RJ Burns komutasında yeniden hizmete girmiştir.",
      },
      image: "/museums/teal/teal-commissioning-order-1971.jpg",
      year: 1971,
      duxContext: { en: "Recommissioned 7 Jan 1971 under LCDR RJ Burns after second period in Operational Reserve.", tr: "İkinci Operasyonel Yedek döneminin ardından 7 Ocak 1971'de yeniden hizmete girmiştir." },
    },
    {
      id: "teal-burns",
      categoryId: "collection",
      title: { en: "Commander Burns", tr: "Komutan Burns" },
      description: {
        en: "LCDR RJ Burns, GM, RAN — Teal's Commanding Officer in 1972.",
        tr: "LCDR RJ Burns, GM, RAN — 1972'de Teal'in Komutanı.",
      },
      image: "/museums/teal/teal-burns-1972.jpg",
      year: 1972,
      duxContext: { en: "Under Burns, Teal departed for a 4½-month Far East deployment, steaming 182,083 nautical miles total.", tr: "Burns komutasında Teal, 4,5 aylık Uzak Doğu konuşlanmasına çıkmıştır." },
    },
    {
      id: "teal-decommissioning",
      categoryId: "collection",
      title: { en: "Final Pennant", tr: "Son Flama" },
      description: {
        en: "HMAS Teal flying her decommissioning pennant prior to paying off on 31 May 1973.",
        tr: "HMAS Teal, 31 Mayıs 1973'te hizmetten çıkmadan önce son flamasını dalgalandırıyor.",
      },
      image: "/museums/teal/teal-decommissioning-pennant.jpg",
      year: 1973,
      duxContext: { en: "Final decommissioning 31 May 1973, after 182,083 nautical miles. Battle Honour: MALAYSIA 1964-66.", tr: "31 Mayıs 1973'te son hizmetten çıkış, 182.083 deniz mili." },
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