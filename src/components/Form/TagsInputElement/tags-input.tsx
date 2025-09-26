import * as React from "react";
import { cn } from "@/lib/utils";

interface TagsInputProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  placeholder?: string;
  width?: string;
  parseInput?: (input: string) => T;
  inputType?: React.HTMLInputTypeAttribute; // e.g., "text" or "number"
}

export function TagsInput<T extends string | number>({
  value,
  onChange,
  placeholder,
  width = "w-full",
  parseInput,
  inputType = "text",
}: TagsInputProps<T>) {
  const [input, setInput] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTag: T = parseInput
        ? parseInput(input.trim())
        : (input.trim() as T);
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    }
  };

  const removeTag = (tag: T) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border rounded-md p-2",
        width?.includes("w-") && width
      )}
      style={!width?.includes("w-") ? { width } : undefined}
    >
      {value.map((tag) => (
        <span
          key={tag.toString()}
          className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-gray-600 hover:text-red-500"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type={inputType}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Enter tag"}
        className={cn(
          "flex-1 min-w-[50px] min-h-[30px] px-2 py-1 text-sm bg-gray-100 rounded outline-none",
          "placeholder:text-gray-400 focus:bg-gray-100"
        )}
        // className="flex-1 min-w-[100px] outline-none border-none bg-transparent"
      />
    </div>
  );
}
