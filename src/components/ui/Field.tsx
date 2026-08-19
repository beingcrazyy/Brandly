import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode, useId } from "react";

function FieldShell({
  label,
  helper,
  htmlFor,
  required,
  children,
}: {
  label?: string;
  helper?: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] font-medium text-[#14140F]">
          {label}
          {required && <span className="ml-0.5 text-[#B23B2E]">*</span>}
        </label>
      )}
      {children}
      {helper && <p className="text-[12px] leading-snug text-neutral-500">{helper}</p>}
    </div>
  );
}

const fieldClasses =
  "focus-ring w-full rounded-xl border border-[#DDD6C6] bg-white px-3 py-2 text-sm text-[#14140F] placeholder:text-neutral-400 transition-colors hover:border-[#C9C2AF] focus:border-[#9C927A]";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, id, required, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldShell label={label} helper={helper} htmlFor={inputId} required={required}>
      <input ref={ref} id={inputId} className={`${fieldClasses} ${className}`} {...props} />
    </FieldShell>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, id, required, className = "", rows = 4, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldShell label={label} helper={helper} htmlFor={inputId} required={required}>
      <textarea ref={ref} id={inputId} rows={rows} className={`${fieldClasses} resize-y ${className}`} {...props} />
    </FieldShell>
  );
});

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, id, required, className = "", children, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldShell label={label} helper={helper} htmlFor={inputId} required={required}>
      <select ref={ref} id={inputId} className={`${fieldClasses} ${className}`} {...props}>
        {children}
      </select>
    </FieldShell>
  );
});
