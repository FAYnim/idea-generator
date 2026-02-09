# Idea Generator

A powerful web-based AI application that generates creative ideas based on your topics using Google Gemini AI. Built with modern web technologies and designed for seamless brainstorming and idea management.

## 📋 Description

Idea Generator is a client-side web application that leverages artificial intelligence to help users brainstorm and generate creative ideas on any topic. Whether you're looking for business concepts, technological innovations, educational content, or creative projects, this application provides structured, thoughtful ideas powered by Google's Gemini AI model.

The application features a clean, responsive interface with three main sections:
- **Dashboard**: Generate new ideas and view statistics
- **History**: Manage and organize your saved ideas
- **Settings**: Customize your experience

All data is stored locally in your browser using localStorage, ensuring privacy and offline access to your ideas.

## ✨ Key Features

### Idea Generation
- AI-powered idea generation using Google Gemini
- Structured output with 5 key sections:
  - Basic Concept
  - Development Potential
  - Target Users
  - Next Steps
  - Conclusion
- Quick copy functionality
- Manual or auto-save options

### Dashboard
- Real-time statistics overview
- Total ideas count
- Today's ideas tracking
- Category analysis
- Recent history preview
- Quick actions (generate, copy, save, reset)

### History Management
- Comprehensive idea history
- Search functionality
- Date-based filtering (today, week, month)
- Sort by newest or oldest
- View details in modal
- Delete individual or all items
- Export to JSON or CSV format

### Settings & Customization
- Language support (Indonesian/English)
- Theme options (light/dark/auto)
- Output format preferences
- Auto-save toggle
- Notification settings
- Data import/export
- Keyboard shortcuts:
  - `Ctrl + Enter`: Generate
  - `Ctrl + C`: Copy
  - `Ctrl + R`: Reset

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic markup with Indonesian language support
- **CSS3**: Custom styling with CSS variables
- **Bootstrap 5.3.2**: CSS framework for responsive design
- **Font Awesome 6.5.1**: Icon library
- **Vanilla JavaScript**: No framework overhead

### Backend/API
- **Node.js**: JavaScript runtime environment
- **Axios**: HTTP client for API requests
- **Dotenv**: Environment variable management
- **Google Gemini API**: AI-powered idea generation

### Storage & Data
- **localStorage**: Client-side data persistence
- **JSON**: Data format for import/export
- **CSV**: Spreadsheet-compatible export

### Development
- **npm**: Package manager
- **Git**: Version control
- **GitHub**: Repository hosting

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Google Gemini API Key

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/FAYnim/idea-generator.git
   cd idea-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Get your API key from [Google AI Studio](https://aistudio.google.com/)

4. **Run the Application**

   For **web interface** (recommended):
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     npx serve .
     ```

   For **CLI version**:
   ```bash
   node app.js
   ```

5. **Access the Application**
   - Open your browser and navigate to:
     ```
     http://localhost:3000
     ```
   - Or simply open the `index.html` file directly

## 📁 Project Structure

```
idea-generator/
├── .env                          # Environment variables (API keys)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── app.js                        # Node.js CLI application
├── index.html                    # Dashboard page (main entry)
├── riwayat.html                  # History management page
├── pengaturan.html               # Settings page
├── package.json                  # NPM package configuration
├── package-lock.json             # NPM dependency lock file
├── README.md                     # Project documentation
└ ├── css/
   ── src/
    │   └── style.css             # Custom application styles
    └── js/
        ├── script.js             # Dashboard functionality
        ├── riwayat.js            # History management logic
        └── pengaturan.js         # Settings management logic
```

### File Descriptions

- **index.html**: Main dashboard with idea generation form, statistics, and recent history
- **riwayat.html**: History page for viewing, searching, filtering, and managing all saved ideas
- **pengaturan.html**: Settings page for customization, data management, and application preferences
- **app.js**: Node.js CLI version that provides command-line interface for idea generation
- **src/js/script.js**: Dashboard logic including idea generation, stats update, and history rendering
- **src/js/riwayat.js**: History management logic including search, filter, sort, and export functions
- **src/js/pengaturan.js**: Settings management for preferences, data import/export, and storage

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### Getting a Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Add it to your `.env` file

### Local Storage Data

The application stores the following data in localStorage:

- `ideaHistory`: Array of all saved ideas with topic, output, timestamp
- `ideaGeneratorSettings`: User preferences (language, theme, format, auto-save, notifications)
- `ideaGeneratorCreated`: Application creation date

## 🎨 Theme Customization

The application supports three theme modes:

1. **Light Mode** (`light`): Clean white background with blue accents
2. **Dark Mode** (`dark`): Dark background for low-light environments
3. **Auto Mode** (`auto`): Follows system preference

To customize further, edit `src/css/style.css`:

```css
/* Sidebar color */
.sidebar {
  background: #0d6efd; /* Change this hex color */
}

/* Primary button color */
.btn-primary {
  background-color: #0d6efd; /* Change this hex color */
}
```

## 🔐 Security Considerations

- **API Key**: Never commit your `.env` file with real API keys
- **Local Storage**: Data is stored locally in the browser, not sent to external servers (except for AI generation)
- **Input Sanitization**: All user inputs are escaped to prevent XSS attacks
- **CORS**: API calls are made directly to Google's servers

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Google AI](https://ai.google/) for providing the Gemini API
- [Bootstrap](https://getbootstrap.com/) for the CSS framework
- [Font Awesome](https://fontawesome.com/) for the icon library
- [Axios](https://axios-http.com/) for HTTP requests
- [Node.js](https://nodejs.org/) for the runtime environment

---

**Version**: 1.0.0
**Last Updated**: February 2026
**Author**: [FAYnim](https://faydev.my.id)
