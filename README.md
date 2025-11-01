

# 🚀 **Assignment Dashboard**

A **role-based Assignment Management System** built with **React (Vite)** and **Tailwind CSS**.
It allows **students** to submit assignments and track progress while **instructors** can create, grade, and analyze performance — all in a **clean, interactive, and responsive** web interface.

---

## 🔧 **Features**

* 👩‍🏫 **Role-Based Access:** Separate dashboards for Students and Instructors.
* 🕒 **Deadline Tracking:** Automatically calculates due and pending assignments.
* 🧮 **Custom Charts:** Built-in bar charts to visualize scores and submission rates.
* 🔐 **Secure Navigation:** Role-based routing with protected routes.
* ✏️ **Edit-in-Place Grading:** Instructors can directly update grades from the dashboard.
* 💡 **Modern UI:** Built with Tailwind for responsive and elegant design.
* ⚡ **Fast Performance:** Optimized using Vite and React Context API.

---

## 💡 **How It Works**

The dashboard simulates a complete academic workflow:

1. **Instructor Portal**

   * Creates new assignments.
   * Views student submissions.
   * Grades and provides feedback.
   * Analyzes submission trends using bar charts.

2. **Student Portal**

   * Registers or logs in securely.
   * Views upcoming assignments with due dates.
   * Submits completed work.
   * Checks feedback and grades instantly.

All data is handled via **React Context API**, allowing for smooth updates and real-time UI changes without a backend.

---

## 🧰 **Tech Stack**

| Category             | Technology            | Purpose                              |
| -------------------- | --------------------- | ------------------------------------ |
| **Framework**        | React (Vite)          | Component-based architecture         |
| **Styling**          | Tailwind CSS          | Fast and responsive UI               |
| **Routing**          | React Router DOM      | Handles protected and dynamic routes |
| **State Management** | React Context API     | Centralized global state             |
| **Visualization**    | Custom JSX/CSS Charts | Lightweight data display             |

---

## 🛠️ **Project Structure**

```
assignment-dashboard/
│
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
```

---

## ⚙️ **Getting Started**

1. **Clone the repository**

   ```bash
   git clone [(https://github.com/ANKITKUMAR-dev25/ASSIGNMENT-DASH.git)]
   cd assignment-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit 👉 [http://localhost:5173](http://localhost:5173)

---

## 🔑 **Test Credentials**

| Role        | Username | Password | Access                                 |
| ----------- | -------- | -------- | -------------------------------------- |
| **Admin**   | admin    | (any)    | Create, grade, and analyze assignments |
| **Student** | student1 | (any)    | Submit assignments, view grades        |

---

## 🎨 **UI & Design Highlights**

* 🧭 **Single Auth Page:** Toggles smoothly between Login and Register.
* 🧩 **Consistent Layout:** Header, buttons, and forms reuse shared UI components.
* 📱 **Responsive Design:** Works seamlessly across devices.
* 🖥️ **Custom Charts:** Visualizes submission rate and performance trends.
* 🔔 **Real-Time Updates:** Context-driven re-rendering for immediate feedback.

---

## 🧠 **Learning Outcomes**

* 🌐 Role-based routing with React Router
* ⚙️ Global state with React Context
* 💾 Data handling without backend dependencies
* 🎨 Tailwind-based responsive design
* 🧱 Clean, modular front-end structure
* 🧮 Custom chart rendering using JSX + CSS

---

## 🚀 **Future Enhancements**

* 🔐 Integrate JWT authentication
* ☁️ Add Node.js + MongoDB backend for persistence
* 📊 Advanced analytics dashboard
* 🧮 Automated grading simulation
* 🔔 Notifications for due dates and updates
* 📱 Convert into a PWA for offline access

---

## 🧪 **Sample Output (UI Preview)**

| Page                  | Description                                         |
| --------------------- | --------------------------------------------------- |
| **Login / Register**  | Single screen with smooth toggle and validation     |
| **Student Dashboard** | Displays pending, completed, and graded assignments |
| **Admin Dashboard**   | Displays submission analytics and grading interface |



---

## 📜 **License**

This project is open-source and available under the **MIT License**.
Feel free to use, modify, or extend it for learning or portfolio purposes.

---

## 🤝 **Contributing**

Pull requests are welcome!

1. Fork this repository
2. Create a new branch (`feature/new-feature`)
3. Commit and push your changes
4. Submit a Pull Request 🚀

---

## 🔗 **Useful Links**

* [React Documentation](https://react.dev/)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [React Router](https://reactrouter.com/en/main)
* [Vite Official Site](https://vitejs.dev/)

---

## 👨‍💻 **Author**

**[Ankit Kumar]**
📧 [[8250136105a@gmail.com]]

---

> ✨ *“Assignment Dashboard — where clean design meets smart workflow automation.”*



