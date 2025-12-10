import { z } from "zod";

// Common schemas
export const idSchema = z.string().min(1, "ID is required");
export const emailSchema = z.string().email("Invalid email address");
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number")
  .optional()
  .or(z.literal(""));
export const dateSchema = z.coerce.date();

// User Sex enum
export const userSexSchema = z.enum(["MALE", "FEMALE"]);

// Day enum
export const daySchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
]);

// Student schema
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),
  name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  email: emailSchema.optional().or(z.literal("")),
  phone: phoneSchema,
  address: z.string().min(1, "Address is required"),
  img: z.string().url().optional().or(z.literal("")),
  bloodType: z.string().min(1, "Blood type is required"),
  sex: userSexSchema,
  birthday: dateSchema,
  parentId: z.string().min(1, "Parent is required"),
  classId: z.coerce.number().min(1, "Class is required"),
  gradeId: z.coerce.number().min(1, "Grade is required"),
});

// Teacher schema
export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),
  name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  email: emailSchema.optional().or(z.literal("")),
  phone: phoneSchema,
  address: z.string().min(1, "Address is required"),
  img: z.string().url().optional().or(z.literal("")),
  bloodType: z.string().min(1, "Blood type is required"),
  sex: userSexSchema,
  birthday: dateSchema,
  subjects: z.array(z.coerce.number()).optional(),
});

// Parent schema
export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),
  name: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  email: emailSchema.optional().or(z.literal("")),
  phone: z.string().min(10, "Phone is required"),
  address: z.string().min(1, "Address is required"),
});

// Subject schema
export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Subject name is required"),
  teachers: z.array(z.string()).optional(),
});

// Class schema
export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Class name is required"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  gradeId: z.coerce.number().min(1, "Grade is required"),
  supervisorId: z.string().optional(),
});

// Lesson schema
export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Lesson name is required"),
  day: daySchema,
  startTime: dateSchema,
  endTime: dateSchema,
  subjectId: z.coerce.number().min(1, "Subject is required"),
  classId: z.coerce.number().min(1, "Class is required"),
  teacherId: z.string().min(1, "Teacher is required"),
});

// Exam schema
export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  startTime: dateSchema,
  endTime: dateSchema,
  lessonId: z.coerce.number().min(1, "Lesson is required"),
});

// Assignment schema
export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  startDate: dateSchema,
  dueDate: dateSchema,
  lessonId: z.coerce.number().min(1, "Lesson is required"),
});

// Result schema
export const resultSchema = z.object({
  id: z.coerce.number().optional(),
  score: z.coerce
    .number()
    .min(0, "Score must be positive")
    .max(100, "Score cannot exceed 100"),
  examId: z.coerce.number().optional(),
  assignmentId: z.coerce.number().optional(),
  studentId: z.string().min(1, "Student is required"),
});

// Event schema
export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startTime: dateSchema,
  endTime: dateSchema,
  classId: z.coerce.number().optional(),
});

// Announcement schema
export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: dateSchema,
  classId: z.coerce.number().optional(),
});

// Attendance schema
export const attendanceSchema = z.object({
  id: z.coerce.number().optional(),
  date: dateSchema,
  present: z.boolean(),
  studentId: z.string().min(1, "Student is required"),
  lessonId: z.coerce.number().min(1, "Lesson is required"),
});

// Type exports
export type StudentInput = z.infer<typeof studentSchema>;
export type TeacherInput = z.infer<typeof teacherSchema>;
export type ParentInput = z.infer<typeof parentSchema>;
export type SubjectInput = z.infer<typeof subjectSchema>;
export type ClassInput = z.infer<typeof classSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type ExamInput = z.infer<typeof examSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type ResultInput = z.infer<typeof resultSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type AnnouncementInput = z.infer<typeof announcementSchema>;
export type AttendanceInput = z.infer<typeof attendanceSchema>;
