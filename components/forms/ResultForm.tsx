"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { resultSchema, ResultSchema } from "@/lib/formValidationSchemas";
import { createResult, updateResult } from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResultForm = ({
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
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema) as any,
  });

  const [state, formAction] = useActionState(
    type === "create" ? createResult : updateResult,
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
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { students, exams, assignments } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Record a new result" : "Update the result"}
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
          label="Score"
          name="score"
          type="number"
          defaultValue={data?.score}
          register={register}
          error={errors?.score}
        />

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
          label="Exam (Optional)"
          name="examId"
          register={register}
          defaultValue={data?.examId || ""}
          error={errors.examId}
        >
          <option value="">No exam</option>
          {exams?.map((exam: { id: number; title: string }) => (
            <option value={exam.id} key={exam.id}>
              {exam.title}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Assignment (Optional)"
          name="assignmentId"
          register={register}
          defaultValue={data?.assignmentId || ""}
          error={errors.assignmentId}
        >
          <option value="">No assignment</option>
          {assignments?.map((assignment: { id: number; title: string }) => (
            <option value={assignment.id} key={assignment.id}>
              {assignment.title}
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

export default ResultForm;
