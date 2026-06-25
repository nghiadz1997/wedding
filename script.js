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
  const music = document.getElementById("bg-music");

  if (music) {
    music.volume = 0;
    music.play().catch(() => {});

    let volume = 0;
    const fadeMusic = setInterval(() => {
      volume += 0.05;
      if (volume >= 0.4) {
        music.volume = 0.4;
        clearInterval(fadeMusic);
      } else {
        music.volume = volume;
      }
    }, 200);
  }

  if (envelope) {
    envelope.style.opacity = "0";
    envelope.style.transform = "scale(1.1)";

    setTimeout(() => {
      envelope.style.display = "none";

      if (main) {
        main.classList.remove("hidden");
      }

      window.scrollTo({ top: 0, behavior: "smooth" });

      if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1000, once: true });
      }
    }, 1000);
  }
}

// =========================
// MOBILE NAV
// =========================
function toggleNav() {
  const menu = document.querySelector("#navbar ul");
  if (menu) {
    menu.classList.toggle("open");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.querySelector("#navbar ul");
      if (menu) {
        menu.classList.remove("open");
      }
    });
  });
});

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
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  // Nếu không có các thẻ này trên trang, dừng chạy để tránh báo lỗi
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date("2026-08-08T11:30:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minsEl.textContent = String(mins).padStart(2, "0");
  secsEl.textContent = String(secs).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =========================
// CALENDAR
// =========================
function generateCalendar() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  grid.innerHTML = "";

  const header = document.createElement("div");
  header.className = "cal-header";
  header.textContent = "THÁNG 08 / 2026";
  grid.appendChild(header);

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
  const container = document.getElementById(containerId);
  if (!container) return;

  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerHTML = "🌸";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.fontSize = 10 + Math.random() * 15 + "px";
    petal.style.animationDuration = 5 + Math.random() * 8 + "s";

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 15000);
  }, window.innerWidth < 768 ? 1200 : 500);
}

createPetals("petals-container");
createPetals("main-petals");

// =========================
// GALLERY
// =========================
const galleryImages = [
  "img/6.jpg",
  "img/4.jpg",
  "img/5.jpg"
];

let currentIndex = 0;

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  galleryImages.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${src}" loading="lazy">`;
    item.onclick = () => openLightbox(index);
    grid.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  
  if (lightbox && lbImg) {
    lightbox.classList.add("open");
    lbImg.src = galleryImages[index];
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("open");
  }
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
// MUSIC
// =========================
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.innerHTML = "🔊";
    } else {
      bgMusic.pause();
      musicBtn.innerHTML = "🔇";
    }
  });
}

// =========================
// RSVP
// =========================
function submitRSVP() {
  const name = document.getElementById("rsvp-name");
  const successMsg = document.getElementById("rsvp-success");

  if (!name) return; // Tránh lỗi null nếu thẻ input không tồn tại

  if (!name.value.trim()) {
    alert("Vui lòng nhập họ tên");
    return;
  }

  if (successMsg) {
    successMsg.classList.remove("hidden");
  }
}

// =========================
// WISHES
// =========================
const wishes = [
  {
    name: "Nguyễn Trọng Nghĩa ( Em Trai )",
    text: "Chúc anh chị trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau."
  },
  {
    name: "Nguyễn Thúy Vy ( Chị Gái )",
    text: "Chúc hai em xây dựng gia đình viên mãn, hạnh phúc và đầy phước hạnh."
  },
  {
    name: "Phạm Ngọc Sanh ( Em Trai )",
    text: "Chúc anh chị sớm sinh quý tử, gia đình luôn bình an và sung túc."
  }
];

function renderWishes() {
  const grid = document.getElementById("wishes-grid");
  if (!grid) return;

  wishes.forEach(w => {
    const card = document.createElement("div");
    card.className = "wish-card";
    card.innerHTML = `
      <div class="wish-name">${w.name}</div>
      <div class="wish-text">${w.text}</div>
    `;
    grid.appendChild(card);
  });
}

renderWishes();