🔐 Password Manager Web App

A simple React-based password manager that allows users to securely store and manage their site credentials using MongoDB for persistent storage.

🚀 Features
* Add, edit, and delete passwords
* Toggle password visibility
* Copy username or password with one click
* Open saved websites in a new tab
* Toast notifications for user feedback
* Responsive design using CSS
* MongoDB-backed storage with Node.js + Express API

⚙️ Setup Instructions: 

1. Clone the Repository:
 
->git clone https://github.com/your-username/your-repo-name.git

->cd your-repo-name

2. Install frontend dependencies:
 
->cd client

->npm install

3. Install backend dependencies:
   
->cd server

->npm install

4. Add MongoDB URI:
   
Create a .env file in /server and add:

MONGO_URI=your_mongodb_connection_string

5. Start the app
   
Start backend:

->cd server

->npm start

In another terminal, start frontend:

->cd client

->npm run dev

🛠 Tech Stack:

* React (with Vite)
* Node.js
* Express.js
* MongoDB + Mongoose
* React Toastify


