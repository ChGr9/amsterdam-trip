/* ============================================================
   Renders the site from the TRIP object in data.js.
   You should not need to touch this file to update content.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  /* ---------- helpers ---------- */

  function mapsUrl(location) {
    // Universal Google Maps link: opens the Maps app on phones,
    // the website on desktop.
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(location);
  }

  function wazeUrl(location) {
    // Universal Waze link: opens the Waze app if installed.
    return "https://waze.com/ul?q=" + encodeURIComponent(location) +
      "&navigate=yes";
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function actionButtons(item) {
    const wrap = el("div", "tl-actions");
    if (item.tickets) {
      wrap.appendChild(link("btn btn-ticket", item.tickets, "🎟️ Tickets"));
    }
    if (item.location) {
      wrap.appendChild(link("btn btn-maps", mapsUrl(item.location), "📍 Maps"));
      wrap.appendChild(link("btn btn-waze", wazeUrl(item.location), "🚗 Waze"));
    }
    if (item.url) {
      wrap.appendChild(link("btn btn-site", item.url, "🌐 Website"));
    }
    return wrap.childElementCount ? wrap : null;
  }

  function link(className, href, label) {
    const a = el("a", className, label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  function fmtDate(iso) {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  function todayISO() {
    const now = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return now.getFullYear() + "-" + p(now.getMonth() + 1) + "-" + p(now.getDate());
  }

  /* ---------- hero ---------- */

  function renderHero() {
    $("#trip-title").textContent = TRIP.title;
    $("#trip-subtitle").textContent = TRIP.subtitle || "";

    if (TRIP.days.length) {
      const first = fmtDate(TRIP.days[0].date);
      const last = fmtDate(TRIP.days[TRIP.days.length - 1].date);
      $("#trip-dates").textContent = first + "  →  " + last;
    }

    if (TRIP.hotel && TRIP.hotel.name) {
      const a = link("hotel-pill", mapsUrl(TRIP.hotel.location || TRIP.hotel.name),
        "🏨 " + esc(TRIP.hotel.name) + " <span aria-hidden=\"true\">↗</span>");
      $("#hotel-card").appendChild(a);
    }

    $("#footer-text").textContent =
      "Made with ❤️ for the " + (TRIP.title || "") + " family trip · " +
      "Tap 📍 to open Google Maps, 🚗 for Waze";
  }

  /* ---------- schedule ---------- */

  let activeDay = 0;

  function renderTabs() {
    const tabs = $("#day-tabs");
    tabs.innerHTML = "";
    const today = todayISO();

    TRIP.days.forEach((day, i) => {
      const b = el("button", "day-tab" + (i === activeDay ? " active" : ""));
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === activeDay ? "true" : "false");
      if (day.date === today) b.classList.add("today");
      b.innerHTML =
        "<span class=\"dt-day\">" + esc(day.label) + "</span>" +
        "<span class=\"dt-date\">" + esc(fmtDate(day.date)) + "</span>";
      b.addEventListener("click", () => {
        activeDay = i;
        renderTabs();
        renderDay();
      });
      tabs.appendChild(b);
    });
  }

  function renderDay() {
    const day = TRIP.days[activeDay];
    const box = $("#day-content");
    box.innerHTML = "";

    const head = el("div", "day-header",
      "<h3>" + esc(day.label) + " — " + esc(day.theme) + "</h3>" +
      (day.desc ? "<p>" + esc(day.desc) + "</p>" : ""));
    box.appendChild(head);

    const tl = el("div", "timeline");
    day.items.forEach((item) => {
      const cat = item.cat || "sight";
      const li = el("div", "tl-item cat-" + cat);
      const card = el("div", "tl-card");

      const top = el("div", "tl-top");
      if (item.time) {
        const t = item.time + (item.end ? " – " + item.end : "");
        top.appendChild(el("span", "tl-time", esc(t)));
      }
      top.appendChild(el("span", "tl-title", esc(item.title)));
      if (item.booked === true) top.appendChild(el("span", "tl-badge booked", "✓ Booked"));
      if (item.booked === false) top.appendChild(el("span", "tl-badge need", "Book ahead"));
      card.appendChild(top);

      if (item.desc) card.appendChild(el("p", "tl-desc", esc(item.desc)));

      const actions = actionButtons(item);
      if (actions) card.appendChild(actions);

      li.appendChild(card);
      tl.appendChild(li);
    });
    box.appendChild(tl);
  }

  /* ---------- free time ---------- */

  function renderFreeTime() {
    const grid = $("#freetime-grid");
    (TRIP.freeTime || []).forEach((idea) => {
      const card = el("div", "idea-card");
      const head = el("div", "idea-head");
      head.appendChild(el("h4", null, esc(idea.title)));
      if (idea.area) head.appendChild(el("span", "idea-meta", esc(idea.area)));
      card.appendChild(head);

      if (idea.tags && idea.tags.length) {
        const tags = el("div", "idea-tags");
        idea.tags.forEach((t) => tags.appendChild(el("span", "tag", esc(t))));
        card.appendChild(tags);
      }

      if (idea.desc) card.appendChild(el("p", null, esc(idea.desc)));

      const actions = actionButtons(idea);
      if (actions) card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  /* ---------- restaurants ---------- */

  let foodFilter = "All";

  function renderFoodFilters() {
    const row = $("#food-filters");
    row.innerHTML = "";
    const cuisines = ["All", ...new Set((TRIP.restaurants || []).map((r) => r.cuisine))];
    cuisines.forEach((c) => {
      const chip = el("button", "filter-chip" + (c === foodFilter ? " active" : ""), esc(c));
      chip.addEventListener("click", () => {
        foodFilter = c;
        renderFoodFilters();
        renderRestaurants();
      });
      row.appendChild(chip);
    });
  }

  function renderRestaurants() {
    const grid = $("#restaurant-grid");
    grid.innerHTML = "";
    (TRIP.restaurants || [])
      .filter((r) => foodFilter === "All" || r.cuisine === foodFilter)
      .forEach((r) => {
        const card = el("div", "idea-card");
        const head = el("div", "idea-head");
        head.appendChild(el("h4", null, esc(r.name)));
        head.appendChild(el("span", "idea-meta", esc((r.price ? r.price + " · " : "") + (r.area || ""))));
        card.appendChild(head);

        const tags = el("div", "idea-tags");
        tags.appendChild(el("span", "tag", esc(r.cuisine)));
        card.appendChild(tags);

        if (r.desc) card.appendChild(el("p", null, esc(r.desc)));

        const actions = actionButtons(r);
        if (actions) card.appendChild(actions);
        grid.appendChild(card);
      });
  }

  /* ---------- info ---------- */

  function renderInfo() {
    const grid = $("#info-grid");
    (TRIP.info || []).forEach((i) => {
      const card = el("div", "idea-card");
      card.appendChild(el("h4", null, esc((i.icon ? i.icon + " " : "") + i.title)));
      card.appendChild(el("p", null, esc(i.desc)));
      grid.appendChild(card);
    });
  }

  /* ---------- section nav highlighting ---------- */

  function initNav() {
    const links = document.querySelectorAll(".section-nav a");
    const map = {};
    links.forEach((a) => (map[a.dataset.section] = a));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) => a.classList.remove("active"));
            map[e.target.id] && map[e.target.id].classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("main section").forEach((s) => obs.observe(s));
  }

  /* ---------- go ---------- */

  // If the trip is in progress, open on today's tab.
  const today = todayISO();
  const idx = TRIP.days.findIndex((d) => d.date === today);
  if (idx >= 0) activeDay = idx;

  renderHero();
  renderTabs();
  renderDay();
  renderFreeTime();
  renderFoodFilters();
  renderRestaurants();
  renderInfo();
  initNav();
})();
