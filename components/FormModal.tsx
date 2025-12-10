"use client";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import React from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  // TODO: OTHER DELETE ACTIONS
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

// USE LAZY LOADING
const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <div className="text-white">Loading...</div>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <div className="text-white">Loading...</div>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <div className="text-white">Loading...</div>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <div className="text-white">Loading...</div>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <div className="text-white">Loading...</div>,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => React.ReactNode;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-purple-600 hover:bg-purple-500"
      : type === "update"
      ? "bg-blue-600 hover:bg-blue-500"
      : "bg-red-600 hover:bg-red-500";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium text-white">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md border-none w-max self-center transition-colors">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  const Icon = type === "create" ? Plus : type === "update" ? Pencil : Trash2;

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor} transition-colors`}
        onClick={() => setOpen(true)}
      >
        <Icon className="w-4 h-4 text-white" />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] shadow-2xl">
            <Form />
            <button
              className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
