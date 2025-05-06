"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group", // Added group for potential styling
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      {/* Updated range color to #FF87A6 */}
      <SliderPrimitive.Range className="absolute h-full bg-[#FF87A6]" />
    </SliderPrimitive.Track>
    {/* Ensure thumbs use #F40F6F (cart-pink variable) for border and background */}
    {[...(Array(props.value?.length ?? 1).keys())].map((index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-[hsl(var(--cart-pink))] bg-[hsl(var(--cart-pink))] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            // Ensure ring uses the ring variable which might also be pink, or keep default
             "focus-visible:ring-ring" // Use default ring color unless explicitly overridden
          )}
        />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
