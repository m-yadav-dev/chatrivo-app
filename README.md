# Chatrivo 💬

A fast, decoupled real-time messaging platform engineered with the MERN stack and Socket.io. Chatrivo features polymorphic message handling and automated AI workflows, designed to provide a seamless and secure communication experience.

🔴 **LIVE DEMO (Try Guest Mode!):** https://chatrivo-app.duckdns.org/

---

## 📸 Application Showcase




<div align="center">
  <img src="https://github.com/user-attachments/assets/25f08f0a-b750-414e-b364-41be4db379a8" alt="1-Click Guest Login Showcase" width="800" />
  <p><i><strong>1-Click Guest Login:</strong> Frictionless entry for quick recruiter reviews via MongoDB TTL indexing.</i></p>
</div>

<br />

<div align="center">
  <video src="https://github.com/user-attachments/assets/95f2ded1-5cd1-45a8-99fe-3f01671aeeaa" width="800" controls autoplay loop muted></video>
  <p><i><strong>Real-Time Audio-to-Text Transcription:</strong> Agentic workflow converting voice notes to text using n8n and Groq LPU.</i></p>
</div>



[Insert Diagram: System Architecture]
*Visual breakdown of the decoupled frontend, backend proxy, and AI webhook integration.*

---

## ✨ Key Features

* **Agentic AI Audio Transcription:** Voice messages are processed through a secure Node.js proxy to an n8n webhook, utilizing the Groq LPU for lightning-fast speech-to-text conversion.
* **Real-Time Communication:** Instant message delivery and bi-directional connection handling powered by Socket.io.
* **Polymorphic Message Handling:** Seamlessly process and render diverse payloads (text, images, and audio buffers) within a single chat thread.
* **Frictionless Guest Mode:** "One-Click" anonymous login featuring automated database cleanup (MongoDB TTL index) for instant, hassle-free app testing.
* **Optimized State Management:** Lightweight client-side state handling utilizing Zustand to prevent unnecessary re-renders during active data fetching.
* **Secure Auth & Cloud Storage:** JWT-based authentication via HTTP-only cookies, coupled with Cloudinary integration for scalable media asset management.

---

## 🛠️ Tech Stack

**Core MERN Architecture:**
* **Frontend:** React (Vite), Tailwind CSS, Zustand, React-Router-Dom
* **Backend:** Node.js, Express.js, Socket.io, Multer, Axios
* **Database:** MongoDB Atlas, Mongoose

**Integrations & Infrastructure:**
* **AI & Automation:** n8n (Self-hosted workflows), Groq API (Whisper model)
* **Storage & Deployment:** Cloudinary (Media), Vercel (Frontend), Azure VM + Nginx (Backend)

---

## 🚀 Quick Start (Run Locally)

To run this project on your local machine, follow these steps:

**1. Clone the repository**
```bash
git clone [https://github.com/m-yadav-dev/chatrivo-app.git](https://github.com/m-yadav-dev/chatrivo-app.git)
cd chatrivo-app


# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Environment Configuration

MONGO_DB_CONN_STR=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5174
ARCJET_KEY=your_arcjet_key
N8N_WEBHOOK_TEST_URL=your_n8n_test_url
N8N_WEBHOOK_URL=your_n8n_production_url

# Start the Application

# Start the backend server (from the backend directory)
npm run dev

# Start the frontend client (from the frontend directory)
npm run dev
