# Supabase Integration Setup

## Prerequisites
1. A Supabase account and project
2. Your Supabase project URL and anon key

## Setup Steps

### 1. Create Database Schema
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands from `database-schema.sql` to create the todos table

### 2. Get Your Supabase Credentials
1. In your Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key

### 3. Update Supabase Configuration
1. Open `src/lib/supabase.js`
2. Replace `'your-anon-key-here'` with your actual anon key from step 2

### 4. Test the Integration
1. Run `npm run dev` to start the development server
2. Open your browser and navigate to the local URL
3. Try creating, updating, and deleting todos

## Database Schema
The todos table includes:
- `id`: Primary key (auto-incrementing)
- `title`: Todo title (required)
- `description`: Todo description (optional)
- `completed`: Boolean flag (default: false)
- `created_at`: Timestamp when created
- `updated_at`: Timestamp when last updated

## Features
- ✅ Create new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time updates
- ✅ Responsive design

## Troubleshooting
- Make sure your Supabase URL and anon key are correct
- Ensure the database schema has been created
- Check the browser console for any error messages
- Verify that Row Level Security policies are set up correctly
