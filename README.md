# Crisp: An Interview Simulation Platform

Crisp is a web application designed to simulate a technical interview process for full-stack developer roles. It provides a timed, multi-question interview experience for candidates and a dashboard for interviewers to review submitted answers.

![Crisp Application Screenshot](<img width="1917" height="811" alt="image" src="https://github.com/user-attachments/assets/f2ad68d7-5747-4549-ba88-26f2a324c254" />)

---
## Key Features

* **📄 Resume Parsing:** Upload a resume (PDF/DOCX) to automatically extract the candidate's name, email, and phone number using local text-parsing algorithms.
* **⏱️ Timed Interview Flow:** A structured interview with 6 pre-defined questions progressing from easy to hard, each with its own countdown timer.
* **📊 Interviewer Dashboard:** A comprehensive dashboard to view all candidates, their submitted answers, and the full interview transcript.
* **💾 Persistent State:** The application saves all progress to the browser's local storage, allowing users to refresh the page and resume an interview in progress.
* **✨ Responsive UI:** A clean and modern user interface built with Ant Design.

---
### A Note on Project Evolution: From Live AI to Local Simulation

The initial goal for this project was to integrate a live Large Language Model (LLM) from a cloud provider (such as Google Gemini, Anthropic Claude, or a model from Hugging Face) to dynamically generate questions and evaluate answers in real-time.

However, during development, I encountered significant and persistent hurdles with API access across multiple platforms. These issues included:
* **Billing Verification Delays:** Major cloud providers required billing account verification that was not completed in time.
* **Credit Requirements:** Some "free tier" APIs still required purchasing credits to enable the key.
* **Free Tier Unavailability:** Public inference endpoints for powerful open-source models were frequently unavailable or returned errors.

As a demonstration of practical problem-solving and to ensure a fully functional and reliable application for submission, I made the strategic decision to **pivot the project's architecture**. The core logic was refactored to use a **pre-defined question bank** and a **local, non-AI resume parser**.

This approach maintains the complete application workflow and user experience while guaranteeing stability and functionality without external dependencies. It showcases the core application structure while highlighting the importance of adaptability in software development.

---
## Tech Stack

* **Frontend:** [React](https://reactjs.org/) (bootstrapped with [Vite](https://vitejs.dev/))
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
* **UI Library:** [Ant Design](https://ant.design/)
* **File Parsing:** [react-pdf](https://github.com/wojtekmaj/react-pdf) & [mammoth.js](https://github.com/mwilliamson/mammoth.js)

---
## Local Setup and Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/YourUsername/YourRepositoryName.git](https://github.com/YourUsername/YourRepositoryName.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd crisp-interview-ai
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

---
## How to Use

1.  On the **Interviewee** tab, click the "Upload Resume" button to select a PDF or DOCX file. The app will attempt to extract your details.
2.  Confirm or fill in any missing information to proceed.
3.  Click "Start Interview" to begin the timed questions.
4.  Answer each of the 6 questions within the given time limit. The app will automatically move to the next question when the timer runs out.
5.  Once finished, navigate to the **Interviewer** tab to see your name on the dashboard. Click your name to view your full transcript.
