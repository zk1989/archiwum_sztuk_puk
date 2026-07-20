/* ARCHIWUM FOTOGRAFICZNE — app.js */

// ══════════════════════════════════════════════════════════════
//  APP STATE
// ══════════════════════════════════════════════════════════════

var state = {
  currentEvent:   null,
  lightboxIndex:  0,
  history:        [],         // navigation stack for the Back button

  // in-memory cache: venueId -> array of events (loaded on demand)
  eventsCache:    {}
};

// Venue list — loaded once at startup
var venues = [];

// ══════════════════════════════════════════════════════════════
//  DATA LOADING
// ══════════════════════════════════════════════════════════════

function loadVenues(callback) {
  fetch("data/venues.json")
    .then(function(r) { return r.json(); })
    .then(function(data) {
      venues = data;
      callback();
    })
    .catch(function(err) {
      console.error("Could not load venues.json:", err);
    });
}

function loadVenueEvents(venueId, callback) {
  // Return from cache if already loaded
  if (state.eventsCache[venueId]) {
    callback(state.eventsCache[venueId]);
    return;
  }

  fetch("data/" + venueId + ".json")
    .then(function(r) { return r.json(); })
    .then(function(data) {
      state.eventsCache[venueId] = data;
      callback(data);
    })
    .catch(function(err) {
      console.error("Could not load " + venueId + ".json:", err);
      callback([]);
    });
}

// ══════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function eventCountLabel(n) {
  if (n === 1) return "wydarzenie";
  if (n >= 2 && n <= 4) return "wydarzenia";
  return "wydarzeń";
}

function yearsForVenue(events) {
  var years = [];
  events.forEach(function(e) {
    if (years.indexOf(e.year) === -1) years.push(e.year);
  });
  return years.sort(function(a, b) { return b - a; });
}

// ══════════════════════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════════════════════

function showPage(name, previous) {
  if (previous) state.history.push(previous);

  document.querySelectorAll(".page").forEach(function(el) {
    el.classList.remove("active");
  });

  var map = {
    "venues":   "page-venues",
    "years":    "page-years",
    "events":   "page-events",
    "event":    "page-event",
    "about":    "page-about",
    "takedown": "page-takedown"
  };

  var el = document.getElementById(map[name]);
  if (el) el.classList.add("active");

  document.querySelectorAll(".nav a").forEach(function(a) {
    a.classList.remove("active");
    if (a.dataset.page === name) a.classList.add("active");
    if (name !== "about" && a.dataset.page === "venues") a.classList.add("active");
  });

  window.scrollTo(0, 0);
}

function goBack() {
  var previous = state.history.pop();
  if (!previous) previous = "venues";
  showPage(previous);
}

// ══════════════════════════════════════════════════════════════
//  LEVEL 1: VENUE LIST
// ══════════════════════════════════════════════════════════════

function renderVenues() {
  var container = document.querySelector(".venues-container");
  var html = '<div class="venue-list">';

  venues.forEach(function(venue) {
    // We don't have event counts yet (events are lazy-loaded),
    // so show a placeholder that fills in after clicking, or
    // preload all venues counts eagerly only here (small overhead).
    html += '<a class="venue-row" href="#" onclick="openVenue(\'' + venue.id + '\'); return false;">';
    html += '<div class="venue-row__left">';
    html += '<div class="venue-row__name">' + escHtml(venue.name) + '</div>';
    html += '<div class="venue-row__city">' + escHtml(venue.city) + '</div>';
    html += '</div>';
    html += '<div class="venue-row__right">';
    html += '<span class="venue-row__arrow">\u2192</span>';
    html += '</div>';
    html += '</a>';
  });

  html += '</div>';
  container.innerHTML = html;

  // After rendering, load event counts for each venue asynchronously
  venues.forEach(function(venue) {
    loadVenueEvents(venue.id, function(events) {
      updateVenueRowMeta(venue.id, events);
    });
  });
}

function updateVenueRowMeta(venueId, events) {
  // Find the row by venueId and inject year range + event count
  var rows = document.querySelectorAll(".venue-row");
  rows.forEach(function(row) {
    if (row.getAttribute("onclick").indexOf(venueId) === -1) return;

    var years = yearsForVenue(events);
    var range = years.length > 1
      ? years[years.length - 1] + "\u2013" + years[0]
      : (years.length === 1 ? String(years[0]) : "");

    var right = row.querySelector(".venue-row__right");
    var meta = "";
    if (range) meta += '<span class="venue-row__range">' + range + '</span>';
    meta += '<span class="venue-row__count">' + events.length + "\u00a0" + eventCountLabel(events.length) + '</span>';
    meta += '<span class="venue-row__arrow">\u2192</span>';
    right.innerHTML = meta;
  });
}

// ══════════════════════════════════════════════════════════════
//  LEVEL 2: YEARS AT A VENUE
// ══════════════════════════════════════════════════════════════

function openVenue(venueId) {
  var venue = venues.find(function(v) { return v.id === venueId; });

  loadVenueEvents(venueId, function(events) {
    var years = yearsForVenue(events);
    var el = document.getElementById("page-years");
    var html = "";

    html += '<a class="back-link" href="#" onclick="goBack(); return false;">Powrót do miejsc</a>';
    html += '<div class="section-header">';
    html += '<div class="section-header__eyebrow">Miejsce</div>';
    html += '<div class="section-header__title">' + escHtml(venue.name) + '</div>';
    html += '<div class="section-header__sub">' + escHtml(venue.city) + '</div>';
    html += '</div>';

    html += '<div class="year-list">';
    years.forEach(function(year) {
      var inYear = events.filter(function(e) { return e.year === year; });
      html += '<a class="year-row" href="#" onclick="openYear(\'' + venueId + '\',' + year + '); return false;">';
      html += '<span class="year-row__year">' + year + '</span>';
      html += '<span class="year-row__line"></span>';
      html += '<span class="year-row__count">' + inYear.length + "\u00a0" + eventCountLabel(inYear.length) + '</span>';
      html += '<span class="year-row__arrow">\u2192</span>';
      html += '</a>';
    });
    html += '</div>';

    el.innerHTML = html;
    showPage("years", "venues");
  });
}

