# Subscription Tracker

A full-stack web application for managing and tracking subscriptions with automated email reminders.

## 🚀 Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Subscription Management**: Add, view, update, and delete subscriptions
- **Automated Reminders**: Email notifications sent 7, 5, 2, and 1 day(s) before renewal
- **Multiple Categories**: Organize subscriptions by category (sports, entertainment, news, etc.)
- **Currency Support**: Supports USD, EUR, and GBP currencies
- **Payment Tracking**: Track different payment methods for each subscription
- **Renewal Management**: Automatic status updates for expired subscriptions
- **Security**: Rate limiting, bot detection, and security middleware with Arcjet
- **Responsive UI**: Modern React frontend with routing

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email functionality
- **Upstash Workflow** for scheduled reminders
- **Arcjet** for security and rate limiting
- **Day.js** for date manipulation

### Frontend
- **React 19** with React Router
- **Vite** for development and building
- **ESLint** for code quality

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Email service credentials (for sending reminders)
- Upstash account (for workflow management)
- Arcjet account (for security features)

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd subscription-tracker
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

### 4. Environment Configuration

Create environment files in the root directory:

#### `.env.development.local`
```env
# Server Configuration
PORT=3000
NODE_ENV=development
SERVER_URL=http://localhost:3000

# Database
DB_URI=mongodb://localhost:27017/subscription-tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Arcjet Security
ARCJET_ENV=development
ARCJET_KEY=your-arcjet-key

# Upstash Workflow
QSTASH_TOKEN=your-qstash-token
QSTASH_URL=your-qstash-url

# Email Configuration
EMAIL_PASSWORD=your-email-app-password
```

#### `.env.production.local` (for production)
```env
# Similar to development but with production values
NODE_ENV=production
# ... other production environment variables
```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server:**
```bash
npm run dev
```
The API will be available at `http://localhost:3000`

2. **Start the frontend development server:**
```bash
cd client
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Production Mode

1. **Build the frontend:**
```bash
cd client
npm run build
cd ..
```

2. **Start the production server:**
```bash
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

### Subscriptions
- `GET /api/v1/subscriptions` - Get user's subscriptions
- `POST /api/v1/subscriptions` - Create new subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription
- `GET /api/v1/subscriptions/upcoming` - Get upcoming renewals

### Workflows
- `POST /api/v1/workflows/subscription/reminder` - Trigger reminder workflow

## 🏗️ Project Structure

```
subscription-tracker/
├── app.js                          # Main server file
├── client/                         # React frontend
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── LoginPage.jsx           # Login page
│   │   ├── RegisterPage.jsx        # Registration page
│   │   ├── SubscriptionsPage.jsx   # Subscriptions list
│   │   ├── AddSubscriptionPage.jsx # Add subscription form
│   │   └── UpcomingRenewalsPage.jsx # Upcoming renewals
│   └── package.json
├── config/                         # Configuration files
│   ├── env.js                      # Environment variables
│   ├── arcjet.js                   # Security configuration
│   ├── nodemailer.js               # Email configuration
│   └── upstash.js                  # Workflow configuration
├── controllers/                    # Request handlers
│   ├── auth.controllers.js         # Authentication logic
│   ├── subscription.controllers.js # Subscription CRUD
│   ├── user.controllers.js         # User management
│   └── workflow.controllers.js     # Reminder workflows
├── database/
│   └── mongodb.js                  # Database connection
├── middleware/                     # Custom middleware
│   ├── auth.middleware.js          # JWT authentication
│   ├── arcjet.middleware.js        # Security middleware
│   └── error.middleware.js         # Error handling
├── models/                         # Database models
│   ├── user.model.js               # User schema
│   └── subscription.model.js       # Subscription schema
├── routes/                         # API routes
│   ├── auth.routes.js              # Auth endpoints
│   ├── subscription.routes.js      # Subscription endpoints
│   ├── user.routes.js              # User endpoints
│   └── workflow.routes.js          # Workflow endpoints
├── utils/                          # Utility functions
│   ├── email-template.js           # Email templates
│   └── send-email.js               # Email sending logic
└── package.json
```

## 📧 Email Reminders

The application automatically sends email reminders for upcoming subscription renewals:

- **7 days before** renewal
- **5 days before** renewal  
- **2 days before** renewal
- **1 day before** renewal

Email templates are customizable and include subscription details like name, price, renewal date, and payment method.

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with token bucket algorithm
- **Bot Detection**: Blocks malicious bots while allowing search engines
- **Input Validation**: Comprehensive validation for all user inputs
- **Password Hashing**: Secure password storage with bcryptjs
- **JWT Authentication**: Stateless authentication with secure tokens

## 🗃️ Database Schema

### User Model
- `name`: String (required, 2-50 characters)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 characters, hashed)
- `createdAt`, `updatedAt`: Timestamps

### Subscription Model
- `name`: String (required, 2-100 characters)
- `price`: Number (required, minimum 0)
- `currency`: Enum (USD, EUR, GBP)
- `frequency`: Enum (daily, weekly, monthly, yearly)
- `category`: Enum (sport, entertainment, news, lifestyle, technology, finance, politics, other)
- `paymentMethod`: String (required)
- `status`: Enum (active, cancelled, expired)
- `startDate`: Date (required, must be in past)
- `renewalDate`: Date (automatically calculated)
- `user`: ObjectId reference to User
- `createdAt`, `updatedAt`: Timestamps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure MongoDB is running
   - Check DB_URI in environment variables

2. **Email Reminders Not Working**
   - Verify email credentials in environment variables
   - Check Upstash workflow configuration

3. **Frontend Not Loading**
   - Ensure both frontend and backend servers are running
   - Check if ports 3000 and 5173 are available

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check if cookies are enabled in browser

## 🙋‍♂️ Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.
