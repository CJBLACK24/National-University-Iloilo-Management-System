import { FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TextAreaFieldProps = {
  label: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const TextAreaField = ({
  label,
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: TextAreaFieldProps) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <Label htmlFor={name} className="text-zinc-500 dark:text-zinc-400">
        {label}
      </Label>
      <textarea
        id={name}
        {...register(name)}
        defaultValue={defaultValue}
        {...inputProps}
        className={cn(
          "flex min-h-[100px] w-full rounded-md border-none bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm text-black dark:text-white shadow-input transition duration-400 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_#404040]"
        )}
      />
      {error?.message && (
        <p className="text-xs text-red-500 font-medium">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
