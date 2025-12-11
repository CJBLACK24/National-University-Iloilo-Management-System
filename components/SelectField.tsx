import { FieldError } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SelectFieldProps = {
  label: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: any;
  children: React.ReactNode;
  inputProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  multiple?: boolean;
};

const SelectField = ({
  label,
  register,
  name,
  defaultValue,
  error,
  children,
  inputProps,
  multiple,
}: SelectFieldProps) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full md:w-[48%]")}>
      <Label htmlFor={name} className="text-zinc-500 dark:text-zinc-400">
        {label}
      </Label>
      <select
        id={name}
        {...register(name)}
        defaultValue={defaultValue}
        multiple={multiple}
        {...inputProps}
        className={cn(
          "flex h-10 w-full rounded-md border-none bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm text-black dark:text-white shadow-input transition duration-400 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_#404040]",
          multiple && "h-auto min-h-[100px]"
        )}
      >
        {children}
      </select>
      {error?.message && (
        <p className="text-xs text-red-500 font-medium">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default SelectField;