// ══════════════════════════════════════════════════════════════
//  LEVEL 3: EVENTS IN A YEAR
// ══════════════════════════════════════════════════════════════

function openYear(venueId, year) {
  var venue = venues.find(function(v) { return v.id === venueId; });

  loadVenueEvents(venueId, function(events) {
    var yearEvents = events.filter(function(e) { return e.year === year; });
    var el = document.getElementById("page-events");
    var html = "";

    html += '<a class="back-link" href="#" onclick="goBack(); return false;">Powrót do lat \u2014 ' + escHtml(venue.name) + '</a>';
    html += '<div class="section-header">';
    html += '<div class="section-header__eyebrow">' + escHtml(venue.name) + ' \u00b7 ' + escHtml(venue.city) + '</div>';
    html += '<div class="section-header__title">' + year + '</div>';
    html += '<div class="section-header__sub">' + yearEvents.length + "\u00a0" + eventCountLabel(yearEvents.length) + '</div>';
    html += '</div>';

    html += '<div class="event-grid">';
    yearEvents.forEach(function(event) {
      html += '<a class="event-card" href="#" onclick="openEvent(\'' + venueId + '\',\'' + event.id + '\'); return false;">';
      html += '<div class="event-card__thumbnail">';
      html += '<img src="' + escHtml(event.thumbnail) + '" alt="' + escHtml(event.title) + '" loading="lazy">';
      html += '<span class="event-card__count">' + event.photos.length + "\u00a0zdj." + '</span>';
      html += '</div>';
      html += '<div class="event-card__info">';
      html += '<div class="event-card__date">' + escHtml(event.month) + "\u00a0\u00b7\u00a0" + year + '</div>';
      html += '<div class="event-card__title">' + escHtml(event.title) + '</div>';
      html += '</div>';
      html += '</a>';
    });
    html += '</div>';

    el.innerHTML = html;
    showPage("events", "years");
  });
}

// ══════════════════════════════════════════════════════════════
//  LEVEL 4: EVENT GALLERY
// ══════════════════════════════════════════════════════════════

function openEvent(venueId, eventId) {
  var venue = venues.find(function(v) { return v.id === venueId; });

  loadVenueEvents(venueId, function(events) {
    var event = events.find(function(e) { return e.id === eventId; });
    if (!event) return;

    state.currentEvent = event;

    var el = document.getElementById("page-event");
    var html = "";

    html += '<a class="back-link" href="#" onclick="goBack(); return false;">Powrót do ' + event.year + ' \u2014 ' + escHtml(venue.name) + '</a>';
    html += '<div class="event-header">';
    html += '<div class="event-header__meta">' + escHtml(event.month) + ' ' + event.year + ' \u00b7 ' + escHtml(venue.name) + ', ' + escHtml(venue.city) + '</div>';
    html += '<div class="event-header__title">' + escHtml(event.title) + '</div>';
    html += '</div>';

    html += '<div class="photo-grid">';
    event.photos.forEach(function(photo, i) {
      html += '<div class="photo-grid__item" onclick="openLightbox(' + i + ')">';
      html += '<img src="' + escHtml(photo.file) + '" alt="' + escHtml(event.title) + '" loading="lazy">';
      html += '<span class="photo-grid__number">' + String(i + 1).padStart(2, "0") + '</span>';
      html += '</div>';
    });
    html += '</div>';

    el.innerHTML = html;
    showPage("event", "events");
  });
}

// ══════════════════════════════════════════════════════════════
//  LIGHTBOX
// ══════════════════════════════════════════════════════════════

function openLightbox(index) {
  if (!state.currentEvent) return;
  state.lightboxIndex = index;
  updateLightbox();
  document.getElementById("lightbox").classList.add("active");
}

function updateLightbox() {
  var event = state.currentEvent;
  var i = state.lightboxIndex;
  var photo = event.photos[i];
  document.getElementById("lightbox-image").src = photo.file;
  document.getElementById("lightbox-image").alt = event.title;
  document.getElementById("lightbox-counter").textContent =
    String(i + 1).padStart(2, "0") + " / " + String(event.photos.length).padStart(2, "0");
}

function lightboxNext() {
  var event = state.currentEvent;
  state.lightboxIndex = (state.lightboxIndex + 1) % event.photos.length;
  updateLightbox();
}

function lightboxPrev() {
  var event = state.currentEvent;
  state.lightboxIndex = (state.lightboxIndex - 1 + event.photos.length) % event.photos.length;
  updateLightbox();
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

document.addEventListener("keydown", function(e) {
  var lb = document.getElementById("lightbox");
  if (!lb.classList.contains("active")) return;
  if (e.key === "ArrowRight") lightboxNext();
  if (e.key === "ArrowLeft")  lightboxPrev();
  if (e.key === "Escape")     closeLightbox();
});

// Block the right-click context menu on photos so "Save image" isn't
// a one-click option. Not real protection — just a speed bump.
document.addEventListener("contextmenu", function(e) {
  if (e.target.tagName === "IMG") e.preventDefault();
});

// ══════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function() {
  loadVenues(function() {
    renderVenues();
    showPage("about");
  });
});
