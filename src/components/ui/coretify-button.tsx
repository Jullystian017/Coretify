import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CoretifyButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "variant"> {
  variant?: "white" | "dark";
}

export const CoretifyButton = React.forwardRef<HTMLButtonElement, CoretifyButtonProps>(
  ({ className, variant = "white", size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn(
          "rounded-full transition-all active:scale-[0.98] cursor-pointer",
          // Custom styles for white and dark variants to match the original landing page design
          variant === "white" && [
            "bg-white hover:bg-slate-100 text-black font-semibold border border-transparent shadow-lg hover:scale-[1.01]"
          ],
          variant === "dark" && [
            "bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] hover:scale-[1.01]"
          ],
          className
        )}
        {...props}
      />
    );
  }
);
CoretifyButton.displayName = "CoretifyButton";
