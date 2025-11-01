🚀 Assignment Dashboard
🎯 Project Overview

The Assignment Dashboard is a role-based academic management web application that simulates a real-world digital assignment workflow — from creation and submission to grading and analytics.

Built with React (Vite) and Tailwind CSS, this project demonstrates end-to-end front-end engineering, state management, and modern UX design principles.

It’s designed to impress recruiters and teams by showcasing clean code, scalable architecture, and user-centered interface design.

🛠️ Tech Stack
Category	Technology	Purpose
Frontend Framework	React (Vite)	Fast, modular, and component-driven UI
Styling	Tailwind CSS	Utility-first CSS framework for responsive UI
Routing	React Router DOM	Dynamic and role-based navigation
State Management	React Context API	Global management of Auth & App Data
Visualization	Custom JSX + CSS	Lightweight, dependency-free data charts
✨ Key Features
🔐 Role-Based Architecture

The application provides distinct portals for:

Instructor (Admin): Create assignments, grade submissions, analyze results

Student: Submit work, track deadlines, and view grades

Role protection is implemented using ProtectedRoute.jsx and React Router DOM, ensuring users access only what they’re authorized to.

💡 Dynamic Data Flow & UX Design

AuthPage.jsx — Combines login and registration in one dynamic screen

Real-Time Logic — Student dashboard calculates pending submissions based on due dates

Instant Grading Updates — Admins can directly modify grades in the same view

Double Verification — Students confirm before final submission to avoid accidental uploads

📊 Lightweight Custom Visualization

The dashboard includes handcrafted bar charts using JSX and CSS — no external libraries — displaying:

Admin Dashboard: Submission rates & average class scores

Student Dashboard: Personal score progression across assignments

💻 Folder Structure
assignment-dashboard/
├── public/
├── src/
│   ├── assets/                  # Images, icons
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AssignmentForm.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── SubmissionTracker.jsx
│   │   ├── Student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── AssignmentList.jsx
│   │   │   ├── SubmissionModal.jsx
│   │   ├── UI/
│   │   │   ├── Header.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── ProgressIndicator.jsx
│   │   │   ├── ProtectedRoute.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── DataContext.jsx
│   ├── data/
│   │   ├── mockData.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── README.md

⚙️ Setup & Run Locally
# Clone the repository
git clone https://github.com/yourusername/assignment-dashboard.git
cd assignment-dashboard

# Install dependencies
npm install

# Run the project
npm run dev

🔑 Test Credentials
Role	Username	Password	Access
Admin	admin	(any)	Create, grade, analyze assignments
Student	student1	(any)	Submit assignments, check grades
🎨 Design & UX Approach

This project emphasizes clarity, consistency, and responsiveness:

🎯 Minimal Cognitive Load: Clear typography, visual hierarchy, and intuitive color schemes

💬 Feedback-Driven UI: Users get instant feedback after every interaction

🧭 Role-Centric Navigation: Admin and Student dashboards are fully decoupled for simplicity

📱 Mobile Responsive: All pages are optimized for both desktop and mobile devices

🧠 Learning & Development Highlights

Mastered role-based routing and state-driven component design

Built custom chart visualizations without third-party libraries

Enhanced component reusability through a well-structured UI/ directory

Practiced scalable folder architecture for real-world front-end projects

Focused on clean, readable, and maintainable code following modern React patterns

🌟 Future Roadmap
Feature	Description
🔐 JWT Authentication	Integrate secure, persistent backend authentication
☁️ Database Integration	Connect with Node.js + MongoDB backend
📈 Advanced Analytics	Real-time dashboards for instructors
🧮 Auto-Grading System	Simulated rubric-based grading system
📩 Notifications	In-app and email alerts for due dates
📸 Screenshots (Add in Future)

You can include:

Login & Registration Page

Student Dashboard (Progress Chart)

Admin Dashboard (Analytics View)

(Save screenshots in /src/assets/ and embed them here for a professional GitHub presentation.)

🧑‍💻 Author

[Your Name]
📧 [your.email@example.com
]
🔗 Portfolio
 | LinkedIn

💬 Final Note

The Assignment Dashboard is more than a project — it’s a demonstration of full-stack thinking within a front-end architecture.
It combines clean UI, functional design, and scalable engineering principles to reflect real-world software quality.
