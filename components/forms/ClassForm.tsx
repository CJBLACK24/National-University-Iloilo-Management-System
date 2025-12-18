"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import SelectField from "../SelectField";
import {
  classSchema,
  ClassSchema,
  subjectSchema,
  SubjectSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
  CurrentState,
} from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema) as any,
  });

  const [state, formAction] = useActionState<CurrentState, any>(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <div className="bg-zinc-800 p-4 rounded-md border border-zinc-700">
        <h2 className="text-sm font-semibold text-white mb-2">
          Expected Programs (NU Iloilo & Branches)
        </h2>
        <ul className="text-xs text-zinc-400 list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-1">
          <li>
            Accountancy, Business, and Management (BS Accountancy, BS Tourism)
          </li>
          <li>IT and Computer Science (BSIT, BSCS)</li>
          <li>Allied Health Sciences (BS Psych, BS MedTech, BS Nursing)</li>
          <li>Engineering and Architecture (BS Arch, BS Civil Eng)</li>
        </ul>
      </div>

      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <SelectField
          label="Supervisor"
          name="supervisorId"
          register={register}
          defaultValue={data?.supervisorId} // Fixed data mapping
          error={errors.supervisorId}
        >
          {teachers.map(
            (teacher: { id: string; name: string; surname: string }) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            )
          )}
        </SelectField>
        <SelectField
          label="Grade"
          name="gradeId"
          register={register}
          defaultValue={data?.gradeId}
          error={errors.gradeId}
        >
          {grades.map((grade: { id: number; level: number }) => (
            <option value={grade.id} key={grade.id}>
              {grade.level}
            </option>
          ))}
        </SelectField>
      </div>
      {state.error && (
        <span className="text-red-500">
          {state.message || "Something went wrong!"}
        </span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
