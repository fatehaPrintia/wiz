import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, User, ShoppingBag, Menu } from 'lucide-react'; // Changed ShoppingCart to ShoppingBag
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './sidebar'; // Assuming sidebar is needed for mobile nav
import { getFilterOptions } from '@/services/product-service'; // For mobile nav filters

export async function Header() {
  // Fetch options if needed for mobile nav drawer, or pass via props if available higher up
  // const filterOptions = await getFilterOptions();
  const cartItemCount = 0; // Hardcoded for now

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4"> {/* Added gap for spacing */}
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4 overflow-y-auto">
              {/* Consider adding mobile navigation links and potentially filters here */}
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <nav className="flex flex-col space-y-2 mb-6">
                <Link href="/?category=Skin%20Care" className="hover:text-primary">Skin Care</Link>
                <Link href="/?category=Body%20Care" className="hover:text-primary">Body Care</Link>
                <Link href="/?category=Hair%20Care" className="hover:text-primary">Hair Care</Link>
                 <Link href="/?category=Oral%20Care" className="hover:text-primary">Oral Care</Link>
                 <Link href="/?category=Men's%20Grooming" className="hover:text-primary">Men's Grooming</Link>
              </nav>
               {/* Mobile Filters Placeholder - could render a simplified Sidebar */}
               {/* <h3 className="text-md font-semibold mb-2">Filters</h3> */}
               {/* <Sidebar filterOptions={filterOptions} currentFilters={{}} isMobile /> */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Removed mr-auto */}
        <Link href="/" className="flex items-center flex-shrink-0"> {/* Ensure logo doesn't shrink */}
          {/* Replace with actual SVG logo if available */}
        
            <img src="/logo.png" alt="Logo" className="h-8 w-28 mr-2" />

        
        </Link>

        {/* Search Bar - Hidden on small screens, shown on medium+ */}
        {/* Removed mx-auto to shift it right */}
        <div className="hidden md:flex flex-grow max-w-lg ml-4"> {/* Added ml-4 for some spacing from logo */}
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 text-sm rounded-full border-[#F40F6F] focus:border-primary" // Ensure rounded-full and check border/focus
              aria-label="Search products"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Icons - Kept ml-auto to push to far right */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto"> {/* Ensure icons group together, adjust spacing */}
          {/* Search Icon for Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
          {/* Account Button */}
          <Button variant="ghost" className="flex items-center space-x-1 px-2 sm:px-3 py-1.5" aria-label="Account">
            <User className="h-6 w-6" />
            <span className="text-sm font-medium hidden sm:inline">Account</span> {/* Text shown on sm screens and up */}
             <span className="sr-only sm:hidden">Account</span> {/* Screen reader text for mobile */}
          </Button>
           {/* Cart Button */}
          <Button
            variant="default" // Use default variant for background/text styling
            // Adjusted pink color using HSL variable, ensured white text, full rounding
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[hsl(var(--cart-pink))] text-primary-foreground hover:bg-[hsl(var(--cart-pink))] hover:opacity-90"
            aria-label={`Cart with ${cartItemCount} items`}
          >
              <ShoppingBag className="h-5 w-5" /> {/* Changed Icon */}
              <span className="text-sm font-medium">Cart ({cartItemCount})</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
