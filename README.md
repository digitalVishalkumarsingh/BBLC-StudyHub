<div align="center">

# 📚 BBLC StudyHub

### Baba Bamokhar Library Centre — Study Hub Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://bblc-studyhub.vercel.app)

🔗 **Live Demo:** [https://bblc-studyhub.vercel.app](https://bblc-studyhub.vercel.app)

*A full-stack digital platform for managing library seat bookings, attendance, fee payments, and member records.*

</div>

---

## ✨ Features

### 👤 User Portal
- **Registration & Login** — Secure JWT-based authentication with bcrypt password hashing
- **Seat Booking** — Online registration with admission fee payment via Razorpay
- **Monthly Fee Payment** — Pay monthly library fees online with instant email confirmation
- **Attendance Tracking** — View personal attendance history in real time
- **Fee History** — Track all past payments (admission + monthly)
- **Email Notifications** — Auto-confirmation emails on every successful payment

### 🛡️ Admin Portal
- **Dashboard** — Live stats: total users, active subscriptions, expired users, total earnings
- **User Management** — View, search, and manage all registered members
- **Payment Records** — Complete admission and monthly fee payment history
- **Attendance Management** — Mark and review attendance for all users
- **Secure Admin Login** — Separate admin authentication system

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | JWT + bcryptjs |
| **Payments** | Razorpay |
| **Email** | Nodemailer (Gmail SMTP) |
| **UI Components** | Headless UI, Heroicons, Lucide, Swiper |
| **PDF** | jsPDF (receipt generation) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18.x`
- MongoDB Atlas account
- Razorpay account (test or live)
- Gmail account with App Password enabled

### 1. Clone the repository
```bash
git clone https://github.com/digitalVishalkumarsingh/BBLC-StudyHub.git
cd BBLC-StudyHub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bblc-library

# JWT
JWT_SECRET=your_strong_jwt_secret_here

# Gmail (Nodemailer)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
BBLC-StudyHub/
├── src/app/
│   ├── page.tsx                  # Home
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── service/                  # Services page
│   ├── login/                    # User login
│   ├── register/                 # User registration
│   ├── user/                     # Protected user portal
│   │   └── dashboard/            # User dashboard
│   ├── admin/                    # Protected admin portal
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── users/                # Manage users
│   │   ├── allpayments/          # Payment records
│   │   ├── attendance/           # Attendance management
│   │   └── monthly-fees/         # Monthly fee records
│   ├── api/                      # Next.js API routes
│   │   ├── auth/                 # Register & Login
│   │   ├── admin/                # Admin APIs
│   │   ├── fees/                 # Admission fee orders
│   │   ├── monthly-fee/          # Monthly fee orders
│   │   ├── payment/              # Payment verification
│   │   ├── confirmation/         # Email confirmation
│   │   ├── attendence/           # Attendance API
│   │   └── contact/              # Contact form
│   ├── models/                   # Mongoose schemas
│   │   ├── user.js
│   │   ├── fee.js
│   │   ├── monthlyFee.js
│   │   ├── payment.js
│   │   └── attendence.js
│   └── utils/
│       └── database.ts           # MongoDB connection helper
```

---

## 🌐 Deployment on Vercel

1. Push your code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Add all environment variables under **Project → Settings → Environment Variables**
4. Click **Deploy** ✅

> ⚠️ Ensure MongoDB Atlas **Network Access** allows `0.0.0.0/0` so Vercel's servers can connect.

---

## 🔐 Security

- Passwords hashed with **bcryptjs**
- Routes protected with **JWT tokens**
- All credentials stored in **environment variables** — never hardcoded
- `.env.local` excluded from version control via `.gitignore`

---

## 📄 License

This project is for educational and institutional use.
© 2024 **Baba Bamokhar Library Centre (BBLC)**. All rights reserved.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/digitalVishalkumarsingh">Vishal Kumar Singh</a>
</div>
