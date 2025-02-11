import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export function FormField({ label, ...props }: FormFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className="space-y-2">
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}
