/* ARCHIWUM FOTOGRAFICZNE — archiwum.js */

// ══════════════════════════════════════════════════════════════
//  DANE — MIEJSCA I WYDARZENIA
//
//  Struktura:
//
//  MIEJSCA = tablica obiektów miejsca:
//  {
//    id:        "unikalny-id-miejsca",          // tylko litery, cyfry, myślniki
//    nazwa:     "Galeria Foksal",
//    miasto:    "Warszawa",
//    opis:      "Krótki opis miejsca (opcjonalny)"
//  }
//
//  WYDARZENIA = tablica obiektów wydarzenia:
//  {
//    id:          "unikalny-id-wydarzenia",
//    miejsceId:   "id-miejsca",                 // musi odpowiadać id w MIEJSCA
//    rok:         2004,
//    miesiac:     "Październik",
//    nazwa:       "Wernisaż Kowalskiego",
//    opis:        "Krótki opis (opcjonalny)",
//    miniatura:   "photos/[miejsce-id]/[rok]/[folder]/plik.jpg",
//    photos: [
//      { plik: "photos/...", podpis: "Opis zdjęcia" },
//      ...
//    ]
//  }
//
//  Katalog ze zdjęciami: photos/[miejsceId]/[rok]/[nazwa-folderu]/
//  Przykład:             photos/galeria-foksal/2004/wernisaz-kowalskiego/
// ══════════════════════════════════════════════════════════════

var MIEJSCA = [
  {
    id:     "galeria-foksal",
    nazwa:  "Galeria Foksal",
    miasto: "Warszawa",
    opis:   "Jedna z najważniejszych galerii sztuki współczesnej w Polsce, działająca od 1966 roku."
  },
  {
    id:     "bunkier-sztuki",
    nazwa:  "Bunkier Sztuki",
    miasto: "Kraków",
    opis:   "Galeria Sztuki Współczesnej przy placu Szczepańskim w centrum Krakowa."
  },
  {
    id:     "csw-zamek-ujazdowski",
    nazwa:  "CSW Zamek Ujazdowski",
    miasto: "Warszawa",
    opis:   "Centrum Sztuki Współczesnej w zabytkowym zamku na Ujazdowie."
  },
  {
    id:     "galeria-arsenal",
    nazwa:  "Galeria Arsenał",
    miasto: "Białystok",
    opis:   "Miejska galeria sztuki w dawnym arsenale miejskim."
  }
];

