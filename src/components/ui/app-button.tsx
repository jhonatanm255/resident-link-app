
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-primary-600 hover:bg-primary-700 text-white shadow",
      secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
      outline: "border border-primary-500 text-primary-700 hover:bg-primary-50",
      ghost: "hover:bg-gray-100 text-gray-700",
      danger: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-10 px-4 py-2 rounded-md",
      lg: "h-12 px-6 py-3 text-lg rounded-lg",
    };

    return (
      <button
        className={cn(
          "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";
