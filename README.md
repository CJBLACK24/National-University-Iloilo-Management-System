<div align="center">

# 🎓 NU Iloilo Management System

<img src="https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge" alt="Version"/>

### A comprehensive university management system with real-time features

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Better Auth](https://img.shields.io/badge/Better_Auth-1.4.6-purple?style=flat-square)](https://better-auth.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=flat-square&logo=postgresql&logoColor=white)](https://supabase.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Enabled-3448C5?style=flat-square&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

<br />

[Features](#-features) •
[Tech Stack](#%EF%B8%8F-tech-stack) •
[Installation](#-installation) •
[Project Structure](#-project-structure) •
[API Reference](#-api-reference) •
[Contributing](#-contributing)

---

</div>

## 🌟 Overview

The **NU Iloilo Management System** is a full-featured, production-ready university management platform that provides role-based dashboards for **administrators**, **teachers**, **students**, and **parents**. Built with modern web technologies and featuring real-time messaging, dynamic charts, and a sleek dark theme interface.

> 💡 **Key Highlight**: This system features real-time chat functionality powered by Socket.io, interactive calendars with React Big Calendar, and comprehensive CRUD operations for all academic entities.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👥 User Management

| Feature            | Description                           |
| ------------------ | ------------------------------------- |
| 🔐 Multi-role Auth | Admin, Teacher, Student, Parent roles |
| 🔑 Better Auth     | Secure email/password + Google OAuth  |
| 🛡️ RBAC            | Role-based access control for routes  |
| 👤 User Profiles   | Comprehensive profile management      |

### 📚 Academic Management

| Feature     | Description                           |
| ----------- | ------------------------------------- |
| 🎓 Students | Complete records with class & grades  |
| 👨‍🏫 Teachers | Profiles with subject specializations |
| 👨‍👩‍👧 Parents  | Accounts linked to student records    |
| 🏛️ Classes  | Capacity tracking & supervision       |
| 📖 Subjects | Teacher assignments & catalog         |
| 📊 Grades   | Multi-level grade management          |

</td>
<td width="50%">

### 📅 Scheduling & Events

| Feature          | Description                     |
| ---------------- | ------------------------------- |
| 📝 Lessons       | Day/time scheduling by subject  |
| 🧪 Exams         | Examination schedule management |
| 📋 Assignments   | Track with due dates            |
| 🎉 Events        | School-wide & class-specific    |
| 📢 Announcements | Broadcast to classes            |

### 📊 Analytics & Tracking

| Feature          | Description                    |
| ---------------- | ------------------------------ |
| 📈 Attendance    | Record & track presence        |
| 🏆 Results       | Exam & assignment scores       |
| 📉 Charts        | Visual analytics with Recharts |
| 🔢 Statistics    | Count charts for all users     |
| 💹 Finance Chart | Financial overview             |

</td>
</tr>
</table>

### 💬 Real-Time Messaging System

```
┌─────────────────────────────────────────────────────────────────┐
│  💬 Chat Interface                                               │
├─────────────────────────────────────────────────────────────────┤
│  ✅ Real-time messaging with Socket.io                          │
│  ✅ User search functionality                                    │
│  ✅ Image attachment support via Cloudinary                      │
│  ✅ Conversation management                                      │
│  ✅ Friend system (pending/accepted/rejected)                    │
│  ✅ Message history persistence                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 🎨 Modern UI/UX

- 🌙 **Dark Theme** — Sleek dark mode interface with gradient accents
- 📱 **Responsive** — Works seamlessly on desktop, tablet, and mobile
- 🎭 **Animations** — Smooth page transitions with Framer Motion
- 📅 **Calendar** — Interactive React Big Calendar integration
- 🔔 **Notifications** — Real-time notification dropdown
- 👤 **Profile Dropdown** — Quick access profile management

---

## 🛠️ Tech Stack

<div align="center">

### Core Framework

|                                                  Technology                                                   | Version | Purpose                                    |
| :-----------------------------------------------------------------------------------------------------------: | :-----: | :----------------------------------------- |
|     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="30"/>     | 16.0.10 | Full-stack React framework with App Router |
|      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30"/>      |  19.2   | UI library with latest concurrent features |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="30"/> |    5    | Type-safe JavaScript                       |

### Database & ORM

|                                                  Technology                                                   | Version | Purpose                          |
| :-----------------------------------------------------------------------------------------------------------: | :-----: | :------------------------------- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="30"/> | Latest  | Relational database via Supabase |
|                    <img src="https://www.prisma.io/images/favicon-32x32.png" width="30"/>                     |   7.1   | Next-gen ORM with type safety    |

### Styling & UI

|                                                   Technology                                                    | Version | Purpose                     |
| :-------------------------------------------------------------------------------------------------------------: | :-----: | :-------------------------- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="30"/> |    4    | Utility-first CSS framework |
|                                                  Framer Motion                                                  |  12.23  | Declarative animations      |
|                                                 Lucide + Tabler                                                 | Latest  | Modern icon libraries       |

</div>

### 📦 Complete Dependencies

<details>
<summary><b>🔽 Click to expand full dependency list</b></summary>

#### Production Dependencies

```json
{
  "@arcjet/next": "^1.0.0-beta.15", // Security & rate limiting
  "@prisma/client": "^7.1.0", // Database client
  "@tanstack/react-query": "^5.90.12", // Server state management
  "better-auth": "^1.4.6", // Authentication
  "framer-motion": "^12.23.25", // Animations
  "next": "16.0.10", // Framework
  "next-cloudinary": "^6.13.0", // Image upload
  "react": "^19.2.1", // UI library
  "react-big-calendar": "^1.13.2", // Calendar component
  "react-hook-form": "^7.68.0", // Form handling
  "recharts": "^2.15.4", // Charts
  "socket.io": "^4.8.1", // Real-time server
  "socket.io-client": "^4.8.1", // Real-time client
  "uploadthing": "^7.7.4", // File uploads
  "zod": "^4.1.13" // Schema validation
}
```

#### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4.1.17",
  "eslint": "^9.39.1",
  "prisma": "^7.1.0",
  "tailwindcss": "^4.1.17",
  "typescript": "^5"
}
```

</details>

---

## 🚀 Installation

### Prerequisites

```bash
# Required
✅ Node.js 18+ (LTS Recommended)
✅ npm or yarn package manager
✅ PostgreSQL database (or Supabase account)
```

### ⚡ Quick Start

<table>
<tr>
<td>

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/CJBLACK24/National-University-Iloilo-Management-System.git
cd National-University-Iloilo-Management-System
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Configure Environment

Create a `.env` file in the root directory:

</td>
</tr>
</table>

<details>
<summary><b>📄 Environment Variables Template</b></summary>

```env
# ===============================
# 🔐 Authentication
# ===============================
BETTER_AUTH_SECRET="your-32-character-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ===============================
# 🗄️ Database (Supabase PostgreSQL)
# ===============================
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-anon-key"

# ===============================
# 🔑 Google OAuth (Optional)
# ===============================
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"

# ===============================
# 🛡️ Security (Arcjet)
# ===============================
ARCJET_KEY="ajkey_your-arcjet-key"

# ===============================
# 📁 File Upload (Cloudinary)
# ===============================
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

</details>

#### 4️⃣ Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed with sample data
npx prisma db seed
```

#### 5️⃣ Start Development Server

```bash
npm run dev
```

<div align="center">

### 🎉 Open [http://localhost:3000](http://localhost:3000) in your browser!

</div>

---

## 📁 Project Structure

```
📦 NU-Iloilo-Management-System
├── 📂 app/                          # Next.js App Router
│   ├── 📂 (auth)/                   # Authentication routes
│   │   ├── 📂 sign-in/              # Login page
│   │   └── 📂 sign-up/              # Registration page
│   ├── 📂 (dashboard)/              # Protected dashboard
│   │   ├── 📂 admin/                # 👨‍💼 Admin dashboard
│   │   ├── 📂 teacher/              # 👨‍🏫 Teacher dashboard
│   │   ├── 📂 student/              # 🎓 Student dashboard
│   │   ├── 📂 parent/               # 👨‍👩‍👧 Parent dashboard
│   │   ├── 📂 visitor/              # 👤 Visitor view
│   │   ├── 📂 profile/              # 👤 User profile
│   │   ├── 📂 settings/             # ⚙️ Settings page
│   │   └── 📂 list/                 # 📋 Data list pages
│   │       ├── 📂 students/
│   │       ├── 📂 teachers/
│   │       ├── 📂 parents/
│   │       ├── 📂 classes/
│   │       ├── 📂 subjects/
│   │       ├── 📂 lessons/
│   │       ├── 📂 exams/
│   │       ├── 📂 assignments/
│   │       ├── 📂 attendance/
│   │       ├── 📂 results/
│   │       ├── 📂 events/
│   │       ├── 📂 announcements/
│   │       ├── 📂 grades/
│   │       └── 📂 messages/         # 💬 Chat interface
│   └── 📂 api/                      # API routes
│       ├── 📂 auth/                 # Better Auth endpoints
│       ├── 📂 arcjet/               # Security middleware
│       └── 📂 uploadthing/          # File upload handlers
│
├── 📂 components/                   # React components
│   ├── 📂 forms/                    # 📝 Form components (13 forms)
│   │   ├── StudentForm.tsx
│   │   ├── TeacherForm.tsx
│   │   ├── ParentForm.tsx
│   │   ├── ClassForm.tsx
│   │   ├── SubjectForm.tsx
│   │   ├── LessonForm.tsx
│   │   ├── ExamForm.tsx
│   │   ├── AssignmentForm.tsx
│   │   ├── AttendanceForm.tsx
│   │   ├── ResultForm.tsx
│   │   ├── EventForm.tsx
│   │   ├── AnnouncementForm.tsx
│   │   └── GradeForm.tsx
│   ├── 📂 ui/                       # 🎨 UI primitives (10 components)
│   │   ├── sidebar.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── table.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   ├── notification-dropdown.tsx
│   │   ├── profile-dropdown.tsx
│   │   └── shimmer-button.tsx
│   ├── ChatInterface.tsx            # 💬 Real-time chat
│   ├── EventCalendar.tsx            # 📅 Calendar widget
│   ├── BigCalender.tsx              # 📆 Full calendar view
│   ├── Navbar.tsx                   # 🧭 Navigation bar
│   ├── Menu.tsx                     # 📑 Sidebar menu
│   ├── CountChart.tsx               # 📊 Statistics chart
│   ├── AttendanceChart.tsx          # 📈 Attendance visual
│   ├── FinanceChart.tsx             # 💰 Finance overview
│   ├── GradeChart.tsx               # 📉 Grade distribution
│   ├── FormModal.tsx                # 🔲 Modal forms
│   ├── Pagination.tsx               # 📄 Page navigation
│   └── ...                          # More components
│
├── 📂 lib/                          # Utilities & configs
│   ├── 📂 actions/                  # Server actions
│   │   └── chat.ts                  # Chat server actions
│   ├── actions.ts                   # CRUD operations (1000+ lines)
│   ├── auth.ts                      # Better Auth config
│   ├── auth-client.ts               # Auth client
│   ├── prisma.ts                    # Prisma client
│   ├── formValidationSchemas.ts     # Zod schemas
│   ├── data.ts                      # Data fetching utilities
│   ├── socket-server.ts             # Socket.io server
│   └── utils.ts                     # Helper functions
│
├── 📂 prisma/                       # Database
│   ├── schema.prisma                # Database schema (297 lines)
│   ├── 📂 generated/                # Generated Prisma client
│   └── seed.ts                      # Database seeding
│
├── 📂 hooks/                        # Custom React hooks
│   └── use-socket.ts                # Socket.io hook
│
├── 📂 providers/                    # React context providers
│   ├── query-provider.tsx           # TanStack Query
│   └── socket-provider.tsx          # Socket.io context
│
└── 📂 public/                       # Static assets
```

---

## 🗃️ Database Schema

<details>
<summary><b>📊 Entity Relationship Diagram</b></summary>

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE SCHEMA                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐                          │
│   │   User    │       │  Session  │       │  Account  │                          │
│   │───────────│       │───────────│       │───────────│                          │
│   │ id        │◄──────│ userId    │       │ userId    │──────►│ User │           │
│   │ email     │       │ token     │       │ providerId│                          │
│   │ role      │       │ expiresAt │       │ accessToken│                         │
│   └───────────┘       └───────────┘       └───────────┘                          │
│                                                                                   │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐      │
│   │  Student  │       │  Teacher  │       │   Parent  │       │   Admin   │      │
│   │───────────│       │───────────│       │───────────│       │───────────│      │
│   │ id        │       │ id        │       │ id        │       │ id        │      │
│   │ name      │       │ name      │       │ name      │       │ username  │      │
│   │ classId   │──┐    │ subjects[]│       │ students[]│       └───────────┘      │
│   │ gradeId   │──┼─►  │ lessons[] │       └─────┬─────┘                          │
│   │ parentId  │──┼─►  └───────────┘             │                                │
│   └───────────┘  │                              │                                │
│         │        │                              └─────────►│ Student │           │
│         │        │                                                               │
│   ┌─────▼─────┐  │    ┌───────────┐       ┌───────────┐                          │
│   │   Class   │◄─┴────│  Lesson   │       │  Subject  │                          │
│   │───────────│       │───────────│◄──────│───────────│                          │
│   │ name      │       │ day       │       │ name      │                          │
│   │ capacity  │       │ startTime │       │ teachers[]│                          │
│   │ gradeId   │       │ teacherId │       └───────────┘                          │
│   │ supervisor│       │ subjectId │                                              │
│   └───────────┘       │ classId   │                                              │
│                       └─────┬─────┘                                              │
│                             │                                                    │
│   ┌───────────┐       ┌─────▼─────┐       ┌───────────┐                          │
│   │   Exam    │◄──────│Assignment │       │Attendance │                          │
│   │───────────│       │───────────│       │───────────│                          │
│   │ title     │       │ title     │       │ date      │                          │
│   │ lessonId  │       │ lessonId  │       │ present   │                          │
│   │ results[] │       │ results[] │       │ studentId │                          │
│   └───────────┘       └───────────┘       │ lessonId  │                          │
│                                           └───────────┘                          │
│   ┌───────────┐       ┌───────────┐       ┌───────────┐                          │
│   │   Event   │       │Announcement│      │   Result  │                          │
│   │───────────│       │───────────│       │───────────│                          │
│   │ title     │       │ title     │       │ score     │                          │
│   │ classId   │       │ classId   │       │ examId    │                          │
│   │ startTime │       │ date      │       │ studentId │                          │
│   └───────────┘       └───────────┘       └───────────┘                          │
│                                                                                   │
│   ┌──────────────────────────────────────────────────────────────────────┐       │
│   │                      MESSAGING SYSTEM                                 │       │
│   │──────────────────────────────────────────────────────────────────────│       │
│   │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐               │       │
│   │  │Conversation │◄───│ Participant │    │   Message   │               │       │
│   │  │─────────────│    │─────────────│    │─────────────│               │       │
│   │  │ id          │    │ conversationId   │ content     │               │       │
│   │  │ messages[]  │    │ userId      │    │ senderId    │               │       │
│   │  │ participants│    └─────────────┘    │ attachment  │               │       │
│   │  └─────────────┘                       └─────────────┘               │       │
│   │                                                                       │       │
│   │  ┌─────────────┐                                                     │       │
│   │  │   Friend    │   Status: PENDING | ACCEPTED | REJECTED             │       │
│   │  │─────────────│                                                     │       │
│   │  │ userId      │                                                     │       │
│   │  │ friendId    │                                                     │       │
│   │  │ status      │                                                     │       │
│   │  └─────────────┘                                                     │       │
│   └──────────────────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

</details>

### 📋 Entity Summary

| Entity           | Description            | Relationships                               |
| ---------------- | ---------------------- | ------------------------------------------- |
| **User**         | Auth users with roles  | Sessions, Accounts                          |
| **Admin**        | Administrator accounts | —                                           |
| **Teacher**      | Faculty members        | Subjects, Lessons, Classes                  |
| **Student**      | Enrolled students      | Parent, Class, Grade, Attendance, Results   |
| **Parent**       | Guardians              | Students (1:many)                           |
| **Class**        | Classrooms             | Grade, Supervisor, Students, Lessons        |
| **Subject**      | Academic subjects      | Teachers, Lessons                           |
| **Lesson**       | Scheduled sessions     | Subject, Class, Teacher, Exams, Assignments |
| **Exam**         | Examinations           | Lesson, Results                             |
| **Assignment**   | Homework               | Lesson, Results                             |
| **Attendance**   | Presence records       | Student, Lesson                             |
| **Event**        | Calendar events        | Class (optional)                            |
| **Announcement** | Notices                | Class (optional)                            |
| **Conversation** | Chat threads           | Participants, Messages                      |
| **Message**      | Chat messages          | Conversation, Attachments                   |
| **Friend**       | Social connections     | Status enum                                 |

---

## 📜 API Reference

### 🔐 Authentication Endpoints

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| `POST` | `/api/auth/sign-up/email`  | Register with email |
| `POST` | `/api/auth/sign-in/email`  | Login with email    |
| `POST` | `/api/auth/sign-in/social` | OAuth sign-in       |
| `POST` | `/api/auth/sign-out`       | Logout user         |
| `GET`  | `/api/auth/session`        | Get current session |

### 📂 File Upload Endpoints

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| `POST` | `/api/uploadthing` | Upload files |

### 🛡️ Security

- **Arcjet Integration** — Rate limiting and bot protection
- **Better Auth** — Session management and OAuth

---

## 🔧 Available Scripts

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `npm run dev`            | 🚀 Start development server with hot reload |
| `npm run build`          | 📦 Create production build                  |
| `npm run start`          | ▶️ Start production server                  |
| `npm run lint`           | 🔍 Run ESLint for code quality              |
| `npx prisma studio`      | 🗄️ Open database GUI                        |
| `npx prisma migrate dev` | 🔄 Run database migrations                  |
| `npx prisma generate`    | ⚙️ Generate Prisma client                   |
| `npx prisma db seed`     | 🌱 Seed database with sample data           |

---

## 🐳 Deployment

### Option 1: Docker

```bash
# Build the image
docker build -t nu-iloilo-management .

# Run the container
docker run -p 3000:3000 --env-file .env nu-iloilo-management
```

### Option 2: Docker Compose

```bash
docker-compose up -d
```

### Option 3: Vercel (Recommended) ✨

<table>
<tr>
<td>

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import in Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. **Configure Environment**

   - Add all environment variables
   - Set Build Command: `npx prisma generate && npm run build`

4. **Deploy!** 🎉

</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

```mermaid
graph LR
    A[Fork Repo] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Commit]
    D --> E[Push]
    E --> F[Open PR]
    F --> G[Review]
    G --> H[Merge]
```

### Steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### 📝 Commit Convention

| Type        | Description      |
| ----------- | ---------------- |
| `feat:`     | New feature      |
| `fix:`      | Bug fix          |
| `docs:`     | Documentation    |
| `style:`    | Formatting       |
| `refactor:` | Code refactoring |
| `test:`     | Adding tests     |
| `chore:`    | Maintenance      |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

## 👨‍💻 Author

**cjblack.dev**

[![GitHub](https://img.shields.io/badge/GitHub-CJBLACK24-181717?style=for-the-badge&logo=github)](https://github.com/CJBLACK24)

---

<br />

Made with ❤️ using **Next.js 16** and modern web technologies

<br />

[![Stars](https://img.shields.io/github/stars/CJBLACK24/National-University-Iloilo-Management-System?style=social)](https://github.com/CJBLACK24/National-University-Iloilo-Management-System)
[![Forks](https://img.shields.io/github/forks/CJBLACK24/National-University-Iloilo-Management-System?style=social)](https://github.com/CJBLACK24/National-University-Iloilo-Management-System/fork)

</div>
