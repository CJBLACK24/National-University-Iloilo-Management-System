import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { Class, Student, Parent } from "@/prisma/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    select: { name: true, surname: true },
  });

  return {
    title: student
      ? `${student.name} ${student.surname} | NU Iloilo`
      : "Student Profile | NU Iloilo",
    description: "NU Iloilo Management System Student Profile",
  };
}

const SingleStudentPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const role = "admin";

  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
        parent: Parent;
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
      parent: true,
    },
  });

  if (!student) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <Link
        href="/list/students"
        className="w-fit p-2 rounded-md bg-lamaSky hover:bg-lamaSkyLight transition-all text-sm font-medium"
      >
        ← Back to Students
      </Link>

      <div className="flex flex-col xl:flex-row gap-4">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4 dark:bg-zinc-900 dark:border dark:border-zinc-800">
              <div className="w-1/3">
                <Image
                  src={student.img || "/noAvatar.png"}
                  alt=""
                  width={144}
                  height={144}
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold dark:text-white">
                    {student.name + " " + student.surname}
                  </h1>
                  {role === "admin" && (
                    <FormContainer
                      table="student"
                      type="update"
                      data={student}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  Student Profile Details
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium dark:text-zinc-300">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                      src="/blood.png"
                      alt=""
                      width={14}
                      height={14}
                      className="dark:invert"
                    />
                    <span>{student.bloodType}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                      src="/date.png"
                      alt=""
                      width={14}
                      height={14}
                      className="dark:invert"
                    />
                    <span>
                      {new Intl.DateTimeFormat("en-GB").format(
                        student.birthday
                      )}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    {/* Reusing mail icon or similar for ID/Username since no ID icon provided, or just text */}
                    <span className="font-bold text-zinc-500 dark:text-zinc-500">
                      ID:
                    </span>
                    <span>{student.username}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <span className="font-bold text-zinc-500 dark:text-zinc-500">
                      Sex:
                    </span>
                    <span>{student.sex}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <span className="font-bold text-zinc-500 dark:text-zinc-500">
                      Enrolled:
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("en-GB").format(
                        student.createdAt
                      )}
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                      src="/mail.png"
                      alt=""
                      width={14}
                      height={14}
                      className="dark:invert"
                    />
                    <span>{student.email || "-"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image
                      src="/phone.png"
                      alt=""
                      width={14}
                      height={14}
                      className="dark:invert"
                    />
                    <span>{student.phone || "-"}</span>
                  </div>
                  <div className="w-full flex items-center gap-2">
                    {/* Address often long, give it full width */}
                    <span className="font-bold text-zinc-500 dark:text-zinc-500">
                      Address:
                    </span>
                    <span className="truncate">{student.address}</span>
                  </div>
                  {student.parent && (
                    <>
                      <div className="w-full flex items-center gap-2 mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                        <span className="font-bold text-zinc-500 dark:text-zinc-500">
                          Guardian:
                        </span>
                        <span>
                          {student.parent.name} {student.parent.surname}
                        </span>
                      </div>
                      <div className="w-full flex items-center gap-2">
                        <span className="font-bold text-zinc-500 dark:text-zinc-500">
                          Contact:
                        </span>
                        <span>{student.parent.phone}</span>
                      </div>
                      <div className="w-full flex items-center gap-2">
                        <span className="font-bold text-zinc-500 dark:text-zinc-500">
                          Address:
                        </span>
                        <span className="truncate">
                          {student.parent.address}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] dark:bg-zinc-900 dark:border dark:border-zinc-800">
                <Image
                  src="/singleAttendance.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 dark:invert"
                />
                <Suspense fallback="loading...">
                  <StudentAttendanceCard id={student.id} />
                </Suspense>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] dark:bg-zinc-900 dark:border dark:border-zinc-800">
                <Image
                  src="/singleBranch.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 dark:invert"
                />
                <div className="">
                  <h1 className="text-xl font-semibold dark:text-white">
                    {student.class.name.charAt(0)}th
                  </h1>
                  <span className="text-sm text-gray-400">Grade</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] dark:bg-zinc-900 dark:border dark:border-zinc-800">
                <Image
                  src="/singleLesson.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 dark:invert"
                />
                <div className="">
                  <h1 className="text-xl font-semibold dark:text-white">
                    {student.class._count.lessons}
                  </h1>
                  <span className="text-sm text-gray-400">Lessons</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] dark:bg-zinc-900 dark:border dark:border-zinc-800">
                <Image
                  src="/singleClass.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 dark:invert"
                />
                <div className="">
                  <h1 className="text-xl font-semibold dark:text-white">
                    {student.class.name}
                  </h1>
                  <span className="text-sm text-gray-400">Class</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 h-[800px] dark:bg-zinc-900 dark:border dark:border-zinc-800">
            <h1 className="dark:text-white mb-4">Student&apos;s Schedule</h1>
            <BigCalendarContainer type="classId" id={student.class.id} />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md dark:bg-zinc-900 dark:border dark:border-zinc-800">
            <h1 className="text-xl font-semibold dark:text-white">Shortcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
              <Link
                className="p-3 rounded-md bg-lamaSkyLight dark:bg-zinc-800 dark:text-zinc-300"
                href={`/list/lessons?classId=${student.class.id}`}
              >
                Student&apos;s Lessons
              </Link>
              <Link
                className="p-3 rounded-md bg-lamaPurpleLight dark:bg-zinc-800 dark:text-zinc-300"
                href={`/list/teachers?classId=${student.class.id}`}
              >
                Student&apos;s Teachers
              </Link>
              <Link
                className="p-3 rounded-md bg-pink-50 dark:bg-zinc-800 dark:text-zinc-300"
                href={`/list/exams?classId=${student.class.id}`}
              >
                Student&apos;s Exams
              </Link>
              <Link
                className="p-3 rounded-md bg-lamaSkyLight dark:bg-zinc-800 dark:text-zinc-300"
                href={`/list/assignments?classId=${student.class.id}`}
              >
                Student&apos;s Assignments
              </Link>
              <Link
                className="p-3 rounded-md bg-lamaYellowLight dark:bg-zinc-800 dark:text-zinc-300"
                href={`/list/results?studentId=${student.id}`}
              >
                Student&apos;s Results
              </Link>
            </div>
          </div>
          <Performance />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default SingleStudentPage;
