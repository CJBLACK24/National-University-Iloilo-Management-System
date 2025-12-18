"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import SelectField from "../SelectField";
import {
  assignmentSchema,
  AssignmentSchema,
} from "@/lib/formValidationSchemas";
import {
  createAssignment,
  updateAssignment,
  CurrentState,
} from "@/lib/actions";
import { Dispatch, SetStateAction, useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AssignmentForm = ({
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
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema) as any,
  });

  const [state, formAction] = useActionState<CurrentState, any>(
    type === "create" ? createAssignment : updateAssignment,
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
      toast(
        `Assignment has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { lessons } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Create a new assignment"
          : "Update the assignment"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
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
        <InputField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          defaultValue={data?.startDate?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.startDate}
        />
        <InputField
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          defaultValue={data?.dueDate?.toISOString().slice(0, 16)}
          register={register}
          error={errors?.dueDate}
        />

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

export default AssignmentForm;
