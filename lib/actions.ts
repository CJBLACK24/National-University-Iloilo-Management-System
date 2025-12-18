"use server";

import { revalidatePath } from "next/cache";
import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
  ParentSchema,
  LessonSchema,
  AssignmentSchema,
  AttendanceSchema,
  ResultSchema,
  EventSchema,
  AnnouncementSchema,
  GradeSchema,
} from "./formValidationSchemas";
import { auth } from "./auth";
import prisma from "./prisma";

export type CurrentState = {
  success: boolean;
  error: boolean;
  message?: string;
};

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to create subject" };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update subject" };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to delete subject" };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to create class" };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update class" };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/classes");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true, message: "Failed to delete class" };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const userId = crypto.randomUUID();
      const teacherUsername =
        data.username ||
        `TEACHER-${Math.floor(100000 + Math.random() * 900000)}`;

      const user = await tx.user.create({
        data: {
          id: userId,
          username: teacherUsername,
          email: data.email || `${teacherUsername}@nu-iloilo.edu.ph`,
          name: `${data.name} ${data.surname}`,
          role: "teacher",
        },
      });

      return await tx.teacher.create({
        data: {
          id: userId,
          userId: user.id,
          username: teacherUsername,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          img: data.img || null,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          subjects: {
            connect: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });
    });

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to create teacher:", err);
    return { success: false, error: true, message: "Failed to create teacher" };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!teacher) return { success: false, error: true };

    await prisma.$transaction([
      prisma.user.update({
        where: { id: teacher.userId },
        data: {
          ...(data.username && { username: data.username }),
          email: data.email || undefined,
          name: `${data.name} ${data.surname}`,
        },
      }),
      prisma.teacher.update({
        where: { id: data.id },
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          img: data.img || null,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          subjects: {
            set: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      }),
    ]);

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to update teacher:", err);
    return { success: false, error: true, message: "Failed to update teacher" };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!teacher) return { success: false, error: true };

    await prisma.user.delete({ where: { id: teacher.userId } });

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to delete teacher:", err);
    return { success: false, error: true, message: "Failed to delete teacher" };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Atomically check and increment class enrollment
      const updatedRows = await tx.$executeRaw`
        UPDATE "Class"
        SET "currentEnrollment" = "currentEnrollment" + 1
        WHERE id = ${data.classId} AND capacity > "currentEnrollment"
      `;

      if (updatedRows === 0) {
        throw new Error("Class is full or does not exist");
      }

      // 2. Create User record for Better Auth
      const userId = crypto.randomUUID();
      const studentUsername =
        data.username ||
        `STUDENT-${Math.floor(100000 + Math.random() * 900000)}`;

      const user = await tx.user.create({
        data: {
          id: userId,
          username: studentUsername,
          email: data.email || `${studentUsername}@nu-iloilo.edu.ph`,
          name: `${data.name} ${data.surname}`,
          role: "student",
        },
      });

      // 3. Create Student record
      return await tx.student.create({
        data: {
          id: userId,
          userId: user.id,
          username: studentUsername,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          img: data.img || null,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          gradeId: data.gradeId,
          classId: data.classId,
          parentId: data.parentId,
        },
      });
    });

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to create student:", err);
    return {
      success: false,
      error: true,
      message: err instanceof Error ? err.message : "Something went wrong!",
    };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  if (!data.id) {
    return { success: false, error: true, message: "Student ID is required" };
  }
  try {
    const student = await prisma.student.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!student)
      return { success: false, error: true, message: "Student not found" };

    await prisma.$transaction([
      prisma.user.update({
        where: { id: student.userId },
        data: {
          ...(data.username && { username: data.username }),
          email: data.email || undefined,
          name: `${data.name} ${data.surname}`,
        },
      }),
      prisma.student.update({
        where: { id: data.id },
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          address: data.address,
          img: data.img || null,
          bloodType: data.bloodType,
          sex: data.sex,
          birthday: data.birthday,
          gradeId: data.gradeId,
          classId: data.classId,
          parentId: data.parentId,
        },
      }),
    ]);

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to update student:", err);
    return { success: false, error: true, message: "Failed to update student" };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const student = await prisma.student.findUnique({
      where: { id },
      select: { userId: true, classId: true },
    });

    if (!student)
      return { success: false, error: true, message: "Student not found" };

    await prisma.$transaction([
      prisma.user.delete({ where: { id: student.userId } }),
      prisma.class.update({
        where: { id: student.classId },
        data: { currentEnrollment: { decrement: 1 } },
      }),
    ]);

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to delete student:", err);
    return { success: false, error: true, message: "Failed to delete student" };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
      },
    });

    revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// ==================== PARENT CRUD ====================