var WYDARZENIA = [
  // ── Galeria Foksal ──────────────────────────────────────────
  {
    id:        "foksal-2004-wernisaz",
    miejsceId: "galeria-foksal",
    rok:       2005,
    miesiac:   "Październik",
    nazwa:     "Wernisaż — Dokumentacja fotograficzna",
    opis:      "Wernisaż wystawy fotograficznej. Tłumy gości, czarno-białe odbitki na ścianach.",
    miniatura: "photos/2004/kaczmarska/IMG_0119.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0116.jpg", podpis: "Goście przy wejściu" },
      { plik: "photos/2004/kaczmarska/IMG_0118.jpg", podpis: "Oglądanie ekspozycji" },
      { plik: "photos/2004/kaczmarska/IMG_0119.jpg", podpis: "Sala główna" },
      { plik: "photos/2004/kaczmarska/IMG_0120.jpg", podpis: "Przy zdjęciach" },
      { plik: "photos/2004/kaczmarska/IMG_0123.jpg", podpis: "Prace na ścianie" },
      { plik: "photos/2004/kaczmarska/IMG_0125.jpg", podpis: "Rozmowy" },
      { plik: "photos/2004/kaczmarska/IMG_0126.jpg", podpis: "Prezentacja" },
      { plik: "photos/2004/kaczmarska/IMG_0135.jpg", podpis: "Uczestnicy" },
      { plik: "photos/2004/kaczmarska/IMG_0136.jpg", podpis: "Prelegent" },
      { plik: "photos/2004/kaczmarska/IMG_0138.jpg", podpis: "Uwaga publiczności" },
      { plik: "photos/2004/kaczmarska/IMG_0141.jpg", podpis: "Fotografia na ścianie" },
      { plik: "photos/2004/kaczmarska/IMG_0142.jpg", podpis: "Widzowie" }
    ]
  },
  {
    id:        "foksal-2004-spotkanie",
    miejsceId: "galeria-foksal",
    rok:       2005,
    miesiac:   "Marzec",
    nazwa:     "Spotkanie z artystą",
    opis:      "Rozmowa z artystą przy pracach z cyklu Zapis.",
    miniatura: "photos/2004/kaczmarska/IMG_0136.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0136.jpg", podpis: "Rozmowa" },
      { plik: "photos/2004/kaczmarska/IMG_0138.jpg", podpis: "Publiczność" }
    ]
  },
  {
    id:        "foksal-2010-wystawa",
    miejsceId: "galeria-foksal",
    rok:       2008,
    miesiac:   "Maj",
    nazwa:     "Wystawa zbiorowa — Nowe nazwiska",
    opis:      "Przegląd prac młodych artystów.",
    miniatura: "photos/2004/kaczmarska/IMG_0125.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0125.jpg", podpis: "Prace na ścianie" },
      { plik: "photos/2004/kaczmarska/IMG_0126.jpg", podpis: "Zwiedzający" }
    ]
  },
  {
    id:        "foksal-2010-panel",
    miejsceId: "galeria-foksal",
    rok:       2008,
    miesiac:   "Listopad",
    nazwa:     "Panel dyskusyjny — Fotografia dziś",
    opis:      "Dyskusja panelowa z udziałem krytyków i fotografów.",
    miniatura: "photos/2004/kaczmarska/IMG_0120.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0120.jpg", podpis: "Panel" },
      { plik: "photos/2004/kaczmarska/IMG_0116.jpg", podpis: "Sala" }
    ]
  },
  {
    id:        "foksal-2012-finisaz",
    miejsceId: "galeria-foksal",
    rok:       2010,
    miesiac:   "Czerwiec",
    nazwa:     "Finisaż wystawy — Pejzaże",
    opis:      "Zamknięcie wystawy pejzażowej, ostatnie spotkanie z artystami.",
    miniatura: "photos/2004/kaczmarska/IMG_0142.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0142.jpg", podpis: "Finisaż" },
      { plik: "photos/2004/kaczmarska/IMG_0141.jpg", podpis: "Praca na ścianie" }
    ]
  },

  // ── Bunkier Sztuki ──────────────────────────────────────────
  {
    id:        "bunkier-2009-wernisaz",
    miejsceId: "bunkier-sztuki",
    rok:       2006,
    miesiac:   "Luty",
    nazwa:     "Wernisaż — Czarno-białe",
    opis:      "Otwarcie wystawy fotografii czarno-białej.",
    miniatura: "photos/2004/kaczmarska/IMG_0118.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0118.jpg", podpis: "Wernisaż" },
      { plik: "photos/2004/kaczmarska/IMG_0123.jpg", podpis: "Goście" }
    ]
  },
  {
    id:        "bunkier-2009-konkurs",
    miejsceId: "bunkier-sztuki",
    rok:       2006,
    miesiac:   "Wrzesień",
    nazwa:     "Konkurs fotograficzny — werdykt",
    opis:      "Ogłoszenie wyników corocznego konkursu.",
    miniatura: "photos/2004/kaczmarska/IMG_0135.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0135.jpg", podpis: "Ceremonia" }
    ]
  },
  {
    id:        "bunkier-2011-retrospektywa",
    miejsceId: "bunkier-sztuki",
    rok:       2009,
    miesiac:   "Październik",
    nazwa:     "Retrospektywa — 20 lat galerii",
    opis:      "Jubileuszowa wystawa z okazji dwudziestolecia.",
    miniatura: "photos/2004/kaczmarska/IMG_0119.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0119.jpg", podpis: "Otwarcie" },
      { plik: "photos/2004/kaczmarska/IMG_0120.jpg", podpis: "Tłumy gości" },
      { plik: "photos/2004/kaczmarska/IMG_0125.jpg", podpis: "Ekspozycja" }
    ]
  },

  // ── CSW Zamek Ujazdowski ─────────────────────────────────────
  {
    id:        "csw-2007-otwarcie",
    miejsceId: "csw-zamek-ujazdowski",
    rok:       2004,
    miesiac:   "Kwiecień",
    nazwa:     "Otwarcie sezonu wiosennego",
    opis:      "Inauguracja programu wiosennego CSW.",
    miniatura: "photos/2004/kaczmarska/IMG_0126.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0126.jpg", podpis: "Otwarcie" }
    ]
  },
  {
    id:        "csw-2013-performance",
    miejsceId: "csw-zamek-ujazdowski",
    rok:       2010,
    miesiac:   "Styczeń",
    nazwa:     "Performance — Cisza i ruch",
    opis:      "Wieczór performatywny w holu głównym zamku.",
    miniatura: "photos/2004/kaczmarska/IMG_0141.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0141.jpg", podpis: "Performans" },
      { plik: "photos/2004/kaczmarska/IMG_0138.jpg", podpis: "Publiczność" }
    ]
  },

  // ── Galeria Arsenał ─────────────────────────────────────────
  {
    id:        "arsenal-2015-wernisaz",
    miejsceId: "galeria-arsenal",
    rok:       2007,
    miesiac:   "Czerwiec",
    nazwa:     "Wernisaż — Wschód",
    opis:      "Wystawa artystów z Polski wschodniej.",
    miniatura: "photos/2004/kaczmarska/IMG_0136.jpg",
    zdjecia: [
      { plik: "photos/2004/kaczmarska/IMG_0136.jpg", podpis: "Wernisaż" },
      { plik: "photos/2004/kaczmarska/IMG_0142.jpg", podpis: "Goście" }
    ]
  }
];

