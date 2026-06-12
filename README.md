# 🚀 Personal Portfolio Website

A modern full-stack portfolio website built to showcase my projects, technical skills, certifications, and professional journey through an interactive and responsive experience.

Designed with a clean developer-focused interface and powered by a secure admin dashboard, the platform allows dynamic content management without modifying the source code. Projects, certificates, and media assets can be added or updated directly through the admin panel, making the portfolio scalable and easy to maintain.

## ✨ Features

### 🌐 Public Portfolio

* Responsive design optimized for desktop, tablet, and mobile devices.
* Interactive project showcase with dedicated project detail pages.
* Experience timeline and technical skills section.
* Certification gallery with image previews.
* Contact page for professional communication.
* Custom favicon and personalized branding.

### 🔐 Secure Admin Dashboard

* Protected administrator login using JWT authentication.
* Secure session management.
* Forgot Password and Reset Password workflow with email verification.
* Automatic logout and route protection.
* Modern terminal-inspired authentication interface.

### 📂 Dynamic Content Management

* Add, edit, and delete projects.
* Manage certifications and experience records.
* Update skills directly from the admin panel.
* Upload project covers, screenshots, and certificate images.
* Support for multiple image uploads per project.

### ☁️ Cloud-Based Media Storage

* Cloudinary integration for secure image hosting.
* Multi-image upload support for project galleries.
* Centralized media management without storing assets in the repository.

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT (JSON Web Tokens)
* bcrypt.js
* Nodemailer
* Multer
* Cloudinary

### Tools & Services

* MongoDB Atlas
* Cloudinary
* Git & GitHub
* Vercel (Frontend Deployment)
* Render (Backend Deployment)

## 📁 Project Structure

```text
portfolio/
│
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── ...
│
└── README.md
```

## 🔒 Authentication & Security

* Passwords are securely hashed using **bcrypt.js**.
* Administrator authentication is handled through **JWT tokens**.
* Password recovery is implemented with secure, time-limited email reset links.
* Sensitive credentials and API keys are protected using environment variables.

## 📸 Screenshots

/// ADDING SOON

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the backend directory and configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

## 🎯 Future Enhancements

* Visitor analytics dashboard.
* Blog or technical articles section.
* Downloadable resume integration.
* Theme customization options.
* Enhanced project filtering and search.

## 👨‍💻 About Me

I'm a Computer Engineering student with a strong interest in **Full Stack Development**, **Cyber Security**, and building practical applications that combine clean design with robust backend functionality. I enjoy learning by creating real-world projects and continuously improving my technical skills.

## 📬 Connect With Me

* **Portfolio:** *(Add after deployment)*
* **GitHub:** https://github.com/Aditya-1725
* **LinkedIn:** https://www.linkedin.com/in/aditya-vawhal-1725adi/
* **Email:** adityavawhal000@gmail.com

---

⭐ If you found this project interesting, feel free to explore the repository and connect with me!
