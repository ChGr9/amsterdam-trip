/* ============================================================
   Renders the site from the TRIP object in data.js.
   You should not need to touch this file to update content.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  /* ---------- helpers ---------- */

  function mapsUrl(location) {
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(location);
  }

  function wazeUrl(location) {
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

  function link(className, href, label) {
    const a = el("a", className, label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  function actionButtons(item) {
    const wrap = el("div", "tl-actions");
    if (item.tickets) wrap.appendChild(link("btn btn-ticket", item.tickets, "🎟️ Tickets"));
    if (item.location) {
      wrap.appendChild(link("btn btn-maps", mapsUrl(item.location), "📍 Maps"));
      wrap.appendChild(link("btn btn-waze", wazeUrl(item.location), "🚗 Waze"));
    }
    if (item.url) wrap.appendChild(link("btn btn-site", item.url, "🌐 Website"));
    return wrap.childElementCount ? wrap : null;
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

  // Distance between two coordinates in km (haversine)
  function distKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function fmtDist(km) {
    return km < 1 ? Math.round(km * 1000) + " m" : km.toFixed(1) + " km";
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

      const actions = actionButtons(item) || el("div", "tl-actions");
      if (item.explore) {
        const b = el("button", "btn btn-explore", "🧭 Explore " + esc(item.explore) + " →");
        b.addEventListener("click", () => openExplore(item.explore));
        actions.appendChild(b);
      }
      if (actions.childElementCount) card.appendChild(actions);

      li.appendChild(card);
      tl.appendChild(li);
    });
    box.appendChild(tl);
  }

  /* ---------- explore ---------- */

  const PAGE_SIZE = 8;

  const state = {
    city: "All",
    kind: "All",
    category: "",
    price: "",
    search: "",
    sort: "name",
    radiusKm: "",
    page: 1,
    myPos: null       // {lat, lng} once located
  };

  const KINDS = [
    { key: "All", label: "Everything" },
    { key: "visit", label: "🏛️ Visit" },
    { key: "eat", label: "🍽️ Eat" }
  ];

  function cities() {
    return ["All", ...new Set(TRIP.places.map((p) => p.city))];
  }

  function chipRow(container, items, activeKey, onPick, labelOf) {
    const row = $(container);
    row.innerHTML = "";
    items.forEach((it) => {
      const key = typeof it === "string" ? it : it.key;
      const label = labelOf ? labelOf(it) : (typeof it === "string" ? it : it.label);
      const chip = el("button", "filter-chip" + (key === activeKey ? " active" : ""), esc(label));
      chip.addEventListener("click", () => onPick(key));
      row.appendChild(chip);
    });
  }

  function renderFilters() {
    chipRow("#city-filters", cities(), state.city, (c) => {
      state.city = c;
      state.category = "";
      state.page = 1;
      renderExplore();
    });

    chipRow("#kind-filters", KINDS, state.kind, (k) => {
      state.kind = k;
      state.category = "";
      state.page = 1;
      renderExplore();
    });

    // Category dropdown adapts to current city/kind selection
    const pool = TRIP.places.filter((p) =>
      (state.city === "All" || p.city === state.city) &&
      (state.kind === "All" || p.kind === state.kind));
    const cats = [...new Set(pool.map((p) => p.category))].sort();
    const sel = $("#category-select");
    sel.innerHTML = "<option value=\"\">All categories</option>" +
      cats.map((c) => "<option" + (c === state.category ? " selected" : "") + ">" + esc(c) + "</option>").join("");
  }

  function filteredPlaces() {
    let list = TRIP.places.slice();

    if (state.city !== "All") list = list.filter((p) => p.city === state.city);
    if (state.kind !== "All") list = list.filter((p) => p.kind === state.kind);
    if (state.category) list = list.filter((p) => p.category === state.category);
    if (state.price) list = list.filter((p) => (p.price || "") === state.price);

    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.desc, p.area, p.category, (p.tags || []).join(" ")]
          .join(" ").toLowerCase().includes(q));
    }

    // attach distance if located
    if (state.myPos) {
      list.forEach((p) => {
        p._dist = (p.lat != null) ?
          distKm(state.myPos.lat, state.myPos.lng, p.lat, p.lng) : null;
      });
      if (state.radiusKm) {
        list = list.filter((p) => p._dist != null && p._dist <= Number(state.radiusKm));
      }
    }

    const priceRank = (p) => (p.price || "").length || 99;
    if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (state.sort === "price") list.sort((a, b) => priceRank(a) - priceRank(b) || a.name.localeCompare(b.name));
    if (state.sort === "distance" && state.myPos) {
      list.sort((a, b) => (a._dist ?? Infinity) - (b._dist ?? Infinity));
    }

    return list;
  }

  function placeCard(p) {
    const card = el("div", "idea-card");
    const head = el("div", "idea-head");
    head.appendChild(el("h4", null,
      (p.kind === "eat" ? "🍽️ " : "🏛️ ") + esc(p.name)));
    const metaBits = [];
    if (p.price) metaBits.push(p.price);
    if (p.area) metaBits.push(p.area);
    head.appendChild(el("span", "idea-meta", esc(metaBits.join(" · "))));
    card.appendChild(head);

    const tags = el("div", "idea-tags");
    tags.appendChild(el("span", "tag tag-city", esc(p.city)));
    tags.appendChild(el("span", "tag", esc(p.category)));
    (p.tags || []).forEach((t) => tags.appendChild(el("span", "tag", esc(t))));
    if (state.myPos && p._dist != null) {
      tags.appendChild(el("span", "tag tag-dist", "📏 " + fmtDist(p._dist)));
    }
    card.appendChild(tags);

    if (p.desc) card.appendChild(el("p", null, esc(p.desc)));

    const actions = actionButtons(p);
    if (actions) card.appendChild(actions);
    return card;
  }

  function renderExplore() {
    renderFilters();

    const list = filteredPlaces();
    const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);

    $("#result-count").textContent = list.length
      ? list.length + " place" + (list.length === 1 ? "" : "s") +
        (pages > 1 ? " · page " + state.page + " of " + pages : "")
      : "Nothing matches those filters — loosen something.";

    const grid = $("#place-grid");
    grid.innerHTML = "";
    pageItems.forEach((p) => grid.appendChild(placeCard(p)));

    // pagination
    const pag = $("#pagination");
    pag.innerHTML = "";
    if (pages > 1) {
      const mk = (label, page, disabled, current) => {
        const b = el("button", "page-btn" + (current ? " active" : ""), label);
        b.disabled = !!disabled;
        b.addEventListener("click", () => {
          state.page = page;
          renderExplore();
          $("#explore").scrollIntoView({ behavior: "smooth" });
        });
        return b;
      };
      pag.appendChild(mk("‹", state.page - 1, state.page === 1));
      for (let i = 1; i <= pages; i++) pag.appendChild(mk(String(i), i, false, i === state.page));
      pag.appendChild(mk("›", state.page + 1, state.page === pages));
    }
  }

  // Jump to Explore pre-filtered to a city (from schedule buttons)
  function openExplore(city) {
    state.city = city;
    state.kind = "All";
    state.category = "";
    state.page = 1;
    renderExplore();
    $("#explore").scrollIntoView({ behavior: "smooth" });
  }

  function initExploreControls() {
    $("#search-box").addEventListener("input", (e) => {
      state.search = e.target.value.trim();
      state.page = 1;
      renderExplore();
    });
    $("#category-select").addEventListener("change", (e) => {
      state.category = e.target.value;
      state.page = 1;
      renderExplore();
    });
    $("#price-select").addEventListener("change", (e) => {
      state.price = e.target.value;
      state.page = 1;
      renderExplore();
    });
    $("#sort-select").addEventListener("change", (e) => {
      state.sort = e.target.value;
      if (state.sort === "distance" && !state.myPos) locate();
      renderExplore();
    });
    $("#radius-select").addEventListener("change", (e) => {
      state.radiusKm = e.target.value;
      state.page = 1;
      if (state.radiusKm && !state.myPos) locate();
      renderExplore();
    });
    $("#locate-btn").addEventListener("click", locate);
  }

  function locate() {
    const status = $("#locate-status");
    if (!navigator.geolocation) {
      status.textContent = "This device doesn't support location.";
      return;
    }
    status.textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.myPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        status.textContent = "📍 Location found — distances shown on each place.";
        $("#locate-btn").textContent = "📍 Update my location";
        renderExplore();
      },
      (err) => {
        status.textContent = err.code === 1
          ? "Location permission denied — allow it in your browser to use distances."
          : "Couldn't get your location — try again outside/near a window.";
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
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

  /* ---------- service worker (offline / PWA) ---------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  /* ---------- go ---------- */

  const today = todayISO();
  const idx = TRIP.days.findIndex((d) => d.date === today);
  if (idx >= 0) activeDay = idx;

  renderHero();
  renderTabs();
  renderDay();
  initExploreControls();
  renderExplore();
  renderInfo();
  initNav();
})();
