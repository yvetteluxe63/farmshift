
# FarmShift Manager - Farm Operations Scheduling System

**URL**: https://lovable.dev/projects/a9c968bb-f143-4edf-ab01-5a4b6fe0240b

## Overview

FarmShift Manager is a comprehensive web application designed to streamline livestock and dairy farm operations through intelligent shift scheduling and workforce management. The application provides role-based access for both farm administrators and workers, with real-time data synchronization and an intuitive calendar interface.

## How the App Works

### Core Features

#### 1. **Authentication & Role Management**
- **Admin Dashboard**: Full access to manage farms, workers, and shift assignments
- **Worker Dashboard**: Personal view of assigned shifts and schedules
- Secure login system with role-based permissions

#### 2. **Farm Management**
- Create and manage multiple farm locations
- Track farm types (Dairy, Livestock, Poultry)
- Assign specific locations and zones within farms

#### 3. **Worker Management**
- Add and manage farm workers
- Store contact information (email, phone)
- Track worker assignments across different farms

#### 4. **Intelligent Shift Scheduling**
The app supports four types of shifts with color-coded visualization:
- **Morning Shift** (Green): Typically 5:00 AM - 1:00 PM for milking, feeding, health checks
- **Evening Shift** (Orange): Typically 1:00 PM - 9:00 PM for barn cleaning, maintenance
- **Night Shift** (Blue): Typically 9:00 PM - 5:00 AM for security, emergency care
- **Off Day** (Gray): Scheduled rest periods

#### 5. **Interactive Calendar System**
- **Real-time Data**: All shift information is pulled from Supabase database
- **Visual Scheduling**: Color-coded calendar events for easy identification
- **Event Details**: Click on any shift to view worker, farm, time, and notes
- **Today's Schedule**: Quick overview of current day's assignments
- **Statistics Dashboard**: Live metrics on shifts, workers, and farm operations

#### 6. **Live Data Integration**
- **Database-Driven**: All data stored in Supabase with real-time updates
- **Automatic Refresh**: Calendar and dashboards update automatically
- **Error Handling**: Robust error management with user-friendly messages
- **Loading States**: Smooth loading animations during data fetching

### User Workflows

#### For Farm Administrators:
1. **Login** with admin credentials
2. **Manage Farms**: Add/edit farm locations and types
3. **Manage Workers**: Add worker profiles with contact details
4. **Schedule Shifts**: Assign workers to specific farms and time slots
5. **Monitor Operations**: View calendar overview and operational statistics
6. **Real-time Updates**: See live changes across all farm operations

#### For Farm Workers:
1. **Login** with worker credentials
2. **View Personal Schedule**: See upcoming assigned shifts
3. **Shift Details**: Access detailed information about each assignment including:
   - Farm location and type
   - Shift timing (start/end times)
   - Special instructions or notes
   - Shift status (scheduled/completed/cancelled)
4. **Quick Statistics**: View personal work metrics and hours

### Technical Architecture

#### Frontend Technologies:
- **React** with TypeScript for type safety
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **FullCalendar** for interactive calendar functionality
- **Shadcn/UI** components for consistent design

#### Backend & Database:
- **Supabase** for backend services
- **PostgreSQL** database with three main tables:
  - `farms`: Store farm information and locations
  - `workers`: Manage worker profiles and contact details
  - `shifts`: Track all shift assignments with relationships to farms and workers
- **Real-time subscriptions** for live data updates
- **Row Level Security** for data protection

#### Key Features:
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Changes reflect immediately across all users
- **Offline Handling**: Graceful error handling when connection is lost
- **Performance Optimized**: Efficient data loading and caching
- **Accessibility**: Built with accessibility best practices

### Database Schema

```
farms:
- id (UUID, Primary Key)
- name (Text, Required)
- location (Text, Optional)
- type (Text, Optional)
- created_at (Timestamp)

workers:
- id (UUID, Primary Key)
- name (Text, Required)
- email (Text, Unique)
- phone (Text, Optional)
- created_at (Timestamp)

shifts:
- id (UUID, Primary Key)
- worker_id (UUID, Foreign Key to workers)
- farm_id (UUID, Foreign Key to farms)
- shift_date (Date, Required)
- shift_type (Enum: Morning/Evening/Night/Off)
- start_time (Time)
- end_time (Time)
- notes (Text)
- status (Enum: scheduled/completed/cancelled)
- created_at/updated_at (Timestamps)
```

### Getting Started

#### Demo Access:
- The app includes a landing page with demo authentication
- Choose "Admin" or "Worker" role to explore different interfaces
- Sample data is pre-loaded for demonstration

#### Sample Data Includes:
- 3 different farm types (Dairy, Livestock, Poultry)
- 5 sample workers with contact information
- Multiple shifts scheduled across different dates and times
- Various shift types and farm assignments

### Future Enhancements

The application is designed to be extensible with potential features like:
- Mobile app companion
- Push notifications for shift reminders
- Advanced reporting and analytics
- Payroll integration
- Weather-based shift adjustments
- Equipment maintenance scheduling

---

## Development Setup

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation Steps

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start development server
npm run dev
```

### Technologies Used

This project is built with:
- **Vite** - Build tool and development server
- **TypeScript** - Type safety and better development experience
- **React** - Frontend framework
- **Shadcn-UI** - Component library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Supabase** - Backend-as-a-Service
- **FullCalendar** - Calendar functionality

## Deployment

### Quick Deployment
Simply open [Lovable](https://lovable.dev/projects/a9c968bb-f143-4edf-ab01-5a4b6fe0240b) and click on Share → Publish.

### Custom Domain
Connect a custom domain through Project > Settings > Domains. A paid Lovable plan is required for custom domains.

## Development Resources

### Useful Links
- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Support
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Step-by-step Lovable Guide](https://docs.lovable.dev/user-guides/quickstart)
- [YouTube Tutorial Playlist](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

### Code Editing Options

1. **Use Lovable**: Visit the project URL and start prompting
2. **Local Development**: Clone repo and use your preferred IDE
3. **GitHub Integration**: Connect GitHub account for code synchronization
4. **GitHub Codespaces**: Use browser-based development environment

## License

This project is built with Lovable and follows standard web development practices for farm management applications.
