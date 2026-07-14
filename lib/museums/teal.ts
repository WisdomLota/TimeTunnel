// lib/museums/teal.ts

import type { MuseumConfig } from "./types";

export const tealConfig: MuseumConfig = {
  slug: "teal",
  name: "HMAS Teal",
  branding: {
    logo: "/museums/teal/logo.svg",
    colors: {
      primary: "#0d7377",    // deep teal
      void: "#040e10",       // near-black sea void
      accent: "#c9a227",     // naval brass
      layerColors: [
        "#8B7355",           // Origins — aged brass
        "#0d7377",           // First Operations — teal
        "#C0392B",           // Confrontation — signal red
        "#2471A3",           // Home Waters — ocean blue
        "#1E8449",           // Rebirth — living green
      ],
    },
    font: "Chakra Petch",
  },

  yearRange: [1955, 2021],

  layers: [
    {
      id: "origins",
      label: { en: "Origins", tr: "Kökenler" },
      yearRange: [1955, 1962],
      color: "#8B7355",
    },
    {
      id: "first-ops",
      label: { en: "First Operations", tr: "İlk Operasyonlar" },
      yearRange: [1963, 1964],
      color: "#0d7377",
    },
    {
      id: "confrontation",
      label: { en: "Confrontation", tr: "Çatışma" },
      yearRange: [1964, 1966],
      color: "#C0392B",
    },
    {
      id: "home-waters",
      label: { en: "Home Waters", tr: "Ana Sular" },
      yearRange: [1966, 1973],
      color: "#2471A3",
    },
    {
      id: "rebirth",
      label: { en: "Rebirth", tr: "Yeniden Doğuş" },
      yearRange: [1977, 2021],
      color: "#1E8449",
    },
  ],

  works: [
    // ── Origins ──
    {
      id: "teal-before-voyage",
      layerId: "origins",
      title: {
        en: "Teal Before Her Voyage",
        tr: "Yolculuk Öncesi Teal",
      },
      description: {
        en: "HMAS Teal photographed in the United Kingdom before her delivery voyage to Australia. Originally HMS Jackton, she was accepted into Royal Navy service on 20 July 1956 and immediately placed into the Reserve Fleet at Hythe.",
        tr: "HMAS Teal, Avustralya'ya teslimat yolculuğundan önce Birleşik Krallık'ta fotoğraflanmıştır. Orijinal adı HMS Jackton olan gemi, 20 Temmuz 1956'da Kraliyet Donanması hizmetine kabul edilmiş ve hemen Hythe'deki Yedek Filoya yerleştirilmiştir.",
      },
      image: "/museums/teal/teal-before-voyage.jpg",
      year: 1961,
      duxContext: {
        en: "This photo shows Teal still in UK waters before the RAN purchased her in 1961. She was built by Phillip and Co at Dartmouth, launched 28 February 1955 as a Ton Class minesweeper. Displacement 375 tons standard, 46.6m long, crew of 38, powered by 2 Napier Deltic Diesels at 3,000 HP, max speed 15 knots. Armed with a single 40/60 Bofors gun.",
        tr: "Bu fotoğraf, Teal'i 1961'de RAN tarafından satın alınmadan önce İngiliz sularında göstermektedir. Dartmouth'ta Phillip and Co tarafından inşa edilmiş, 28 Şubat 1955'te Ton Sınıfı mayın tarayıcı olarak denize indirilmiştir. 375 ton standart deplasman, 46,6 m uzunluk, 38 kişilik mürettebat, 3.000 HP'lik 2 Napier Deltic Dizel motorla 15 knot hıza ulaşır.",
      },
    },
    {
      id: "teal-commissioning",
      layerId: "origins",
      title: {
        en: "Commissioning Day",
        tr: "Hizmete Giriş Günü",
      },
      description: {
        en: "HMAS Teal was commissioned on 30 August 1962 under the command of Lieutenant Commander JG Stacey, RAN, before departing the United Kingdom for Australia.",
        tr: "HMAS Teal, 30 Ağustos 1962'de Yüzbaşı JG Stacey, RAN komutasında hizmete girmiştir ve ardından İngiltere'den Avustralya'ya hareket etmiştir.",
      },
      image: "/museums/teal/teal-commissioning-1962.jpg",
      year: 1962,
      duxContext: {
        en: "Teal was commissioned 30 August 1962 as one of six ex-Royal Navy Ton Class minesweepers acquired by the RAN: Hawk, Gull, Snipe, Ibis, and Curlew. Together they formed the 16th Mine Countermeasures Squadron. Her first CO was LCDR JG Stacey.",
        tr: "Teal, RAN tarafından edinilen altı eski Kraliyet Donanması Ton Sınıfı mayın tarayıcısından biri olarak 30 Ağustos 1962'de hizmete girmiştir. Diğerleri: Hawk, Gull, Snipe, Ibis ve Curlew. Birlikte 16. Mayın Karşı Tedbirler Filosu'nu oluşturmuşlardır.",
      },
    },
    {
      id: "teal-arrives-sydney",
      layerId: "origins",
      title: {
        en: "Arrival in Sydney",
        tr: "Sydney'e Varış",
      },
      description: {
        en: "HMAS Teal arrived in Sydney with her sister ships on 7 December 1962, marking the beginning of her service in Australian waters.",
        tr: "HMAS Teal, kardeş gemileriyle birlikte 7 Aralık 1962'de Sydney'e ulaşarak Avustralya sularındaki hizmetinin başlangıcını işaret etmiştir.",
      },
      image: "/museums/teal/teal-arrives-sydney.jpg",
      year: 1962,
      duxContext: {
        en: "After commissioning in the UK, the six Ton Class minesweepers made the long delivery voyage to Australia, arriving Sydney 7 December 1962. Teal commenced RAN service on 4 February 1963 with exercises in the Broken Bay area.",
        tr: "İngiltere'de hizmete girdikten sonra, altı Ton Sınıfı mayın tarayıcı uzun teslimat yolculuğunu tamamlayarak 7 Aralık 1962'de Sydney'e varmıştır. Teal, 4 Şubat 1963'te Broken Bay bölgesindeki tatbikatlarla RAN hizmetine başlamıştır.",
      },
    },

    // ── First Operations ──
    {
      id: "teal-sister-ships",
      layerId: "first-ops",
      title: {
        en: "The Squadron at Sea",
        tr: "Denizde Filo",
      },
      description: {
        en: "HMAS Teal (foreground) in company with her sister ships HMA Ships Snipe, Curlew and Hawk during operations.",
        tr: "HMAS Teal (ön planda), operasyonlar sırasında kardeş gemileri Snipe, Curlew ve Hawk ile birlikte.",
      },
      image: "/museums/teal/teal-sister-ships.jpg",
      year: 1963,
      duxContext: {
        en: "On 20 September 1963, Teal and sister ships sailed for Operation GARDENING — a minesweeping task to clear a channel into Tonolei Harbour, Bougainville, where US aircraft had dropped magnetic mines in 1943. This was the RAN's biggest minesweeping operation in 16 years. The deployment included port visits to Singapore and Port Moresby, plus hydrographic surveys in the Solomon Sea.",
        tr: "20 Eylül 1963'te Teal ve kardeş gemiler Operasyon GARDENING için yola çıkmıştır — ABD uçaklarının 1943'te manyetik mayınlar bıraktığı Bougainville'deki Tonolei Limanı'na giriş kanalını temizleme görevi. Bu, RAN'ın 16 yıldaki en büyük mayın tarama operasyonuydu.",
      },
    },

    // ── Confrontation ──
    {
      id: "teal-murray-crew",
      layerId: "confrontation",
      title: {
        en: "Lt Murray & Crew",
        tr: "Tğm. Murray ve Mürettebat",
      },
      description: {
        en: "Lieutenant Keith 'Gus' Murray, DSC, RAN, with members of Teal's crew, circa 1968. Murray was awarded the Distinguished Service Cross for his actions during the Indonesian Confrontation.",
        tr: "Yüzbaşı Keith 'Gus' Murray, DSC, RAN, Teal'in mürettebat üyeleriyle, yaklaşık 1968. Murray, Endonezya Çatışması sırasındaki eylemleri nedeniyle Seçkin Hizmet Haçı ile ödüllendirilmiştir.",
      },
      image: "/museums/teal/teal-murray-crew-1968.jpg",
      year: 1965,
      duxContext: {
        en: "During Malaysian Confrontation patrols, Teal had two critical encounters. On 6 Dec 1964, she fired across the bow of an unlit vessel; three Indonesian soldiers were arrested. On 13 Dec 1964, two sampans were spotted near Raffles Light — one opened fire on Teal. Teal's return fire killed three of seven crewmen and the vessel surrendered. On 23 Feb 1965, Teal arrested nine heavily armed Indonesians. Lt Murray's patrol regime became standard RAN operating procedure. He received the DSC on 30 November 1965.",
        tr: "Malezya Çatışması devriye görevlerinde Teal iki kritik karşılaşma yaşamıştır. 6 Aralık 1964'te ışıksız bir geminin önüne ateş açmış, üç Endonezyalı asker tutuklanmıştır. 13 Aralık 1964'te Raffles Feneri yakınında iki sampan tespit edilmiş, biri Teal'e ateş açmıştır. Teal'in karşılık ateşi yedi mürettebattan üçünü öldürmüş ve gemi teslim olmuştur. Murray'ın devriye rejimi standart RAN prosedürü haline gelmiştir.",
      },
    },

    // ── Home Waters ──
    {
      id: "teal-commissioning-order-1971",
      layerId: "home-waters",
      title: {
        en: "1971 Recommissioning",
        tr: "1971 Yeniden Hizmete Giriş",
      },
      description: {
        en: "HMAS Teal's 1971 Commissioning Order — she was recommissioned on 7 January 1971 under LCDR RJ Burns, RAN, after her second period in Operational Reserve.",
        tr: "HMAS Teal'in 1971 Hizmete Giriş Emri — ikinci Operasyonel Yedek döneminin ardından 7 Ocak 1971'de LCDR RJ Burns, RAN komutasında yeniden hizmete girmiştir.",
      },
      image: "/museums/teal/teal-commissioning-order-1971.jpg",
      year: 1971,
      duxContext: {
        en: "Teal had a turbulent career of repeated commissionings and decommissionings due to manpower constraints and maintenance costs. Paid off 15 Jan 1968, briefly recommissioned Sep-Oct 1968 for Exercise SHADOW, paid off again 14 Oct 1968, then recommissioned 7 Nov 1969 under LCDR HE Jones. After exercises including CRACKSHOT and BERSATU PADU with 30+ ships from four navies, she decommissioned again 14 Aug 1970 — only to recommission 7 Jan 1971 under LCDR RJ Burns.",
        tr: "Teal, personel kısıtlamaları ve bakım maliyetleri nedeniyle tekrarlanan hizmete giriş ve çıkışlarla dolu çalkantılı bir kariyere sahipti. 15 Ocak 1968'de hizmet dışı bırakılmış, Eylül-Ekim 1968'de kısa süreliğine yeniden hizmete girmiş, tekrar hizmet dışı bırakılmış, sonra 7 Ocak 1971'de LCDR Burns komutasında yeniden hizmete girmiştir.",
      },
    },
    {
      id: "teal-burns",
      layerId: "home-waters",
      title: {
        en: "Commander Burns",
        tr: "Komutan Burns",
      },
      description: {
        en: "LCDR RJ Burns, GM, RAN — Teal's Commanding Officer in 1972 and Commander of the First Mine Countermeasures Squadron.",
        tr: "LCDR RJ Burns, GM, RAN — 1972'de Teal'in Komutanı ve Birinci Mayın Karşı Tedbirler Filosu Komutanı.",
      },
      image: "/museums/teal/teal-burns-1972.jpg",
      year: 1972,
      duxContext: {
        en: "Under Burns, Teal departed 26 June 1972 for a 4½-month Far East deployment with Curlew and Snipe. They conducted general surveys, cleared a WWII minefield near Port Moresby, and participated in SEATO exercise SEA SCORPION. They returned 10 November 1972. Teal was finally decommissioned 31 May 1973 after steaming 182,083 nautical miles in 7½ years of active RAN service.",
        tr: "Burns komutasında Teal, 26 Haziran 1972'de Curlew ve Snipe ile 4,5 aylık Uzak Doğu konuşlanmasına çıkmıştır. Genel araştırmalar yapmış, Port Moresby yakınında bir WWII mayın tarlasını temizlemiş ve SEATO tatbikatı SEA SCORPION'a katılmıştır. 7,5 yıllık aktif hizmette 182.083 deniz mili yol almıştır.",
      },
    },
    {
      id: "teal-decommissioning",
      layerId: "home-waters",
      title: {
        en: "Final Pennant",
        tr: "Son Flama",
      },
      description: {
        en: "HMAS Teal flying her decommissioning pennant prior to 'paying off' for the last time on 31 May 1973, after 182,083 nautical miles of service.",
        tr: "HMAS Teal, 182.083 deniz millik hizmetin ardından 31 Mayıs 1973'te son kez 'hizmet dışı bırakılmadan' önce hizmetten çıkış flamasını dalgalandırıyor.",
      },
      image: "/museums/teal/teal-decommissioning-pennant.jpg",
      year: 1973,
      duxContext: {
        en: "Teal's final decommissioning came 31 May 1973. During 7½ years of active RAN service she steamed 182,083 nautical miles. She remained in the Reserve Fleet for several years before being sold in October 1977. She earned the Battle Honour MALAYSIA 1964-66 for her Confrontation service.",
        tr: "Teal'in son hizmetten çıkışı 31 Mayıs 1973'te olmuştur. 7,5 yıllık aktif RAN hizmetinde 182.083 deniz mili yol almıştır. Birkaç yıl Yedek Filoda kaldıktan sonra Ekim 1977'de satılmıştır. Çatışma hizmeti için MALEZYA 1964-66 Muharebe Şeref Nişanı kazanmıştır.",
      },
    },

    // ── Rebirth ──
    // No archival photo on the page for this era, but the video content covers the modern Kyrenia museum.
    // We use a placeholder — you can screenshot a frame from your video or find a photo of Teal at Kyrenia.
    // {
    //   id: "teal-kyrenia-museum",
    //   layerId: "rebirth",
    //   ...
    // },
  ],

  video: {
    src: "/museums/teal/teal-video.mp4",
    durationSec: 120,
    
    // Time windows: 0-15(15s≈35w), 15-32(17s≈40w), 32-48(16s≈38w), 48-65(17s≈40w), 65-85(20s≈48w), 85-98(13s≈30w), 98-112(14s≈33w), 112-120(8s≈18w)

    narration: {
      en: [
        {
          time: 0,
          text: "Welcome aboard HMAS Teal, a Ton Class minesweeper, docked here at Kyrenia Harbour. She has sailed over a hundred and eighty-two thousand nautical miles.",
        },
        {
          time: 16,
          text: "That Australian flag tells her origin story. Teal served the Royal Australian Navy for seven and a half years, from nineteen sixty-two to seventy-three.",
        },
        {
          time: 33,
          text: "Here you see her crew at work. Thirty-eight men lived aboard this small ship, just forty-six metres long. Every sailor earned their place.",
        },
        {
          time: 49,
          text: "The sailors are examining samples from their missions. In sixty-three, Teal cleared Second World War mines near Bougainville. The Navy's biggest sweep in sixteen years.",
        },
        {
          time: 66,
          text: "Her true test came in sixty-four, off Malaysia. An enemy sampan opened fire on Teal. She returned fire. Three enemy crew were killed and the vessel surrendered. Her captain received the Distinguished Service Cross.",
        },
        {
          time: 86,
          text: "These artefacts on deck are links to those missions. Each rock and metal fragment carries a story of the seas she crossed.",
        },
        {
          time: 99,
          text: "After decommissioning in seventy-three, Teal sailed to Cyprus, Tanzania, and the Caribbean before returning here.",
        },
        {
          time: 112,
          text: "Now she rests in Kyrenia as a floating museum. Step closer and explore her memory layers.",
        },
      ],
      tr: [
        {
          time: 0,
          text: "HMAS Teal'e hoş geldiniz. Girne Limanı'nda demirli bu Ton Sınıfı mayın tarayıcı, yüz seksen iki bin deniz mili yol almıştır.",
        },
        {
          time: 16,
          text: "Avustralya bayrağı kökenini anlatır. Teal, altmış ikiden yetmiş üçe kadar yedi buçuk yıl Avustralya Donanması'na hizmet etmiştir.",
        },
        {
          time: 33,
          text: "Mürettebatı güvertede çalışırken görüyorsunuz. Otuz sekiz kişi, kırk altı metrelik bu küçük gemide yaşadı.",
        },
        {
          time: 49,
          text: "Denizciler görevlerden toplanan örnekleri inceliyor. Altmış üçte Teal, Bougainville yakınında İkinci Dünya Savaşı mayınlarını temizledi.",
        },
        {
          time: 66,
          text: "Gerçek sınavı altmış dörtte Malezya açıklarında geldi. Düşman bir sampan ateş açtı. Teal karşılık verdi. Üç düşman öldürüldü, gemi teslim oldu. Komutanı Seçkin Hizmet Haçı aldı.",
        },
        {
          time: 86,
          text: "Güvertedeki bu eserler o görevlere bağdır. Her taş ve metal parçası geçtiği denizlerin hikâyesini taşır.",
        },
        {
          time: 99,
          text: "Yetmiş üçte hizmetten çıktıktan sonra Kıbrıs'a, Tanzanya'ya ve Karayipler'e yelken açtı.",
        },
        {
          time: 112,
          text: "Şimdi Girne'de yüzen müze olarak dinleniyor. Yaklaşın ve hafıza katmanlarını keşfedin.",
        },
      ],
    },
  },

  duxSystemPrompt: {
    en: `You are Prof Dux, the AI guide aboard the floating maritime museum HMAS Teal, berthed at Kyrenia Harbour in Northern Cyprus. You are knowledgeable, warm, and speak with the gravitas of a seasoned naval historian. HMAS Teal is a Ton Class minesweeper (pennant M1152), built by Phillip & Co at Dartmouth, launched 28 February 1955, originally HMS Jackton in the Royal Navy. Purchased by the RAN in 1961, commissioned 30 August 1962, she served 7½ active years steaming 182,083 nautical miles. She participated in Operation GARDENING (Bougainville 1963), the Indonesian Confrontation patrols (Malaysia 1964-66, earning a Battle Honour), circumnavigated Australia (1967), and conducted SEATO exercises. After final decommissioning 31 May 1973 and sale in 1977, she served in Cyprus, Tanzania, and the Caribbean before being purchased by the TRNC Ministry of Public Works & Transport in 1994. She trained civilian mariners at Near East University and the University of Kyrenia, and in 2021 was converted into the floating museum visitors are now aboard. Specs: 375 tons std / 480 full, 46.6m × 8.8m × 2.5m draught, 2 Napier Deltic Diesels (3,000 HP), 15 knots, crew 38, 1× 40/60 Bofors. Answer questions about the ship, her history, her crew, and maritime life. Keep answers concise but vivid.`,
    tr: `Sen Prof Dux'sun — Kuzey Kıbrıs, Girne Limanı'nda demirli yüzen denizcilik müzesi HMAS Teal'in yapay zeka rehberisin. Bilgili, sıcak ve deneyimli bir deniz tarihçisinin ağırlığıyla konuşursun. HMAS Teal, Ton Sınıfı bir mayın tarayıcıdır (flama M1152), Dartmouth'ta Phillip & Co tarafından inşa edilmiş, 28 Şubat 1955'te denize indirilmiştir. Orijinal adı HMS Jackton'dır. 1961'de RAN tarafından satın alınmış, 30 Ağustos 1962'de hizmete girmiş, 7,5 yıl aktif hizmette 182.083 deniz mili yol almıştır. Operasyon GARDENING (Bougainville 1963), Endonezya Çatışması devriyeleri (Malezya 1964-66), Avustralya çevresinde seyir (1967) ve SEATO tatbikatlarına katılmıştır. 31 Mayıs 1973'te son kez hizmetten çıkarılmış, 1977'de satılmış, Kıbrıs, Tanzanya ve Karayipler'de hizmet vermiştir. 1994'te KKTC Bayındırlık ve Ulaştırma Bakanlığı tarafından satın alınmış, Yakın Doğu Üniversitesi ve Girne Üniversitesi'nde sivil denizcilerin eğitiminde kullanılmış ve 2021'de yüzen müzeye dönüştürülmüştür. Sorulara kısa ama canlı cevaplar ver.`,
  },
};