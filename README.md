# ✈️ Pack&Go — Travel Booking Platform

**Pack&Go** is a full-stack web application for searching, exploring, and booking travel tours worldwide 🌍  
The project is built using Angular (frontend) and Django REST Framework (backend).

---

## 🚀 Live Demo

🔗 **Deployed application:**  
https://pack-and-go.wittywave-acac0a6b.polandcentral.azurecontainerapps.io/

---

## 🧩 Features

### 🔐 Authentication
- User registration
- Login with JWT authentication
- Protected routes (Auth Guard)
- "Remember Me" functionality

---

### 🌍 Tours
- View all available tours
- Filter tours (by country, price, travelers)
- Tour details page
- Data fetched from backend API

---

### 📦 Booking System
- Book tours from the Tour Details page
- Booking linked to authenticated user
- Secure API (JWT required)

---

### 👤 User Profile
- Displays username and email
- Shows user's bookings
- Each booking includes:
  - Tour title
  - Price

---

### 🎨 UI / UX
- Modern clean design
- Responsive layout
- Interactive cards with hover effects
- Dropdown user menu
- Success modal for booking

---

## 🛠️ Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- HTML / CSS
- Angular Router
- HttpClient + Interceptors

### Backend
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- SQLite

### DevOps / Deployment
- Docker
- Nginx
- Azure Container Apps


---

## 👥 Team (Full-Stack Developers)

| Name | Role | Contribution |
|------|------|------------|
| **Alina Kim** | Full-Stack Developer | UI/UX design, frontend architecture, main pages (Home, Tours, Profile), API integration, booking logic |
| **Manas Omirbi** | Full-Stack Developer | Backend development (auth, JWT, API), security setup, auth guard, frontend-backend integration |
| **Madina Ataibekova** | Full-Stack Developer | UI styling, components, page improvements, bug fixing, frontend & backend support |

---

## 📈 Key Achievements

- ✅ Fully working authentication system
- ✅ Real frontend-backend integration
- ✅ Functional booking system
- ✅ Dynamic data from API
- ✅ Deployed to cloud (Azure)
- ✅ Clean and modern UI
- ✅ Live URL: https://pack-and-go.wittywave-acac0a6b.polandcentral.azurecontainerapps.io/

---

## ⚙️ Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Alinur is the best
