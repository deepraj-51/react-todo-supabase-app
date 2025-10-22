# 🚀 React Todo App with Supabase

A modern, full-stack todo application built with React and Supabase. Features real-time data synchronization, CRUD operations, and a clean, responsive UI.

## ✨ Features

- ✅ **Create, Read, Update, Delete** todos
- 🔄 **Real-time synchronization** with Supabase
- 📱 **Responsive design** for all devices
- 🎯 **Single todo view** with detailed information
- ⚡ **Fast and lightweight** with Vite
- 🔒 **Secure backend** with Supabase Row Level Security
- 🎨 **Modern UI** with clean styling

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, JavaScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Styling**: Inline CSS with modern design
- **State Management**: React Hooks (useState, useEffect)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- A Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-todo-supabase-app.git
   cd react-todo-supabase-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL from `database-schema.sql` in your Supabase SQL Editor
   - Get your project URL and anon key from Settings > API

4. **Configure environment**
   - Update `src/lib/supabase.js` with your Supabase credentials
   - Replace the URL and anon key with your actual values

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start creating your todos!

## 📁 Project Structure

```
src/
├── components/
│   ├── CreateTodo.jsx      # Todo creation form
│   ├── Todos.jsx           # Todo list display
│   └── SingleTodo.jsx      # Single todo detail view
├── lib/
│   └── supabase.js         # Supabase client configuration
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## 🗄️ Database Schema

The app uses a simple `todos` table with the following structure:

```sql
CREATE TABLE todos (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 Usage

### Creating Todos
1. Enter a title and description
2. Click "Add a Todo"
3. Your todo appears in the list below

### Managing Todos
- **View Details**: Click "View Details" to see full todo information
- **Mark Complete**: Toggle completion status
- **Delete**: Remove todos with confirmation

### Navigation
- Use "View Details" to see individual todos
- Use "← Back to Todos" to return to the main list

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features

### Real-time Updates
- Todos sync automatically across all connected clients
- No page refresh needed for updates

### Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Clean, modern interface

### Error Handling
- Comprehensive error handling for network issues
- User-friendly error messages
- Loading states for better UX

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables for Supabase
4. Deploy!

### Netlify
1. Build your project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Supabase](https://supabase.com/) for the powerful backend platform
- [Vite](https://vitejs.dev/) for the fast build tool

---

**Happy coding! 🎉**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
