import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-display text-center uppercase tracking-tight transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        neon: "bg-neon-gradient text-neon-foreground shadow-neon",
        violet: "bg-violet-gradient text-secondary-foreground shadow-card",
        outline: "border-2 border-primary/60 text-primary hover:bg-primary/10",
        red: "bg-primary text-primary-foreground shadow-neon",
      },
      size: {
        lg: "px-7 py-4 text-base sm:text-lg",
        md: "px-5 py-3 text-sm sm:text-base",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "neon", size: "lg", block: false },
  },
);

type CTAButtonProps = React.ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof ctaVariants> & { href: string };

export function CTAButton({ className, variant, size, block, ...props }: CTAButtonProps) {
  return <a className={cn(ctaVariants({ variant, size, block }), className)} {...props} />;
}