export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const userId = crypto.randomUUID();
      const parentUsername =
        data.username ||
        `PARENT-${Math.floor(100000 + Math.random() * 900000)}`;

      const user = await tx.user.create({
        data: {
          id: userId,
          username: parentUsername,
          email: data.email || `${parentUsername}@nu-iloilo.edu.ph`,
          name: `${data.name} ${data.surname}`,
          role: "parent",
        },
      });

      return await tx.parent.create({
        data: {
          id: userId,
          userId: user.id,
          username: parentUsername,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone,
          address: data.address,
        },
      });
    });

    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to create parent:", err);
    return { success: false, error: true, message: "Failed to create parent" };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const parent = await prisma.parent.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!parent) return { success: false, error: true };

    await prisma.$transaction([
      prisma.user.update({
        where: { id: parent.userId },
        data: {
          ...(data.username && { username: data.username }),
          email: data.email || undefined,
          name: `${data.name} ${data.surname}`,
        },
      }),
      prisma.parent.update({
        where: { id: data.id },
        data: {
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone,
          address: data.address,
        },
      }),
    ]);

    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to update parent:", err);
    return { success: false, error: true, message: "Failed to update parent" };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    const parent = await prisma.parent.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!parent) return { success: false, error: true };

    await prisma.user.delete({ where: { id: parent.userId } });

    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Failed to delete parent:", err);
    return { success: false, error: true, message: "Failed to delete parent" };
  }
};

// ==================== LESSON CRUD ====================

export const createLesson = async (
  currentState: CurrentState,
  data: LessonSchema
) => {
  try {
    await prisma.lesson.create({
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    revalidatePath("/list/lessons");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to create lesson" };
  }
};

export const updateLesson = async (
  currentState: CurrentState,
  data: LessonSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    await prisma.lesson.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    revalidatePath("/list/lessons");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update lesson" };
  }
};

export const deleteLesson = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.lesson.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/lessons");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to delete lesson" };
  }
};

// ==================== ASSIGNMENT CRUD ====================

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  try {
    await prisma.assignment.create({
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to create assignment",
    };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema
) => {
  if (!data.id) {
    return {
      success: false,
      error: true,
      message: "Assignment ID is required",
    };
  }
  try {
    await prisma.assignment.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startDate: data.startDate,
        dueDate: data.dueDate,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to update assignment",
    };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/assignments");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to delete assignment",
    };
  }
};

// ==================== ATTENDANCE CRUD ====================

export const createAttendance = async (
  currentState: CurrentState,
  data: AttendanceSchema
) => {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "teacher")
  ) {
    return { success: false, error: true, message: "Unauthorized" };
  }

  try {
    await prisma.attendance.create({
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/attendance");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Attendance creation failed:", err);
    return {
      success: false,
      error: true,
      message: "Failed to create attendance",
    };
  }
};

export const updateAttendance = async (
  currentState: CurrentState,
  data: AttendanceSchema
) => {
  if (!data.id) {
    return {
      success: false,
      error: true,
      message: "Attendance ID is required",
    };
  }
  try {
    await prisma.attendance.update({
      where: {
        id: data.id,
      },
      data: {
        date: data.date,
        present: data.present,
        studentId: data.studentId,
        lessonId: data.lessonId,
      },
    });

    revalidatePath("/list/attendance");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to update attendance",
    };
  }
};

export const deleteAttendance = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.attendance.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/attendance");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to delete attendance",
    };
  }
};

// ==================== RESULT CRUD ====================

export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((h) => h.headers()),
  });
  if (
    !session ||
    (session.user.role !== "admin" && session.user.role !== "teacher")
  ) {
    return { success: false, error: true, message: "Unauthorized" };
  }

  try {
    await prisma.result.create({
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    });

    revalidatePath("/list/results");
    return { success: true, error: false };
  } catch (err: any) {
    console.error("Result creation failed:", err);
    return { success: false, error: true, message: "Failed to create result" };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema
) => {
  if (!data.id) {
    return { success: false, error: true, message: "Result ID is required" };
  }
  try {
    await prisma.result.update({
      where: {
        id: data.id,
      },
      data: {
        score: data.score,
        examId: data.examId || null,
        assignmentId: data.assignmentId || null,
        studentId: data.studentId,
      },
    });

    revalidatePath("/list/results");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update result" };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.result.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/results");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to delete result" };
  }
};

// ==================== EVENT CRUD ====================

export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to create event" };
  }
};

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  if (!data.id) {
    return { success: false, error: true, message: "Event ID is required" };
  }
  try {
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update event" };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/events");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to delete event" };
  }
};

// ==================== ANNOUNCEMENT CRUD ====================

export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/announcements");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to create announcement",
    };
  }
};

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema
) => {
  if (!data.id) {
    return {
      success: false,
      error: true,
      message: "Announcement ID is required",
    };
  }
  try {
    await prisma.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        classId: data.classId || null,
      },
    });

    revalidatePath("/list/announcements");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to update announcement",
    };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.announcement.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/announcements");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to delete announcement",
    };
  }
};

// ==================== GRADE CRUD ====================

export const createGrade = async (
  currentState: CurrentState,
  data: GradeSchema
) => {
  try {
    await prisma.grade.create({
      data: {
        level: data.level,
      },
    });

    revalidatePath("/list/grades");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to create grade",
    };
  }
};

export const updateGrade = async (
  currentState: CurrentState,
  data: GradeSchema
) => {
  if (!data.id) {
    return { success: false, error: true, message: "Grade ID is required" };
  }
  try {
    await prisma.grade.update({
      where: {
        id: data.id,
      },
      data: {
        level: data.level,
      },
    });

    revalidatePath("/list/grades");
    return { success: true, error: false };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: true, message: "Failed to update grade" };
  }
};

export const deleteGrade = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.grade.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/list/grades");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Failed to delete grade",
    };
  }
};
