# Flowva Hub Clone

A modern, high-performance clone of the Flowva Hub platform, built to replicate its core functionality and aesthetic. This application provides a comprehensive dashboard for users to manage digital tools, track subscriptions, and earn rewards.

## 🚀 Features

- **Modern Dashboard**: A clean, responsive interface for managing user activities.
- **Authentication**: Secure status-based authentication flow (Sign Up, Sign In) powered by Supabase.
- **Rewards Hub**: Gamified system where users can view points, track progress, and redeem rewards.
- **Tool Discovery**: Explore and add new tools to your personal library (currently in "Coming Soon" status).
- **Subscription Management**: Track recurring expenses and renewal dates (currently in "Coming Soon" status).
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices using Tailwind CSS.
- **Dynamic Data**: Centralized data management for easy content updates.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) & React Context
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Animations**: CSS Transitions & Keyframes
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Version 16.x or higher is recommended.
- **npm** or **yarn**: Package manager for installing dependencies.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/flowva-clone.git
    cd flowva-clone
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory (if not already present) and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This commands compiles your application into the `dist` directory, optimizing it for performance.

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components (Header, Footer, Cards, etc.)
├── context/         # React Context providers (AuthContext)
├── data/            # Centralized static data (data.js)
├── layout/          # Layout wrappers (FlowvaLayout)
├── pages/           # Page components (Home, Onboarding, Login, Signup)
│   └── dashboard/   # Dashboard sub-pages (DashboardHome, Rewards, etc.)
├── App.jsx          # Main application component & Routing
├── index.css        # Global styles & Tailwind directives
└── main.jsx         # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
