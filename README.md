# Interview Experience Platform

A responsive web application built with React.js and Node.js that allows users to share and view their interview experiences. The platform includes user authentication, dark mode support, and CRUD operations for managing interview submissions.

## Features

- 🔐 User Authentication (Register/Login)
- 🌓 Dark/Light Mode Toggle
- 📝 Interview Experience Submission
- 👀 View Interview Experiences
- 🔍 Search & Filter Functionality
- 📱 Responsive Design
- 🔒 Protected Routes
- ⚡ Real-time Form Validation

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)
- Framer Motion (Animations)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd interview-platform
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

## Project Structure

```
interview-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes for authenticated users
- Form validation for registration

### Interview Experience Submission
- Multi-field form for experience details
- Dynamic question fields
- Real-time validation
- Secure submission handling

### Experience Viewing
- Responsive card layout
- Search functionality
- Expandable view for details
- Filtering options

### UI/UX
- Dark/Light mode toggle
- Smooth transitions
- Mobile-responsive design
- Loading states
- Error handling

## API Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/interviews` - Get all interviews
- POST `/api/interviews` - Submit new interview
- PUT `/api/interviews/:id` - Update interview
- DELETE `/api/interviews/:id` - Delete interview

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [mirza.devs@gmail.com] or open an issue in the repository.