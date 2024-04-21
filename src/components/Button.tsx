"use client";

type buttonProps = {
  cta: string;
  onClick_: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ cta, onClick_, className, disabled }: buttonProps) => {
  if (disabled) {
  }
  return (
    <button className={className ?? ""} onClick={onClick_} disabled={disabled}>
      {cta}
    </button>
  );
};

export default Button;
