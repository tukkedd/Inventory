import * as React from "react";
import { cn } from "./utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
      ref={ref}
      {...props}
    />
  )
);
Label.displayName = "Label";