// ══════════════════════════════════════════════════════════════
//  STAN APLIKACJI
// ══════════════════════════════════════════════════════════════

var stan = {
  aktualnaStrona:    "miejsca",   // "miejsca" | "lata" | "wydarzenia" | "zdarzenie" | "o-archiwum"
  aktualneMiejsceId: null,
  aktualnyRok:       null,
  aktualneWydarzenie: null,
  lightboxIndeks:    0,
  historia:          []           // stos do przycisku "Powrót"
};

// ══════════════════════════════════════════════════════════════
//  RENDEROWANIE — POZIOM 1: LISTA MIEJSC
// ══════════════════════════════════════════════════════════════

function renderujMiejsca() {
  var el = document.getElementById("strona-miejsca");
  var html = '<div class="lista-miejsc">';

  MIEJSCA.forEach(function(m) {
    var liczbWydarz = WYDARZENIA.filter(function(w) { return w.miejsceId === m.id; }).length;
    var lata = lataDlaMiejsca(m.id);
    var zakres = lata.length > 1
      ? lata[lata.length - 1] + "\u2013" + lata[0]
      : (lata.length === 1 ? String(lata[0]) : "");

    html += '<a class="miejsce-wiersz" href="#" onclick="otworzyMiejsce(\'' + m.id + '\'); return false;">';
    html += '<div class="miejsce-wiersz__lewo">';
    html += '<div class="miejsce-wiersz__nazwa">' + escHtml(m.nazwa) + '</div>';
    html += '<div class="miejsce-wiersz__miasto">' + escHtml(m.miasto) + '</div>';
    html += '</div>';
    html += '<div class="miejsce-wiersz__prawo">';
    if (zakres) html += '<span class="miejsce-wiersz__zakres">' + zakres + '</span>';
    html += '<span class="miejsce-wiersz__liczba">' + liczbWydarz + '\u00a0' + liczbaWydarzenia(liczbWydarz) + '</span>';
    html += '</div>';
    html += '</a>';
  });

  html += '</div>';
  el.querySelector(".miejsca-kontener").innerHTML = html;
}

function lataDlaMiejsca(miejsceId) {
  var lata = [];
  WYDARZENIA.forEach(function(w) {
    if (w.miejsceId === miejsceId && lata.indexOf(w.rok) === -1) lata.push(w.rok);
  });
  return lata.sort(function(a, b) { return b - a; });
}

// ══════════════════════════════════════════════════════════════
//  RENDEROWANIE — POZIOM 2: LATA DANEGO MIEJSCA
// ══════════════════════════════════════════════════════════════

function otworzyMiejsce(miejsceId) {
  stan.aktualneMiejsceId = miejsceId;
  var miejsce = MIEJSCA.find(function(m) { return m.id === miejsceId; });
  var lata = lataDlaMiejsca(miejsceId);

  var el = document.getElementById("strona-lata");
  var html = "";

  html += '<a class="powrot" href="#" onclick="cofnij(); return false;">Powrót do miejsc</a>';
  html += '<div class="podstrona-naglowek">';
  html += '<div class="podstrona-naglowek__nad">Miejsce</div>';
  html += '<div class="podstrona-naglowek__tytul">' + escHtml(miejsce.nazwa) + '</div>';
  html += '<div class="podstrona-naglowek__pod">' + escHtml(miejsce.miasto) + '</div>';
  if (miejsce.opis) {
    html += '<div class="podstrona-naglowek__opis">' + escHtml(miejsce.opis) + '</div>';
  }
  html += '</div>';

  html += '<div class="lista-lat">';
  lata.forEach(function(rok) {
    var wRoku = WYDARZENIA.filter(function(w) { return w.miejsceId === miejsceId && w.rok === rok; });
    html += '<a class="rok-wiersz" href="#" onclick="otworzyLata(\'' + miejsceId + '\',' + rok + '); return false;">';
    html += '<span class="rok-wiersz__rok">' + rok + '</span>';
    html += '<span class="rok-wiersz__linia"></span>';
    html += '<span class="rok-wiersz__liczba">' + wRoku.length + '\u00a0' + liczbaWydarzenia(wRoku.length) + '</span>';
    html += '<span class="rok-wiersz__strzalka">\u2192</span>';
    html += '</a>';
  });
  html += '</div>';

  el.innerHTML = html;
  pokazStrone("lata", "miejsca");
}

