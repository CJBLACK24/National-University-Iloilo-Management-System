# 🎓 National University of Iloilo Management System

A comprehensive university management system built with modern web technologies. This system provides role-based dashboards for administrators, teachers, students, and parents to manage academic operations efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

## ✨ Features

### 👥 User Management

- **Multi-role Authentication** - Admin, Teacher, Student, and Parent roles
- **Better Auth Integration** - Secure authentication with email/password and Google OAuth
- **Role-based Access Control** - Protected routes based on user roles

### 📚 Academic Management

- **Students** - Complete student records with class assignments and grades
- **Teachers** - Teacher profiles with subject specializations
- **Parents** - Parent accounts linked to student records
- **Classes** - Class management with capacity tracking
- **Subjects** - Subject catalog with teacher assignments
- **Grades** - Grade level management

### 📅 Scheduling & Events

- **Lessons** - Schedule lessons by day, time, subject, and teacher
- **Exams** - Create and manage examination schedules
- **Assignments** - Track assignments with due dates
- **Events** - School-wide and class-specific events
- **Announcements** - Broadcast announcements to classes

### 📊 Tracking & Analytics

- **Attendance** - Record and track student attendance
- **Results** - Store exam and assignment scores
- **Dashboard Charts** - Visual analytics with Recharts
- **User Statistics** - Count charts for all user types

### 🎨 Modern UI/UX

- **Dark Theme** - Sleek dark mode interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Framer Motion Animations** - Smooth page transitions
- **Interactive Calendar** - React Big Calendar integration

## 🛠️ Tech Stack

| Category             | Technology                          |
| -------------------- | ----------------------------------- |
| **Framework**        | Next.js 16 (App Router)             |
| **Language**         | TypeScript 5                        |
| **Styling**          | Tailwind CSS 4                      |
| **Database**         | PostgreSQL (Supabase)               |
| **ORM**              | Prisma 7.1                          |
| **Authentication**   | Better Auth 1.4.6                   |
| **File Upload**      | UploadThing + Cloudinary            |
| **Security**         | Arcjet (Rate limiting & protection) |
| **State Management** | TanStack Query                      |
| **Forms**            | React Hook Form + Zod               |
| **Charts**           | Recharts                            |
| **Animations**       | Framer Motion                       |
| **Icons**            | Lucide React, Tabler Icons          |

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase account)

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/CJBLACK24/School-Management-System.git
   cd school-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # Database (Supabase)
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-key"

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Security
   ARCJET_KEY="your-arcjet-key"

   # File Upload
   CLOUDINARY_URL="cloudinary://..."
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
school-management-system/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── admin/           # Admin dashboard
│   │   ├── teacher/         # Teacher dashboard
│   │   ├── student/         # Student dashboard
│   │   ├── parent/          # Parent dashboard
│   │   └── list/            # Data list pages
│   └── api/                 # API routes
│       ├── auth/            # Better Auth routes
│       ├── arcjet/          # Security middleware
│       └── uploadthing/     # File upload routes
├── components/              # React components
│   ├── forms/              # Form components
│   ├── ui/                 # UI primitives
│   └── ...                 # Feature components
├── lib/                    # Utilities and configurations
│   ├── actions.ts          # Server actions (CRUD)
│   ├── auth.ts             # Better Auth config
│   ├── prisma.ts           # Prisma client
│   └── formValidationSchemas.ts  # Zod schemas
├── prisma/                 # Database schema
│   ├── schema.prisma
│   └── seed.ts
└── providers/              # React providers
```

## 🔧 Available Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run start`          | Start production server  |
| `npm run lint`           | Run ESLint               |
| `npx prisma studio`      | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations  |
| `npx prisma db seed`     | Seed the database        |

## 🗃️ Database Schema

The system uses the following main entities:

- **User/Session/Account** - Authentication (Better Auth)
- **Admin** - Administrator accounts
- **Teacher** - Teacher profiles with subjects
- **Student** - Student records with class/grade
- **Parent** - Parent accounts linked to students
- **Class** - Classes with capacity and supervisor
- **Subject** - Academic subjects
- **Grade** - Grade levels
- **Lesson** - Scheduled lessons
- **Exam** - Examinations
- **Assignment** - Homework/assignments
- **Result** - Scores for exams/assignments
- **Attendance** - Student attendance records
- **Event** - School events
- **Announcement** - Announcements

## 🚀 Deployment

### Docker

```bash
# Build the image
docker build -t school-management-system .

# Run the container
docker run -p 3000:3000 school-management-system
```

### Docker Compose

```bash
docker-compose up -d
```

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Christian Duque**

---

Made with ❤️ using Next.js and modern web technologies.
