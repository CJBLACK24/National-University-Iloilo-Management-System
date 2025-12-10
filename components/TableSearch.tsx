"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-sm rounded-lg ring-[1.5px] ring-zinc-700 px-3 bg-zinc-900"
    >
      <Search className="w-4 h-4 text-zinc-500" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none text-white placeholder:text-zinc-500"
      />
    </form>
  );
};

export default TableSearch;
