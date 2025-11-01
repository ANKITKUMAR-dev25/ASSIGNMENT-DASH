🚀 Assignment Dashboard








🧭 Overview

The Assignment Dashboard is a role-based academic management web application built using React (Vite) and Tailwind CSS.
It simulates the end-to-end process of managing, submitting, and grading academic assignments — with a clean, modern interface and professional-grade UI/UX principles.

This project demonstrates your ability to design and build scalable front-end systems, implement role-based routing, and manage complex state flows with the React Context API.

⚡ Key Highlights
🔐 Role-Based Workflow

Admin Portal → Create assignments, grade submissions, and analyze class performance.

Student Portal → Submit assignments, track deadlines, and review grades.

Implemented using ProtectedRoute.jsx for secure and conditional navigation.

🧩 Dynamic UX & Logic

Single Auth Page toggles between Login and Register forms dynamically.

Real-time Deadline Tracking compares due dates with the current date.

Edit-in-Place Grading allows instructors to modify scores instantly.

Submission Confirmation Modals prevent accidental submissions.

📊 Lightweight Custom Charts

Custom-built bar charts (no external libraries) visualize:

Admin Dashboard: Submission rates & average scores.

Student Dashboard: Personal performance trends.

🛠️ Tech Stack
Layer	Technology	Purpose
Frontend Framework	React (Vite)	Fast, modular front-end architecture
Styling	Tailwind CSS	Responsive, utility-first CSS
Routing	React Router DOM	Multi-role and protected routing
State Management	React Context API	Centralized auth and data handling
Visualization	Custom JSX + CSS	Lightweight, dependency-free charts
📁 Folder Structure
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

⚙️ Installation & Setup
# Clone the repository
git clone https://github.com/yourusername/assignment-dashboard.git
cd assignment-dashboard

# Install dependencies
npm install

# Run the project
npm run dev

🔑 Test Credentials
Role	Username	Password	Access
Admin	admin	(any)	Create, grade, and analyze assignments
Student	student1	(any)	Submit assignments, check grades
🎨 Design Principles
Principle	Implementation
Minimalism	Clean UI with clear layout and focus on task clarity
Consistency	Tailwind color palette and reusable UI components
Responsiveness	Fully adaptive layout across desktop and mobile
Accessibility	Clear text hierarchy, keyboard focus, and readable colors
User Feedback	Real-time alerts and visual cues after every action
🧠 Learning Outcomes

Through this project, I strengthened my understanding of:

✅ Component-based design using React

✅ Global state management using Context API

✅ Role-based routing and access control

✅ Building custom visualizations from scratch

✅ Implementing responsive and accessible UI with Tailwind CSS

✅ Clean code structuring & modular design principles

🚧 Future Enhancements

🔐 Integrate JWT-based authentication

☁️ Add Node.js + MongoDB backend for real data persistence

📈 Advanced analytics dashboard for instructors

🧮 Auto-grading simulation based on rubrics

🔔 Real-time notification and reminders

🖼️ Screenshots (Optional)
Page	Preview
Login / Register	(Add Image)
Student Dashboard	(Add Image)
Admin Dashboard	(Add Image)

💡 Place screenshots in /src/assets/ and link them here for a polished GitHub presentation.

📜 License

This project is licensed under the MIT License — feel free to use and modify it for learning or portfolio purposes.

👨‍💻 Author

[Your Name]
📧 [your.email@example.com
]
🌐 Portfolio

🔗 LinkedIn

💻 GitHub

✨ “Assignment Dashboard reflects how thoughtful UX and scalable front-end engineering come together to solve real-world academic management problems.”
