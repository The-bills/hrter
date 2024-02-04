import { ImageIcon } from "../assets/icons";
import { useRef } from "react";

type Props = {
  className?: string;
  file?: File;
  onUpload?: (value?: File) => void;
};

export const FileDrop = (p: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: any) => {
    const value = e.target.files?.[0];
    if (!value) return;
    p.onUpload?.(value);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const value = e.dataTransfer.files?.[0];
    if (!value) return;
    p.onUpload?.(value);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`border-2 border-dashed max-w-2xl h-2xl flex flex-col items-center rounded-lg p-8 text-slate-600 cursor-pointer ${p.className}`}
    >
      <div className="">
        <ImageIcon className="h-8 w-8" />
      </div>
      {p.file ? (
        <div className="text-sm mt-3">{p.file?.name}</div>
      ) : (
        <>
          <div className="text-sm mt-3">Upload a file or drag and drop</div>
          <div className="text-xs">PDF files up to 10MB</div>
        </>
      )}
      <input type="file" hidden ref={inputRef} onChange={handleUpload} />
    </div>
  );
};
