'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Product, SortOption } from '@/services/product-service'; // Import SortOption
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  initialProducts: Product[];
  currentFilters: Record<string, string | string[] | undefined>;
  itemsPerPage: number;
  currentPage: number;
  currentSort: SortOption; // Add currentSort prop
}

export function ProductGrid({ initialProducts, currentFilters, itemsPerPage, currentPage, currentSort }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(initialProducts.length === itemsPerPage * currentPage); // Initial check based on initial load
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  // Update products when initialProducts change (due to filter or sort change from server)
  useEffect(() => {
    setProducts(initialProducts);
    setPage(currentPage); // Reset page state based on server prop
    // Re-evaluate hasMore based on the newly loaded initialProducts and current page
    // Check if the number of products loaded is *exactly* the total expected up to this page.
    // If it's less, or not a multiple of itemsPerPage, we don't have more.
    // This assumes the backend returns *all* items up to the requested limit.
    const totalExpected = currentPage * itemsPerPage;
    setHasMore(initialProducts.length >= totalExpected && initialProducts.length % itemsPerPage === 0);

  }, [initialProducts, currentPage, itemsPerPage]);

  const loadMoreProducts = () => {
    startTransition(() => {
      const nextPage = page + 1;
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', nextPage.toString());
      // Ensure sortBy is included when loading more
      if (currentSort) {
        newSearchParams.set('sortBy', currentSort);
      } else {
        newSearchParams.delete('sortBy'); // Use default if not specified
      }

      // Optimistically update page state
      setPage(nextPage);

      // Navigate to the next page URL. The server component will fetch and return the combined list.
      // Using `replace` to avoid adding duplicate history entries for pagination
      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });

      // Note: We rely on the useEffect above to update the product list
      // when the `initialProducts` prop changes after navigation.
      // `hasMore` is also re-evaluated in the useEffect.
    });
  };


  return (
    <div>
      {products.length === 0 && !isPending ? (
         <div className="text-center py-10 text-muted-foreground">
            <p>No products found matching your criteria.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          {/* Updated Load More button styling */}
          <Button
            onClick={loadMoreProducts}
            disabled={isPending}
            size="lg"
            variant="outline" // Use outline variant for border
            className="text-[#913BDB] bg-background border-[#913BDB] hover:bg-[#913BDB]/10" // Apply custom colors
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
