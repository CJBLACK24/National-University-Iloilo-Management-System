"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import SelectField from "../SelectField";
import {
  attendanceSchema,
  AttendanceSchema,
} from "@/lib/formValidationSchemas";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AttendanceForm = ({
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
  } = useForm<AttendanceSchema>({
    resolver: zodResolver(attendanceSchema) as any,
  });

  const [state, formAction] = useActionState(
    type === "create" ? createAttendance : updateAttendance,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `Attendance has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { students, lessons } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Record attendance" : "Update attendance"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
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
        <InputField
          label="Date"
          name="date"
          type="datetime-local"
          defaultValue={data?.date?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.date}
        />

        <SelectField
          label="Present"
          name="present"
          register={register}
          defaultValue={data?.present ? "true" : "false"}
          error={errors.present}
          inputProps={{
            ...register("present", { setValueAs: (v: string) => v === "true" }),
          }}
        >
          <option value="true">Present</option>
          <option value="false">Absent</option>
        </SelectField>

        <SelectField
          label="Student"
          name="studentId"
          register={register}
          defaultValue={data?.studentId}
          error={errors.studentId}
        >
          <option value="">Select student</option>
          {students?.map(
            (student: { id: string; name: string; surname: string }) => (
              <option value={student.id} key={student.id}>
                {student.name + " " + student.surname}
              </option>
            )
          )}
        </SelectField>

        <SelectField
          label="Lesson"
          name="lessonId"
          register={register}
          defaultValue={data?.lessonId}
          error={errors.lessonId}
        >
          <option value="">Select lesson</option>
          {lessons?.map((lesson: { id: number; name: string }) => (
            <option value={lesson.id} key={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </SelectField>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AttendanceForm;
