import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getFilters = (amountDrafts: number, amountPublished: number) => [
  { label: "Published", count: amountPublished },
  { label: "Drafts", count: amountDrafts },
];

interface PostFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  amountDrafts: number;
  amountPublished: number;
}

const PostFilters: React.FC<PostFiltersProps> = ({ activeFilter, onFilterChange, amountDrafts, amountPublished }) => {
  return (
    <div className="flex space-x-2">
      {getFilters(amountDrafts, amountPublished).map((filter) => (
        <Button
          key={filter.label}
          variant={activeFilter === filter.label ? "default" : "neutral"}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-full", {
            "border border-red-500 text-red-500": activeFilter === filter.label,
          })}
          onClick={() => onFilterChange(filter.label)}
        >
          <span className="bg-gray-200 text-black px-2 py-1 rounded-full text-sm">
            {filter.count}
          </span>
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default PostFilters;