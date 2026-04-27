import { ChangeEvent, FC, FormEvent, KeyboardEvent, TextareaHTMLAttributes } from "react";
import "./styles.scss";

interface MaisonComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  modelLabel?: string;
  ctaLabel?: string;
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "onKeyDown" | "disabled" | "placeholder"
  >;
}

const MaisonComposer: FC<MaisonComposerProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Demander une analyse contextuelle…",
  disabled = false,
  loading = false,
  modelLabel = "Claude · Workshop",
  ctaLabel = "Envoyer",
  textareaProps,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !loading && value.trim().length > 0) {
        onSubmit();
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled && !loading && value.trim().length > 0) {
      onSubmit();
    }
  };

  const isDisabled = disabled || loading || value.trim().length === 0;

  return (
    <form className="gf-maison-composer" onSubmit={handleSubmit}>
      <div className="gf-maison-composer__box">
        <textarea
          {...textareaProps}
          className="gf-maison-composer__input"
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          rows={2}
        />
        <div className="gf-maison-composer__footer">
          <span className="gf-maison-composer__model">{modelLabel}</span>
          <button type="submit" className="gf-maison-composer__cta" disabled={isDisabled}>
            {loading ? "…" : ctaLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MaisonComposer;
