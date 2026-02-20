# Loan Default Prediction System

A comprehensive Machine Learning application tailored for financial institutions to predict loan defaults with high accuracy. This system leverages an **Optimized Random Forest** model to assess risk factors and aid in decision-making.

![Project Status](https://img.shields.io/badge/status-active-success.svg) | [**Live Demo**](https://loan-default-prediction-system.vercel.app/)


## 🚀 Features

-   **Real-time Prediction**: Instant loan default probability assessment based on applicant data.
-   **Model Comparison Dashboard**: Interactive visualization comparing multiple algorithms (Logistic Regression, Decision Trees, Gradient Boosting, etc.).
-   **Transparent Insights**: Detailed breakdown of model training, performance metrics (Precision, Recall, F1-Score), and selection rationale.
-   **Risk Interpretation**: Clear "Low Risk" vs "High Risk" classification with actionable feedback.
-   **Modern UI**: Responsive and accessible interface built with Next.js 15, Tailwind CSS, and Framer Motion.
-   **robust Backend**: Fast and efficient API powered by FastAPI and Scikit-learn.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Radix UI, Lucide React
-   **Animations**: Framer Motion
-   **Charts**: Recharts (implied)

### Backend
-   **Framework**: FastAPI
-   **Language**: Python 3.x
-   **ML Libraries**: Scikit-learn, NumPy, Pandas
-   **Serialization**: Pickle/Joblib

## 🧠 Model Details

The system evaluates multiple models and selects the **Optimized Random Forest** as the final deployment model due to its superior stability and balance between precision and recall.

-   **Input Features**: 16 (Age, Income, Credit Score, Loan Amount, DTI Ratio, etc.)
-   **Target**: Binary Classification (Default / Non-Default)
-   **Preprocessing**: StandardScaler, Class Weight Balancing

## 📦 Installation

### Prerequisites
-   Node.js (v18+)
-   Python (v3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/BarotAvnil/loan-default-prediction-system
cd loan-default-prediction-system
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# Mac/Linux
source .venv/bin/activate

pip install -r requirements.txt
python main.py
```
The API will start at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## 📖 Usage

1.  Ensure both Backend and Frontend servers are running.
2.  Navigate to `http://localhost:3000`.
3.  Explore the **Model Comparison** tab to see how different algorithms perform.
4.  Use the **Prediction** interface to input loan details and get a risk assessment.
