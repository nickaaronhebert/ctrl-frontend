import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
  categories: string[] | undefined;
  selected: string;
  setSelected: (value: string) => void;
}

export default function CategorySelect({
  categories,
  selected,
  setSelected,
}: CategorySelectProps) {
  return (
    <Select
      defaultValue={categories?.[0]}
      value={selected}
      onValueChange={setSelected}
    >
      <SelectTrigger className="w-[200px] min-h-[50px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
