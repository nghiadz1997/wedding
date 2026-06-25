// =========================
// LOADING SCREEN
// =========================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.getElementById("loading-screen");
    if (loading) {
      loading.style.opacity = "0";

      setTimeout(() => {
        loading.style.display = "none";
      }, 800);
    }
  }, 2000);
});

// =========================
// OPEN INVITATION
// =========================
function openInvitation() {
  const envelope = document.getElementById("envelope-screen");
  const main = document.getElementById("main-content");

  if (envelope) {
    envelope.style.opacity = "0";
    envelope.style.transform = "scale(1.1)";

    setTimeout(() => {
      envelope.style.display = "none";
      main.classList.remove("hidden");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 1000,
          once: true
        });
      }
    }, 1000);
  }
}

// =========================
// MOBILE NAV
// =========================
function toggleNav() {
  const menu = document.querySelector("#navbar ul");
  if (menu) menu.classList.toggle("open");
}

// =========================
// NAVBAR SCROLL
// =========================
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");

  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// =========================
// COUNTDOWN
// =========================
function updateCountdown() {

  const targetDate = new Date(
    "2026-08-08T11:30:00"
  ).getTime();

  const now = new Date().getTime();

  const distance = targetDate - now;

  if (distance < 0) return;

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const mins = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const secs = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  const d = document.getElementById("cd-days");
  const h = document.getElementById("cd-hours");
  const m = document.getElementById("cd-mins");
  const s = document.getElementById("cd-secs");

  if (d) d.textContent = days;
  if (h) h.textContent = hours;
  if (m) m.textContent = mins;
  if (s) s.textContent = secs;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =========================
// CALENDAR
// =========================
function generateCalendar() {

  const grid =
    document.getElementById("calendar-grid");

  if (!grid) return;

  const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN"
  ];

  grid.innerHTML = "";

  days.forEach(day => {
    const el = document.createElement("div");
    el.className = "cal-day-name";
    el.textContent = day;
    grid.appendChild(el);
  });

  const firstDay = new Date(2026, 7, 1);
  const offset = (firstDay.getDay() + 6) % 7;

  for (let i = 0; i < offset; i++) {
    const blank = document.createElement("div");
    blank.className = "cal-day empty";
    grid.appendChild(blank);
  }

  for (let d = 1; d <= 31; d++) {

    const day = document.createElement("div");

    day.className = "cal-day";

    if (d === 8) {
      day.classList.add("wedding");
    }

    day.textContent = d;

    grid.appendChild(day);
  }
}

generateCalendar();

// =========================
// PETALS
// =========================
function createPetals(containerId) {

  const container =
    document.getElementById(containerId);

  if (!container) return;

  setInterval(() => {

    const petal =
      document.createElement("div");

    petal.className = "petal";

    petal.innerHTML = "🌸";

    petal.style.left =
      Math.random() * 100 + "%";

    petal.style.animationDuration =
      5 + Math.random() * 8 + "s";

    petal.style.fontSize =
      10 + Math.random() * 20 + "px";

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 15000);

  }, 500);
}

createPetals("petals-container");
createPetals("main-petals");

// =========================
// GALLERY
// =========================
const galleryImages = [
  "https://picsum.photos/600/800?1",
  "https://picsum.photos/600/900?2",
  "https://picsum.photos/600/700?3",
  "https://picsum.photos/600/850?4",
  "https://picsum.photos/600/750?5",
  "https://picsum.photos/600/950?6"
];

let currentIndex = 0;

function buildGallery() {

  const grid =
    document.getElementById("gallery-grid");

  if (!grid) return;

  galleryImages.forEach((src, index) => {

    const item =
      document.createElement("div");

    item.className = "gallery-item";

    item.innerHTML =
      `<img src="${src}" loading="lazy">`;

    item.onclick = () => {
      openLightbox(index);
    };

    grid.appendChild(item);
  });
}

function openLightbox(index) {

  currentIndex = index;

  document
    .getElementById("lightbox")
    .classList.add("open");

  document
    .getElementById("lb-img")
    .src = galleryImages[index];
}

function closeLightbox() {
  document
    .getElementById("lightbox")
    .classList.remove("open");
}

function prevPhoto(e) {
  e.stopPropagation();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }

  openLightbox(currentIndex);
}

function nextPhoto(e) {
  e.stopPropagation();

  currentIndex++;

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  openLightbox(currentIndex);
}

buildGallery();

// =========================
// RSVP
// =========================
function submitRSVP() {

  const name =
    document.getElementById("rsvp-name");

  if (!name.value.trim()) {
    alert("Vui lòng nhập họ tên");
    return;
  }

  document
    .getElementById("rsvp-success")
    .classList.remove("hidden");

  name.value = "";
  document.getElementById("rsvp-phone").value = "";
  document.getElementById("rsvp-message").value = "";
}

// =========================
// SAMPLE WISHES
// =========================
const wishes = [
  {
    name: "Nguyễn Văn A",
    text: "Chúc hai bạn trăm năm hạnh phúc."
  },
  {
    name: "Trần Thị B",
    text: "Chúc gia đình luôn bình an."
  },
  {
    name: "Lê Văn C",
    text: "Nguyện Chúa ban phước cho hai bạn."
  }
];

function renderWishes() {

  const grid =
    document.getElementById("wishes-grid");

  if (!grid) return;

  wishes.forEach(w => {

    const card =
      document.createElement("div");

    card.className = "wish-card";

    card.innerHTML = `
      <div class="wish-name">${w.name}</div>
      <div class="wish-text">${w.text}</div>
    `;

    grid.appendChild(card);
  });
}

renderWishes();