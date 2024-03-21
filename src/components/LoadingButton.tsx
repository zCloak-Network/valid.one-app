import { forwardRef, ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={`btn ${loading ? "pointer-events-none" : ""} ${className || ""}`} {...props}>
        {loading ? <span className="loading loading-dots loading-md"></span> : children}
      </button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
