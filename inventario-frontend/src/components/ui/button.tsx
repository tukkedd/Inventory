import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
);
Button.displayName = "Button";