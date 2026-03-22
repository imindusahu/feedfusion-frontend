# Smart Aggregator Frontend

This is the frontend for the **Smart Aggregator** project built using **React.js**.  
It connects with the FastAPI backend to provide user authentication and article management features.

---

## Features

- ✅ User Registration and Login  
- ✅ JWT Authentication (Token stored in localStorage)  
- ✅ Create and View Articles  
- ✅ Protected API calls using Axios  
- ✅ Responsive UI using Bootstrap  
- ✅ React Router for navigation  

---

## Tech Stack

- **Frontend Framework:** React.js  
- **Routing:** React Router DOM  
- **HTTP Client:** Axios  
- **Styling:** Bootstrap  
- **Backend API:** FastAPI  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/imindusahu/smart-aggregator-frontend.git
cd smart-aggregator-frontend
```

## Install dependencies
```
npm install
Start the development server
npm start
````

## Frontend will run at:
👉 http://localhost:3000

## Backend Connection

### Make sure your backend is running at:
```
 http://127.0.0.1:8000
 ```

### Update API base URL in:
```
src/services/api.js
const API_URL = "http://127.0.0.1:8000";
```

## Project Structure
```
src/
├── components/
│   ├── Navbar.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
├── services/
│   └── api.js
├── App.js
└── index.js
```

## Available Pages

- /register → Register new user
- /login → Login and get token
- / → Dashboard (Create & View Articles)


## API Integration
- POST /register → Register user
- POST /login → Login user
- GET /articles → Fetch articles
- POST /articles → Create article


## Future Improvements
- 🔹 Add Logout functionality
- 🔹 Add Delete/Edit article
- 🔹 Add real-time News API integration
- 🔹 Improve UI/UX with better design
- 🔹 Add loading states and error handling


## Author

Indu Sahu 
B.Tech Computer Science | Full Stack Developer

## License

This project is licensed under the MIT License.