// ══════════════════════════════════════════════════════════════
//  RENDEROWANIE — POZIOM 3: WYDARZENIA DANEGO ROKU W MIEJSCU
// ══════════════════════════════════════════════════════════════

function otworzyLata(miejsceId, rok) {
  stan.aktualnyRok = rok;
  var miejsce = MIEJSCA.find(function(m) { return m.id === miejsceId; });
  var wydarzenia = WYDARZENIA.filter(function(w) { return w.miejsceId === miejsceId && w.rok === rok; });

  var el = document.getElementById("strona-wydarzenia");
  var html = "";

  html += '<a class="powrot" href="#" onclick="cofnij(); return false;">Powrót do lat — ' + escHtml(miejsce.nazwa) + '</a>';
  html += '<div class="podstrona-naglowek">';
  html += '<div class="podstrona-naglowek__nad">' + escHtml(miejsce.nazwa) + ' \u00b7 ' + escHtml(miejsce.miasto) + '</div>';
  html += '<div class="podstrona-naglowek__tytul">' + rok + '</div>';
  html += '<div class="podstrona-naglowek__pod">' + wydarzenia.length + '\u00a0' + liczbaWydarzenia(wydarzenia.length) + '</div>';
  html += '</div>';

  html += '<div class="zdarzenia-lista">';
  wydarzenia.forEach(function(w) {
    html += '<a class="zdarzenie-karta" href="#" onclick="otworzyWydarzenie(\'' + w.id + '\'); return false;">';
    html += '<div class="zdarzenie-karta__miniatura">';
    html += '<img src="' + escHtml(w.miniatura) + '" alt="' + escHtml(w.nazwa) + '" loading="lazy">';
    html += '<span class="zdarzenie-karta__licznik">' + w.zdjecia.length + '\u00a0zdj.</span>';
    html += '</div>';
    html += '<div class="zdarzenie-karta__info">';
    html += '<div class="zdarzenie-karta__data">' + escHtml(w.miesiac) + '\u00a0\u00b7\u00a0' + rok + '</div>';
    html += '<div class="zdarzenie-karta__nazwa">' + escHtml(w.nazwa) + '</div>';
    html += '</div>';
    html += '</a>';
  });
  html += '</div>';

  el.innerHTML = html;
  pokazStrone("wydarzenia", "lata");
}

// ══════════════════════════════════════════════════════════════
//  RENDEROWANIE — POZIOM 4: GALERIA POJEDYNCZEGO WYDARZENIA
// ══════════════════════════════════════════════════════════════

function otworzyWydarzenie(id) {
  var w = WYDARZENIA.find(function(x) { return x.id === id; });
  if (!w) return;
  var miejsce = MIEJSCA.find(function(m) { return m.id === w.miejsceId; });

  stan.aktualneWydarzenie = w;

  var el = document.getElementById("strona-zdarzenie");
  var html = "";

  html += '<a class="powrot" href="#" onclick="cofnij(); return false;">Powrót do ' + w.rok + ' \u2014 ' + escHtml(miejsce.nazwa) + '</a>';
  html += '<div class="zdarzenie-naglowek">';
  html += '<div class="zdarzenie-naglowek__meta">' + escHtml(w.miesiac) + ' ' + w.rok + ' \u00b7 ' + escHtml(miejsce.nazwa) + ', ' + escHtml(miejsce.miasto) + '</div>';
  html += '<div class="zdarzenie-naglowek__tytul">' + escHtml(w.nazwa) + '</div>';
  if (w.opis) html += '<div class="zdarzenie-naglowek__opis">' + escHtml(w.opis) + '</div>';
  html += '</div>';

  html += '<div class="galeria-siatka">';
  w.zdjecia.forEach(function(zdjecie, i) {
    html += '<div class="galeria-zdjecie" onclick="otworzyLightbox(' + i + ')">';
    html += '<img src="' + escHtml(zdjecie.plik) + '" alt="' + escHtml(zdjecie.podpis) + '" loading="lazy">';
    html += '<span class="galeria-zdjecie__numer">' + String(i + 1).padStart(2, '0') + '</span>';
    html += '</div>';
  });
  html += '</div>';

  el.innerHTML = html;
  pokazStrone("zdarzenie", "wydarzenia");
}

