document.addEventListener("DOMContentLoaded", function(){

  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodNote = document.querySelector("#moodNote");
  const saveBtn = document.querySelector("#saveBtn");
  const entriesList = document.querySelector("#entriesList");
  
  const happyCount = document.querySelector("#happyCount");
  const sadCount = document.querySelector("#sadCount");
  const neutralCount = document.querySelector("#neutralCount");
  const stressedCount = document.querySelector("#stressedCount");
  const tiredCount = document.querySelector("#tiredCount");

  let selectedMood = null;
  let moodEntries = [];

  loadEntries();  // ← UNCOMMENTED

  moodButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      selectMood(button);
    });
  });

  saveBtn.addEventListener("click", function() {
    saveMoodEntry();
  });

  // ===== ALL FUNCTIONS AT TOP LEVEL =====

  function selectMood(button) {
    moodButtons.forEach(function(btn) {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
    selectedMood = button.dataset.mood;
    saveBtn.disabled = false;
  }

  function saveMoodEntry() {
    let note = moodNote.value.trim();

    let entry = {
      mood: selectedMood,
      note: note,
      date: new Date().toISOString(),
      id: Date.now()
    };

    moodEntries.unshift(entry);
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
    
    displayEntries();
    updateSummary();
    resetForm();
  }

  function displayEntries() {
    entriesList.innerHTML = "";

    if (moodEntries.length === 0) {
      entriesList.innerHTML = '<p class="no-entries">No entries yet. Log your first mood!</p>';
      return;
    }

    moodEntries.forEach(function(entry) {
      let entryCard = document.createElement("div");
      entryCard.className = `entry-card ${entry.mood}`;

      let emoji = getMoodEmoji(entry.mood);
      let formattedDate = formatDate(entry.date);

      entryCard.innerHTML = `
        <div class="entry-header">
          <div class="entry-mood">
            <span class="emoji">${emoji}</span>
            <span>${capitalizeFirst(entry.mood)}</span>
          </div>
        </div>
        ${entry.note ? `<p class="entry-note">${entry.note}</p>` : ''}
        <small class="entry-date">${formattedDate}</small>
        <button class="delete-btn" data-id="${entry.id}">Delete</button>
      `;

      let deleteBtn = entryCard.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        deleteEntry(entry.id);
      });
      
      entriesList.appendChild(entryCard);
    });
  }  // ← displayEntries ENDS HERE

  function updateSummary() {  // ← OUTSIDE displayEntries
    let counts = {
      happy: 0,
      sad: 0,
      neutral: 0,
      stressed: 0,
      tired: 0
    };
    
    moodEntries.forEach(function(entry) {
      counts[entry.mood]++;
    });

    happyCount.textContent = counts.happy;
    sadCount.textContent = counts.sad;
    neutralCount.textContent = counts.neutral;
    stressedCount.textContent = counts.stressed;
    tiredCount.textContent = counts.tired;
  }

  function deleteEntry(id) {
    moodEntries = moodEntries.filter(function(entry) {
      return entry.id !== id;  // ← FIXED: !== instead of !=
    });

    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
    displayEntries();
    updateSummary();
  }

  function loadEntries() {
    let savedData = localStorage.getItem("moodEntries");

    if (savedData) {
      try {
        moodEntries = JSON.parse(savedData);
        displayEntries();
        updateSummary();
      } catch (error) {
        console.log("Error loading entries:", error);
        moodEntries = [];
      }
    }
  }

  function resetForm() {
    moodButtons.forEach(function(btn) {
      btn.classList.remove("selected");
    });
    moodNote.value = "";
    selectedMood = null;  // ← FIXED: was selectMood (typo)
    saveBtn.disabled = true;
  }

  function getMoodEmoji(mood) {
    let emojis = {
      happy: "😊",
      sad: "😢",
      neutral: "😐",
      stressed: "😰",
      tired: "😴"
    };
    return emojis[mood];
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function formatDate(dateString) {
    let date = new Date(dateString);

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  }

}); 