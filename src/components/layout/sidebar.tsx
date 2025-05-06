'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Filter, RotateCcw } from 'lucide-react'; // Added RotateCcw
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils'; // Import cn

interface SidebarProps {
  filterOptions: {
    categories: string[];
    brands: string[];
    colors: string[];
    sizes: string[]; // sizes are already expected as string[]
    maxPrice: number;
  };
  currentFilters: Record<string, string | string[] | undefined>;
  isMobile?: boolean; // Optional prop for potential mobile usage differentiation
}

export function Sidebar({ filterOptions, currentFilters, isMobile }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from currentFilters (URL search params)
  // Categories are now multi-select like brands
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentFilters.category ? (currentFilters.category as string).split(',') : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    currentFilters.brand ? (currentFilters.brand as string).split(',') : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    currentFilters.color ? (currentFilters.color as string).split(',') : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
     currentFilters.size ? (currentFilters.size as string).split(',') : []
   );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentFilters.minPrice ? parseFloat(currentFilters.minPrice as string) : 0,
    currentFilters.maxPrice ? parseFloat(currentFilters.maxPrice as string) : filterOptions.maxPrice,
  ]);

  // Derived state to manage UI interaction before debouncing
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

   // Update local state if URL changes (e.g., browser back/forward)
  useEffect(() => {
    // Update categories from URL params
    setSelectedCategories(searchParams.get('category')?.split(',') ?? []);
    setSelectedBrands(searchParams.get('brand')?.split(',') ?? []);
    setSelectedColors(searchParams.get('color')?.split(',') ?? []);
    setSelectedSizes(searchParams.get('size')?.split(',') ?? []);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const newPriceRange: [number, number] = [
        minPrice ? parseFloat(minPrice) : 0,
        maxPrice ? parseFloat(maxPrice) : filterOptions.maxPrice,
    ];
    setPriceRange(newPriceRange);
    setLocalPriceRange(newPriceRange); // Sync local slider UI state
  }, [searchParams, filterOptions.maxPrice]);


  // Function to update URL search params
  const updateFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when filters change
    params.delete('page');

    // Update multi-select filters including category
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    else params.delete('category');

    if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));
    else params.delete('brand');

    if (selectedColors.length > 0) params.set('color', selectedColors.join(','));
    else params.delete('color');

    if (selectedSizes.length > 0) params.set('size', selectedSizes.join(','));
    else params.delete('size');

    // Update price range, only if different from default
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    else params.delete('minPrice');

    if (priceRange[1] < filterOptions.maxPrice) params.set('maxPrice', priceRange[1].toString());
    else params.delete('maxPrice');


    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

   // Debounce the price slider update to avoid too many requests
  const debouncedUpdateFilters = useDebouncedCallback(updateFilters, 500);

  // Handlers for filter changes
  const handleMultiSelectChange = (
    value: string,
    currentSelection: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value];
    setter(newSelection);
    updateFilters(); // Update immediately
  };

  const handlePriceChange = (newRange: [number, number]) => {
      setLocalPriceRange(newRange); // Update visual slider immediately
      setPriceRange(newRange); // Update state that triggers debounce
      debouncedUpdateFilters(); // Call debounced update function
   };

   const resetFilters = () => {
       setSelectedCategories([]); // Reset categories to empty array
       setSelectedBrands([]);
       setSelectedColors([]);
       setSelectedSizes([]);
       setPriceRange([0, filterOptions.maxPrice]);
       setLocalPriceRange([0, filterOptions.maxPrice]); // Reset local slider UI state
       router.push(pathname, { scroll: false }); // Navigate to base path without params
   };

   // CSS classes for the round, pink checkboxes
    const checkboxClasses = cn(
        "rounded-full", // Make it round
        "border-[hsl(var(--cart-pink))]", // Use the cart pink variable for border
        "data-[state=checked]:bg-[hsl(var(--cart-pink))]", // Use pink for checked background
        "data-[state=checked]:border-[hsl(var(--cart-pink))]", // Keep pink border when checked
        "data-[state=checked]:text-primary-foreground" // Keep checkmark white
    );

    // Removed sliderStyle constant as colors are now handled within the Slider component itself


  return (
    <aside className={` ${isMobile ? '' : 'border rounded-lg p-6 shadow-sm bg-card'}`}>
       {/* Removed Filter heading and Reset button container */}

      {/* Added mb-6 to Accordion to maintain spacing */}
      <Accordion type="multiple" defaultValue={['category', 'brand', 'price', 'colors', 'size']} className="w-full mb-6">
        {/* Category Filter */}
        <AccordionItem value="category" className="border-b border-b-[hsl(var(--cart-pink))]">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
                 {filterOptions.categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleMultiSelectChange(category, selectedCategories, setSelectedCategories)}
                         className={checkboxClasses} // Apply the round pink style
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                        {category}
                      </Label>
                    </div>
                 ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand" className="border-b border-b-[hsl(var(--cart-pink))]">
          <AccordionTrigger className="text-base font-medium">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleMultiSelectChange(brand, selectedBrands, setSelectedBrands)}
                     className={checkboxClasses} // Apply the round pink style
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors Filter - Updated to Checkboxes */}
        <AccordionItem value="colors" className="border-b border-b-[hsl(var(--cart-pink))]">
          <AccordionTrigger className="text-base font-medium">Colors</AccordionTrigger>
          <AccordionContent>
             <div className="space-y-2">
                {filterOptions.colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => handleMultiSelectChange(color, selectedColors, setSelectedColors)}
                         className={checkboxClasses} // Apply the round pink style
                      />
                      <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                        {color}
                      </Label>
                    </div>
                 ))}
             </div>
          </AccordionContent>
        </AccordionItem>

         {/* Size Filter - Display only the first 5 sizes */}
        <AccordionItem value="size" className="border-b border-b-[hsl(var(--cart-pink))]">
          {/* Updated Trigger: Bold, Uppercase */}
          <AccordionTrigger className="text-base font-bold uppercase text-foreground">SIZE</AccordionTrigger>
          <AccordionContent>
            {/* Use flex-wrap for button layout */}
            <div className="flex flex-wrap gap-2">
              {/* Map over the sizes provided in filterOptions */}
              {filterOptions.sizes.map((size) => (
                <Button
                    key={size}
                    variant="outline"
                    size="sm" // Keep size sm for consistency, adjust padding below
                    className={cn(
                        "rounded-full h-auto px-3 py-1 text-xs font-normal", // Pill shape, small text, normal font weight
                        selectedSizes.includes(size)
                            ? "border-[hsl(var(--cart-pink))] text-[hsl(var(--cart-pink))] bg-background hover:bg-accent hover:text-[hsl(var(--cart-pink))]" // Selected style
                            : "border-border text-foreground bg-background hover:bg-accent hover:text-accent-foreground" // Unselected style
                    )}
                    onClick={() => handleMultiSelectChange(size, selectedSizes, setSelectedSizes)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        {/* Removed bottom border from the last item */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-1">
               <Slider
                  value={localPriceRange} // Use local state for slider visual
                  onValueChange={(value: [number, number]) => handlePriceChange(value)} // Update local & trigger debounced update
                  max={filterOptions.maxPrice}
                  step={1}
                  min={0}
                  className="my-4"
                  // Removed style prop - colors are now hardcoded in Slider component
                  aria-label="Price range slider"
                />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${localPriceRange[0]}</span>
                <span>${localPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full mt-6 border-[hsl(var(--cart-pink))] text-[hsl(var(--cart-pink))] hover:bg-[#FFEFF4] hover:text-[hsl(var(--cart-pink))]" // Apply pink outline and text, light pink hover
        onClick={resetFilters}
      >
        <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </aside>
  );
}
