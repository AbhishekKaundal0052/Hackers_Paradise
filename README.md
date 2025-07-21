# Hacker's Paradise Platform

A comprehensive full-stack web application for cybersecurity professionals, hackers, and tech enthusiasts. Built with modern technologies and best practices.

## 🚀 Project Overview

Hacker's Paradise is a platform that combines:
- **Learning Management**: Interactive courses and tutorials
- **Bug Bounty Platform**: Security challenges and rewards
- **Community Hub**: Blog, forums, and networking
- **Portfolio Showcase**: Professional profiles and achievements

## 📁 Project Structure

```
Hacker's Paradise/
├── client/           # Frontend (Next.js)
│   ├── src/
│   │   ├── app/      # Next.js app router
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   └── package.json
├── server/           # Backend (Node.js/Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit/core

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT with refresh tokens
- **Validation**: express-validator
- **Security**: helmet, cors, rate limiting
- **Logging**: Winston
- **File Upload**: Multer

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **API will be available at**
   ```
   http://localhost:5000
   ```

## 📚 Features

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- Role-based access control (User, Moderator, Admin)
- Password reset functionality
- Email verification (ready for implementation)
- Rate limiting and security middleware

### 👥 User Management
- User registration and profiles
- Skills and experience tracking
- Social links and portfolio
- Achievement system
- Activity timeline

### 📝 Content Management
- Blog posts and articles
- Nested comments system
- Tags and categories
- Search and filtering
- SEO optimization

### 🎯 Bug Bounty Platform
- Security challenges and bounties
- Reward system with multiple currencies
- Submission tracking and review
- Assignment and completion workflow
- Difficulty levels and categories

### 📚 Learning Platform
- Interactive courses and lessons
- Progress tracking and certificates
- Multiple lesson types (video, text, interactive)
- Quiz and assessment system
- Course ratings and reviews

### 🎨 Modern UI/UX
- Responsive design
- Dark/light theme support
- Smooth animations
- Accessibility features
- Mobile-first approach

## 🔧 Development

### Frontend Development
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd server
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

### Database
The application uses MongoDB. Make sure you have:
- MongoDB installed locally, or
- MongoDB Atlas cloud database

Update the connection string in `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/hackers-paradise
```

## 🛡️ Security Features

- **Authentication**: JWT with refresh token rotation
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive validation with express-validator
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configurable cross-origin resource sharing
- **XSS Protection**: Input sanitization
- **Password Security**: bcryptjs hashing
- **Security Headers**: Helmet middleware

## 📊 API Documentation

The backend provides a comprehensive REST API with the following endpoints:

- **Authentication**: `/api/v1/auth/*`
- **Users**: `/api/v1/users/*`
- **Posts**: `/api/v1/posts/*`
- **Comments**: `/api/v1/comments/*`
- **Bounties**: `/api/v1/bounties/*`
- **Courses**: `/api/v1/courses/*`

For detailed API documentation, see [server/README.md](server/README.md).

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any static hosting service

### Backend Deployment
The backend can be deployed to:
- Heroku
- AWS EC2
- Google Cloud Platform
- DigitalOcean
- Railway

### Environment Variables
Make sure to set up all required environment variables for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each directory
- Contact the development team

## 🔄 Version History

- **v1.0.0**: Initial release
  - Complete authentication system
  - User management and profiles
  - Blog and comment system
  - Bug bounty platform
  - Learning management system
  - Modern responsive UI
  - Comprehensive security features

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible component primitives
- MongoDB and Mongoose for the database solution
- All contributors and supporters

---

**Built with ❤️ for the cybersecurity community**
