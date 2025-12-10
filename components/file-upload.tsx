"use client";

import { UploadDropzone, UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: keyof OurFileRouter;
  value?: string;
  onChange: (url?: string) => void;
}

export function FileUpload({ endpoint, value, onChange }: FileUploadProps) {
  if (value) {
    const isImage = value.match(/\.(jpg|jpeg|png|gif|webp)$/i);

    return (
      <div className="relative">
        {isImage ? (
          <div className="relative h-40 w-40 rounded-full overflow-hidden">
            <Image fill src={value} alt="Upload" className="object-cover" />
          </div>
        ) : (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:underline"
          >
            View uploaded file
          </a>
        )}
        <button
          onClick={() => onChange(undefined)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
      appearance={{
        container:
          "border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-900",
        label: "text-zinc-400",
        allowedContent: "text-zinc-500",
        button:
          "bg-purple-600 hover:bg-purple-500 text-white rounded-lg px-4 py-2",
        uploadIcon: "text-zinc-500",
      }}
    />
  );
}

export function FileUploadButton({
  endpoint,
  onUploadComplete,
}: {
  endpoint: keyof OurFileRouter;
  onUploadComplete: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
      appearance={{
        button:
          "bg-purple-600 hover:bg-purple-500 text-white rounded-lg px-4 py-2",
        allowedContent: "hidden",
      }}
    />
  );
}
