# Hacker's Paradise Backend Server

A robust, scalable backend API for the Hacker's Paradise platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with refresh tokens
- **Security**: Rate limiting, CORS, XSS protection, input validation
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Centralized logging with Winston
- **Error Handling**: Comprehensive error handling and validation
- **File Upload**: Multer integration for file handling
- **Email Support**: Nodemailer integration for email notifications
- **Modular Architecture**: Clean MVC pattern with separation of concerns

## 📁 Project Structure

```
server/
├── config/           # Configuration files
│   └── database.js   # Database connection
├── controllers/      # Business logic
│   └── authController.js
├── middleware/       # Custom middleware
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/          # Mongoose schemas
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   ├── Bounty.js
│   └── Course.js
├── routes/          # Route definitions
│   ├── auth.js
│   ├── users.js
│   ├── posts.js
│   ├── comments.js
│   ├── bounties.js
│   └── courses.js
├── utils/           # Utility functions
│   ├── logger.js
│   ├── AppError.js
│   └── asyncWrapper.js
├── app.js           # Express app configuration
├── server.js        # Server entry point
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Logging**: Winston
- **Security**: helmet, cors, xss-clean, hpp
- **Rate Limiting**: express-rate-limit
- **File Upload**: Multer
- **Email**: Nodemailer

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hackers-paradise
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| POST | `/api/v1/auth/logout` | Logout user | Private |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | Public |
| GET | `/api/v1/auth/me` | Get current user | Private |
| POST | `/api/v1/auth/forgot-password` | Forgot password | Public |
| PATCH | `/api/v1/auth/reset-password/:token` | Reset password | Public |
| PATCH | `/api/v1/auth/update-password` | Update password | Private |

### User Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/users/profile` | Get user profile | Private |
| PUT | `/api/v1/users/profile` | Update user profile | Private |
| GET | `/api/v1/users/:id` | Get user by ID | Private |
| GET | `/api/v1/users` | Get all users | Admin/Moderator |
| PATCH | `/api/v1/users/:id/status` | Update user status | Admin/Moderator |

### Post Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/posts` | Get all posts | Public |
| GET | `/api/v1/posts/:slug` | Get post by slug | Public |
| POST | `/api/v1/posts` | Create post | Private |
| PUT | `/api/v1/posts/:id` | Update post | Private |
| DELETE | `/api/v1/posts/:id` | Delete post | Private |
| POST | `/api/v1/posts/:id/like` | Like/unlike post | Private |
| POST | `/api/v1/posts/:id/bookmark` | Bookmark post | Private |

### Comment Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/comments/post/:postId` | Get comments for post | Public |
| POST | `/api/v1/comments` | Create comment | Private |
| PUT | `/api/v1/comments/:id` | Update comment | Private |
| DELETE | `/api/v1/comments/:id` | Delete comment | Private |
| POST | `/api/v1/comments/:id/like` | Like/unlike comment | Private |
| GET | `/api/v1/comments/:id/replies` | Get comment replies | Private |

### Bounty Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/bounties` | Get all bounties | Public |
| GET | `/api/v1/bounties/:id` | Get bounty by ID | Public |
| POST | `/api/v1/bounties` | Create bounty | Private |
| PUT | `/api/v1/bounties/:id` | Update bounty | Private |
| DELETE | `/api/v1/bounties/:id` | Delete bounty | Private |
| POST | `/api/v1/bounties/:id/bookmark` | Bookmark bounty | Private |
| POST | `/api/v1/bounties/:id/assign` | Assign bounty | Private |
| POST | `/api/v1/bounties/:id/submit` | Submit solution | Private |
| GET | `/api/v1/bounties/:id/submissions` | Get submissions | Private |

### Course Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/courses` | Get all courses | Public |
| GET | `/api/v1/courses/:slug` | Get course by slug | Public |
| POST | `/api/v1/courses` | Create course | Private |
| PUT | `/api/v1/courses/:id` | Update course | Private |
| DELETE | `/api/v1/courses/:id` | Delete course | Private |
| POST | `/api/v1/courses/:id/enroll` | Enroll in course | Private |
| GET | `/api/v1/courses/:id/progress` | Get progress | Private |
| POST | `/api/v1/courses/:id/lessons/:lessonId/complete` | Complete lesson | Private |
| POST | `/api/v1/courses/:id/rate` | Rate course | Private |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication with the following features:

- **Access Token**: Short-lived (15 minutes) for API access
- **Refresh Token**: Long-lived (7 days) for token renewal
- **HTTP-only Cookies**: Secure token storage
- **Token Rotation**: Refresh tokens are rotated on each use

### Request Format

Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

Or use cookies (automatically handled by the browser):
```
Cookie: accessToken=<access_token>; refreshToken=<refresh_token>
```

## 🛡️ Security Features

- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **XSS Protection**: Input sanitization
- **SQL Injection Protection**: Mongoose validation
- **Password Hashing**: bcryptjs with configurable rounds
- **JWT Security**: Secure token handling

## 📊 Database Models

### User Model
- Authentication fields (email, password, tokens)
- Profile information (name, bio, avatar)
- Skills and experience
- Social links and preferences
- Statistics and achievements

### Post Model
- Content management (title, content, excerpt)
- Categories and tags
- Engagement metrics (views, likes, bookmarks)
- SEO fields
- Moderation support

### Comment Model
- Nested comments support
- Engagement tracking
- Moderation features
- Soft delete functionality

### Bounty Model
- Bug bounty management
- Reward system
- Submission tracking
- Assignment and completion workflow

### Course Model
- Learning management
- Lesson structure
- Progress tracking
- Certificate generation
- Rating and review system

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Logging

The application uses Winston for centralized logging:

- **Console**: Development environment
- **File**: Production environment
- **Error Logs**: Separate error log file
- **Request Logs**: HTTP request logging with Morgan

## 🚀 Deployment

### Environment Variables

Required environment variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
COOKIE_SECRET=your-cookie-secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=https://yourdomain.com
```

### Production Checklist

- [ ] Set NODE_ENV to production
- [ ] Configure MongoDB connection string
- [ ] Set secure JWT secrets
- [ ] Configure CORS origins
- [ ] Set up SSL/TLS certificates
- [ ] Configure logging
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- Authentication system
- User management
- Post and comment system
- Bounty management
- Course system
- Security middleware
- Error handling
- Logging system 