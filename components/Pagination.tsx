"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="p-4 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        disabled={!hasPrev}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-800 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        onClick={() => changePage(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            disabled={pageNum === "..."}
            className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors ${
              pageNum === page
                ? "bg-purple-600 text-white"
                : pageNum === "..."
                ? "text-zinc-500 cursor-default"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
            onClick={() => typeof pageNum === "number" && changePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={!hasNext}
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-800 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        onClick={() => changePage(page + 1)}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
