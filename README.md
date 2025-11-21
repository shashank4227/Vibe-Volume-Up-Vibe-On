# 🎵 Vibe - Volume Up, Vibe On

A modern music streaming platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Discover, stream, and organize your favorite music with a beautiful, responsive interface.

## ✨ Features

- **Modern UI/UX**: Built with React and Tailwind CSS for a beautiful, responsive design
- **Music Discovery**: Browse songs by genre, search functionality, and featured content
- **Personal Library**: Create playlists, view listening history, and manage your music
- **User Authentication**: Secure login and registration system
- **RESTful API**: Robust backend with Express.js and MongoDB
- **Production Ready**: Configured for deployment on Vercel (frontend) and Render (backend)

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📁 Project Structure

```
vibe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── config/         # Configuration files
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── package.json
└── package.json            # Root package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibe
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Environment Setup**
   
   **Backend (.env in server/ directory):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vibe
   NODE_ENV=development
   ```

   **Frontend (.env in client/ directory):**
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🎯 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server
- `npm run setup` - Install all dependencies

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run build` - Build for production

### Frontend (client/)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Songs
- `GET /api/songs` - Get all songs (with pagination, search, genre filter)
- `GET /api/songs/:id` - Get single song
- `POST /api/songs` - Create new song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song

### Query Parameters for GET /api/songs
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `genre` - Filter by genre
- `search` - Search in title, artist, or album

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. **Important**: In Vercel project settings, set the **Root Directory** to `client`
3. Vercel will auto-detect Vite, but you can verify:
   - Build Command: `npm run build` (or leave empty for auto-detect)
   - Output Directory: `dist` (or leave empty for auto-detect)
   - Install Command: `npm install` (or leave empty for auto-detect)
4. **Add environment variable**:
   - `VITE_API_BASE_URL` = `https://your-backend-url.com` (your Render backend URL)
5. Deploy!

**Note**: The `vercel.json` file in the `client/` directory handles SPA routing for React Router.

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-connection-string`

## 🎨 Pages & Features

### Home Page
- Hero section with call-to-action
- Featured songs showcase
- Genre browsing
- Modern gradient design

### Explore Page
- Search functionality
- Genre filtering
- Song grid with play controls
- Pagination support

### Library Page
- Personal playlists
- Recently played songs
- Liked songs collection
- Playlist management

### Login Page
- User authentication
- Social login options
- Responsive design
- Form validation

## 🔧 Development

### Adding New Features
1. Create components in `client/src/components/`
2. Add pages in `client/src/pages/`
3. Create API routes in `server/routes/`
4. Add models in `server/models/`

### Styling
- Uses Tailwind CSS utility classes
- Custom components in `client/src/index.css`
- Responsive design with mobile-first approach

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Vibe** - Volume Up, Vibe On! 🎵
