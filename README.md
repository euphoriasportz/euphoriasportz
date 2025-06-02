# 🏆 EuphoriaSportz

A simple full-stack web application built with React (frontend) and Node.js/Express (backend).

## Features

- **Frontend**: Modern React app with beautiful UI
  - User management display
  - Sports catalog
  - Contact form with backend integration
  - Responsive design with glassmorphism effects

- **Backend**: RESTful API with Express.js
  - User management endpoints
  - Sports data endpoints
  - Contact form handling with validation
  - CORS enabled for frontend communication

## Project Structure

```
euphoriasportz/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.jsx    # Main React component
│   │   ├── App.css    # Styling
│   │   └── ...
│   └── package.json
├── backend/           # Node.js/Express API
│   ├── server.js      # Main server file
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd euphoriasportz
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The API server will start on `http://localhost:3001`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The React app will start on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users
- `GET /api/sports` - Get all sports
- `POST /api/contact` - Submit contact form

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern effects

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## Development Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-restart)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
