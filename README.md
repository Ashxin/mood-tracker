# 😊 Mood Tracker

A clean, intuitive mood tracking web application that helps users log and monitor their daily emotional state. Built with vanilla JavaScript to practice fundamental web development concepts.

![Mood Tracker Preview]
<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/9e41c6a0-82f0-4cbd-8fd4-181f93f23f91" />


## 🚀 Features

- **5 Mood Options**: Track Happy, Sad, Neutral, Stressed, and Tired states
- **Optional Notes**: Add context to each mood entry
- **Mood History**: View all past entries with timestamps
- **Statistics Dashboard**: See mood frequency at a glance
- **Persistent Storage**: Data saved using localStorage API
- **Delete Entries**: Remove individual mood logs
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Flexbox layout, transitions, responsive design
- **JavaScript (ES6)**: 
  - Array methods (forEach, filter, unshift)
  - Template literals
  - localStorage API
  - DOM manipulation
  - Event handling

## 📂 Project Structure
```
mood-tracker/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── app.js              # Application logic
└── README.md           # Documentation
```

## 💡 How to Use

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Select a mood** by clicking one of the 5 emotion buttons
4. **Add a note** (optional) to describe why you feel this way
5. **Click "Save Mood Entry"** to log your mood
6. **View your history** in the section below
7. **Track patterns** using the mood summary statistics

## 🎯 What I Learned

This project helped me practice and understand:

- **Working with Arrays**: Storing and managing multiple data entries
- **Array Methods**: 
  - `forEach()` for iteration
  - `filter()` for deletion
  - `unshift()` for adding to array start
- **localStorage API**: Persisting data across browser sessions
- **JSON Methods**: `stringify()` and `parse()` for data conversion
- **Dynamic HTML**: Creating elements with `createElement()` and `appendChild()`
- **Template Literals**: Clean, readable string interpolation
- **Data Attributes**: Using `data-*` attributes for storing element metadata
- **Event Delegation**: Handling events on dynamically created elements
- **State Management**: Tracking application state with variables

## 🔧 Key Code Concepts

### Saving Mood Entries
```javascript
// Create entry object with current timestamp
let entry = {
    mood: selectedMood,
    note: note,
    date: new Date().toISOString(),
    id: Date.now()
};

// Add to beginning of array (newest first)
moodEntries.unshift(entry);

// Save to localStorage
localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
```

### Filtering for Deletion
```javascript
// Remove entry with matching ID
moodEntries = moodEntries.filter(function(entry) {
    return entry.id !== id;
});
```

### Dynamic HTML Generation
```javascript
// Loop through entries and create cards
moodEntries.forEach(function(entry) {
    let entryCard = document.createElement("div");
    entryCard.innerHTML = `
        <span>${emoji} ${mood}</span>
        <p>${note}</p>
        <button data-id="${entry.id}">Delete</button>
    `;
    entriesList.appendChild(entryCard);
});
```

## 🌟 Future Enhancements

- [ ] Add mood charts/graphs for visual trends
- [ ] Export data to CSV or JSON
- [ ] Filter entries by date range
- [ ] Add mood streaks tracking
- [ ] Implement mood reminders/notifications
- [ ] Dark mode toggle
- [ ] Cloud sync across devices

## 📸 Screenshots

<img width="1901" height="921" alt="image" src="https://github.com/user-attachments/assets/1584127b-d207-4f6d-94ba-c203bf85cb41" />

- Main interface with mood selection
- Filled mood history
- Statistics summary

## 🤝 Contributing

This is a learning project, but feedback is welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Your Name**
- GitHub: [@Ashxin](https://github.com/Ashxin)
- LinkedIn: https://www.linkedin.com/in/aswin-kumar-b-student/

---

⭐ If you found this project helpful, please consider giving it a star!