// ══════════════════════════════════════════════════════════════
//  NAWIGACJA
// ══════════════════════════════════════════════════════════════

function pokazStrone(nazwa, poprzednia) {
  if (poprzednia) stan.historia.push(poprzednia);

  document.querySelectorAll(".strona").forEach(function(el) {
    el.classList.remove("aktywna");
  });

  var mapa = {
    "miejsca":    "strona-miejsca",
    "lata":       "strona-lata",
    "wydarzenia": "strona-wydarzenia",
    "zdarzenie":  "strona-zdarzenie",
    "o-archiwum": "strona-o-archiwum"
  };

  var el = document.getElementById(mapa[nazwa]);
  if (el) el.classList.add("aktywna");

  document.querySelectorAll(".nawigacja a").forEach(function(a) {
    a.classList.remove("aktywny");
    if (a.dataset.strona === nazwa) a.classList.add("aktywny");
    if (nazwa !== "o-archiwum" && a.dataset.strona === "miejsca") a.classList.add("aktywny");
  });

  window.scrollTo(0, 0);
}

function cofnij() {
  var poprzednia = stan.historia.pop();
  if (!poprzednia) poprzednia = "miejsca";

  document.querySelectorAll(".strona").forEach(function(el) {
    el.classList.remove("aktywna");
  });

  var mapa = {
    "miejsca":    "strona-miejsca",
    "lata":       "strona-lata",
    "wydarzenia": "strona-wydarzenia",
    "zdarzenie":  "strona-zdarzenie",
    "o-archiwum": "strona-o-archiwum"
  };

  var el = document.getElementById(mapa[poprzednia]);
  if (el) el.classList.add("aktywna");
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════════════════════════
//  LIGHTBOX
// ══════════════════════════════════════════════════════════════

function otworzyLightbox(indeks) {
  var w = stan.aktualneWydarzenie;
  if (!w) return;
  stan.lightboxIndeks = indeks;
  aktualizujLightbox();
  document.getElementById("lightbox").classList.add("aktywny");
}

function aktualizujLightbox() {
  var w = stan.aktualneWydarzenie;
  var i = stan.lightboxIndeks;
  var zdjecie = w.zdjecia[i];
  document.getElementById("lightbox-obraz").src = zdjecie.plik;
  document.getElementById("lightbox-obraz").alt = zdjecie.podpis;
  document.getElementById("lightbox-licznik").textContent =
    String(i + 1).padStart(2, '0') + " / " + String(w.zdjecia.length).padStart(2, '0');
}

function lightboxNastepny() {
  var w = stan.aktualneWydarzenie;
  stan.lightboxIndeks = (stan.lightboxIndeks + 1) % w.zdjecia.length;
  aktualizujLightbox();
}

function lightboxPoprzedni() {
  var w = stan.aktualneWydarzenie;
  stan.lightboxIndeks = (stan.lightboxIndeks - 1 + w.zdjecia.length) % w.zdjecia.length;
  aktualizujLightbox();
}

function zamknijLightbox() {
  document.getElementById("lightbox").classList.remove("aktywny");
}

document.addEventListener("keydown", function(e) {
  var lb = document.getElementById("lightbox");
  if (!lb.classList.contains("aktywny")) return;
  if (e.key === "ArrowRight") lightboxNastepny();
  if (e.key === "ArrowLeft")  lightboxPoprzedni();
  if (e.key === "Escape")     zamknijLightbox();
});

// ══════════════════════════════════════════════════════════════
//  POMOCNICZE
// ══════════════════════════════════════════════════════════════

function liczbaWydarzenia(n) {
  if (n === 1) return "wydarzenie";
  if (n >= 2 && n <= 4) return "wydarzenia";
  return "wydarzeń";
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ══════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function() {
  renderujMiejsca();
  pokazStrone("o-archiwum");
});
