import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  value: string;
  label: string;
  onChange: (v: string) => void;
  className?: string;
};

export const Textarea = (p: Props) => {
  return (
    <div className={`flex flex-col ${p.className ?? ""}`}>
      <label htmlFor="name" className="font-semibold text-sm text-gray-900">
        {p.label}
      </label>
      <textarea
        {...p}
        className="border rounded-md pt-2 pb-2 pl-3 pr-3 mt-2 text-sm"
        onChange={(e) => p.onChange?.(e.target.value)}
      />
    </div>
  );
};
