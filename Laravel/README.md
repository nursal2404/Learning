# 🚀 Laravel + React Decoupled Monolith Setup

This guide helps you set up a decoupled monolith architecture using **Laravel (Backend)** and **React (Frontend)** with API communication via Axios.

---

## 🧩 Backend (Laravel)

### 1️⃣ Create Laravel Project

```bash
# Create new Laravel API project
laravel new backend

cd backend

# Install API preset
php artisan install:api
```

---

### 2️⃣ Configure Middleware

Open `bootstrap/app.php` and add the following inside the middleware configuration:

```php
->withMiddleware(function (Middleware $middleware) {
    // Enable CORS for all api/* routes
    $middleware->api(prepend: [
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);

    // Disable CSRF validation for api/*
    $middleware->validateCsrfTokens(except: [
        'api/*'
    ]);

    // Alias auth middleware
    $middleware->alias([
        'auth' => \App\Http\Middleware\Authenticate::class,
    ]);

    // Register CORS as a global middleware
    $middleware->use([
        \Illuminate\Http\Middleware\HandleCors::class,
    ]);
})
```

---

### 3️⃣ Setup `.env`

Add these lines to your `.env` file:

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

CORS_PATHS=api/*
CORS_ALLOWED_METHODS=*
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CORS_ALLOWED_HEADERS=*
CORS_MAX_AGE=0
CORS_SUPPORTS_CREDENTIALS=true
```

---

### 4️⃣ Create a Test API Route

Edit `routes/api.php`:

```php
Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel 12 API 🚀',
    ]);
});
```

---

### 5️⃣ Run Laravel Server

```bash
php artisan serve
```

Your Laravel API should now run at:
👉 `http://localhost:8000/api/hello`

---

## ⚛️ Frontend (React + TypeScript)

### 1️⃣ Create Vite React Project

```bash
cd ..
npx create-vite@latest frontend --template react-ts
cd frontend
npm install axios
```

---

### 2️⃣ Create API Service

Create file: `src/services/api.ts`

```ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set true if using sessions/cookies
});

// Request logger
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response logger
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response ${response.status}:`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Example endpoints
export const getUsers = () => api.get('/users');
export const getUser = (id: number) => api.get(`/users/${id}`);
export const createUser = (data: { name: string; email: string }) => api.post('/users', data);
export const updateUser = (id: number, data: { name?: string; email?: string }) => api.put(`/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);

export default api;
```

---

### 3️⃣ Create Test Component

Create file: `src/components/TestApi.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TestApi: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    api.get('/hello')
      .then((res) => setMessage(res.data.message || JSON.stringify(res.data)))
      .catch((err) => {
        console.error('Error fetching API:', err);
        setError(err.response?.data?.message || 'Failed to connect to API');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>⏳ Connecting to API...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>;

  return (
    <div>
      <h2>🔗 Laravel Backend Connection</h2>
      <p>Message from API:</p>
      <pre style={{ background: '#101010', padding: '10px', borderRadius: '6px' }}>
        {message}
      </pre>
    </div>
  );
};

export default TestApi;
```

---

### 4️⃣ Update App.tsx

Replace the content of `src/App.tsx` with:

```tsx
import React from 'react';
import TestApi from './components/TestApi';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Laravel Integration</h1>
        <TestApi />
      </header>
    </div>
  );
};

export default App;
```

---

### 5️⃣ Run Frontend

```bash
npm run dev
```

Your React app should now be running at:
👉 `http://localhost:5173`

---

## ✅ Test Connection

Visit `http://localhost:5173` and you should see:

```
🔗 Laravel Backend Connection
Pesan dari API:
Hello from Laravel 12 API 🚀
```

---

## 🧱 Directory Structure Summary

```
project-root/
├── backend/        # Laravel API service
└── frontend/       # React Vite frontend
```
