/**
 * @fileOverview Product card component to display product information.
 */
'use client';

import Image from 'next/image';
import type { Product } from '@/services/product-service';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Import cn

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (product.image && !product.image.startsWith('/')) {
      setImageSrc(product.image);
    } else {
      const randomSeed = product.id + Math.random().toString();
      setImageSrc(product.image);
    }
  }, [product.id, product.image]);


  const handleQuantityChange = (newQuantity: number) => {
    // Ensure quantity doesn't go below 0
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-500 text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />);
    }
    return stars;
  };

  // Calculate discount percentage if applicable
  const discountPercentage = product.discountedPrice
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  const displayPrice = product.discountedPrice ?? product.originalPrice;

  return (
    <div className="border border-[hsl(var(--cart-pink))] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full bg-card">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden p-6"> {/* Padding p-6 */}
       {/* Removed badge for fixed price */}
        {imageSrc ? (
          <Image
          src={product.image.startsWith('/') ? product.image : product.image}
          alt={product.title}
          className="aspect-square object-cover"
          width={300}
          height={300}
        />
        ) : (
           <div className="w-full h-full bg-secondary animate-pulse rounded-md"></div>
        )}
      </div>
       {/* Sale Overlay Image */}
       {product.discountedPrice && (
        <Image
          src="/sale.png" // Path to your sale overlay image in the public folder
          alt="On Sale"
          width={50} // Adjust size as needed
          height={50} // Adjust size as needed
          className="absolute top-2 left-2 z-10" // Position in top-left, z-index to ensure it's on top
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-2">{product.title}</h3> {/* line-clamp-2 allows two lines */}
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-1 text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
        </div>
        <div className="mb-3 flex items-baseline space-x-2">
          {/* Display current price (discounted or original) */}
          <span className="text-lg font-bold text-foreground">
            ৳{displayPrice.toFixed(2)}
          </span>
          {/* Display original price with strikethrough if discounted */}
          {product.discountedPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ৳{product.originalPrice.toFixed(2)}
            </span>
          )}
          {/* Display discount percentage if applicable */}
          {discountPercentage > 0 && (
            <span className="text-sm text-red-600">
              ({discountPercentage}%)
            </span>
          )}
        </div>

        {/* Quantity Selector and Add Button Container */}
        <div className="mt-auto flex justify-between items-center space-x-2 border-t border-[hsl(var(--cart-pink))] pt-2">
             {/* Updated Quantity Selector */}
             <div className="flex items-center border border-[hsl(var(--cart-pink))] rounded-md h-8"> {/* Container with pink border */}
                 <Button
                     variant="ghost"
                     size="icon"
                     className={cn(
                         "h-full w-8 rounded-r-none", // Remove right rounding
                         "bg-[#FFEFF4] text-[#FFA3B8]", // Light pink background, slightly darker pink text for minus
                         "hover:bg-[#FFDCE6]", // Lighter hover for minus
                         "disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-50" // Disabled state styles
                     )}
                     onClick={() => handleQuantityChange(quantity - 1)}
                     disabled={quantity <= 0} // Disable minus button at quantity 0
                     aria-label="Decrease quantity"
                 >
                     <Minus className="h-4 w-4" />
                 </Button>
                 {/* Vertical Divider */}
                 <div className="w-px h-full bg-[hsl(var(--cart-pink))]"></div>
                 {/* Quantity Display */}
                 <span
                    id={`quantity-display-${product.id}`}
                    className="h-full w-10 flex items-center justify-center text-sm font-medium text-center px-1" // Style as text, center it
                    aria-live="polite" // Announce changes for accessibility
                 >
                     {quantity}
                 </span>
                  {/* Vertical Divider */}
                 <div className="w-px h-full bg-[hsl(var(--cart-pink))]"></div>
                 <Button
                     variant="ghost"
                     size="icon"
                     className={cn(
                        "h-full w-8 rounded-l-none", // Remove left rounding
                        "bg-background text-[hsl(var(--cart-pink))]", // White bg, Pink icon for plus (#F40F6F)
                        "hover:bg-accent" // Standard accent hover
                     )}
                     onClick={() => handleQuantityChange(quantity + 1)}
                     aria-label="Increase quantity"
                 >
                     <Plus className="h-4 w-4" />
                 </Button>
             </div>


            {/* Add Button */}
             <Button
                className="flex-grow sm:flex-grow-0 px-4 text-[#F40F6F] bg-[#FFBFCD] hover:bg-[#FFBFCD]/90" // Apply new colors and hover effect, update text color
                onClick={() => console.log(`Added ${quantity} of ${product.title} to cart`)}
                size="sm" // Use small button size to better fit
                variant="default" // Use default variant to allow custom bg
                disabled={quantity === 0} // Disable add button if quantity is 0
             >
                 <ShoppingCart className="mr-2 h-4 w-4" /> Add
             </Button>
        </div>
      </div>
    </div>
  );
}
