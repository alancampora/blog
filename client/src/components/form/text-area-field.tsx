import { ChangeEventHandler } from "react";
import { Textarea } from "../ui/textarea";

type Props = {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: any;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
};

export default function TextareaField({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-lg font-bold text-gray-700">
        {label}
      </label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
