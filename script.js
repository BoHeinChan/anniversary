const siteConfig = {
  partnerName: "ကလေးလေး",
  startDate: "2026-02-07T00:00:00+06:30",
  startDateLabel: "February 7, 2026",
  memories: [
    {
      title: "ပထမဆုံးနေ့",
      text: "စကားစပြောဖြစ်တဲ့နေ့ကစပြီး အရာအားလုံးက ပိုလှလာတယ်။",
      image:
        'images/photo1.jpg',
    },
    {
      title: "အပြုံးလေးတွေ",
      text: "ကလေးလေးရဲ့အပြုံးလေးက လူကြီးတို့နေ့တိုင်းကို ပိုပျော်စေတယ်။",
      image:
        'images/photo2.jpg',
    },
    {
      title: "နောက်ထပ်ခရီး",
      text: "လာမယ့်နေ့တွေကိုလည်း ကလေးလေးနဲ့အတူတူ ဖြတ်သန်းချင်တယ်။",
      image:
        'images/photo3.jpg',
    },
  ],
};

const partnerName = document.querySelector("#partnerName");
const startDateLabel = document.querySelector("#startDateLabel");
const timeTogether = document.querySelector("#timeTogether");
const memoryGrid = document.querySelector("#memoryGrid");
const surpriseButton = document.querySelector("#surpriseButton");
const surpriseModal = document.querySelector("#surpriseModal");
const closeModal = document.querySelector("#closeModal");

partnerName.textContent = siteConfig.partnerName;
startDateLabel.textContent = siteConfig.startDateLabel;

function renderMemories() {
  memoryGrid.innerHTML = siteConfig.memories
    .map(
      (memory) => `
        <article class="memory-card" style="--photo: url('${memory.image}')">
          <h3>${memory.title}</h3>
          <p>${memory.text}</p>
        </article>
      `,
    )
    .join("");
}

function updateTimer() {
  const start = new Date(siteConfig.startDate).getTime();
  const now = Date.now();
  const diff = Math.max(now - start, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const values = [days, hours, minutes, seconds];
  timeTogether.querySelectorAll("strong").forEach((element, index) => {
    element.textContent = values[index].toLocaleString("en-US");
  });
}

function openModal() {
  surpriseModal.classList.add("is-open");
  surpriseModal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  surpriseModal.classList.remove("is-open");
  surpriseModal.setAttribute("aria-hidden", "true");
}

renderMemories();
updateTimer();
setInterval(updateTimer, 1000);

surpriseButton.addEventListener("click", openModal);
closeModal.addEventListener("click", hideModal);
surpriseModal.addEventListener("click", (event) => {
  if (event.target === surpriseModal) {
    hideModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideModal();
  }
});
