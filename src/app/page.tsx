
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image'; // Import Image component
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { ProductGrid } from '@/components/products/product-grid';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SortDropdown } from '@/components/products/sort-dropdown';
import { Skeleton } from '@/components/ui/skeleton';
import { getProducts, getFilterOptions, SortOption } from '@/services/product-service';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ShopSpot - Your E-commerce Destination',
  description: 'Find the best deals on various products.',
};

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string;
    brand?: string;
    color?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    sortBy?: string;
  };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const sortBy = (searchParams.sortBy as SortOption) || 'latest';
  const itemsPerPage = 18;
  const limit = page * itemsPerPage;

  const [filterOptions, initialProducts] = await Promise.all([
    getFilterOptions(),
    getProducts(undefined, undefined, undefined, undefined, undefined, undefined, sortBy, limit),
  ]);

  const firstCategoryFromUrl = searchParams.category?.split(',')[0];
  const currentCategoryLabel = firstCategoryFromUrl || 'All Products';
  const breadcrumbCategoryHref = firstCategoryFromUrl ? `/?category=${encodeURIComponent(firstCategoryFromUrl)}` : '/';

  const breadcrumbItems = [
    { label: '', href: '/' },
    ...(firstCategoryFromUrl ? [{ label: currentCategoryLabel, href: breadcrumbCategoryHref }] : []),
  ];


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <nav className="bg-secondary border-b border-border">
        <div className="container mx-auto flex items-center justify-between p-2 text-sm">
            {/* Categories on the left */}
            <Link href="/?category=" className="hover:text-primary font-medium">Categories</Link>

            {/* Other links grouped on the right */}
            <div className="flex items-center space-x-4">
                <Link
                    href="#"
                    className="px-3 py-1 rounded-full bg-[#471D6B] text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Offers
                </Link>
                <Link
                    href="#"
                    className="px-3 py-1 rounded-full bg-[#FF87A6] text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Seller Picks
                </Link>
                <Link
                    href="#"
                    className="px-3 py-1 rounded-full bg-[#913BDB] text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Campaign
                </Link>
            </div>
        </div>
       </nav>

       {/* Banner Section */}
       <div className="relative container mx-auto mt-4 h-[160px] w-full max-w-[1280px] overflow-hidden">
           <Image
             src="/l.png"
             alt="Skin care banner"
             width={1280}
             height={160}
             className="object-cover"
             priority // Load the banner image early
             data-ai-hint="abstract background texture"
           />
           <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-foreground">
             <p className="text-sm">Health care and beauty &gt; Skin care</p>
             <h1 className="text-4xl font-bold mt-2">SKIN CARE Products</h1>
           </div>
        </div>


      <div className="container mx-auto mt-4 px-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="col-span-1">
             <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar filterOptions={filterOptions} currentFilters={searchParams} />
             </Suspense>
          </aside>
          <section className="col-span-1 lg:col-span-3">
              <div className="flex justify-end mb-4">
                  <SortDropdown currentSort={sortBy} />
              </div>
             <Suspense fallback={<ProductGridSkeleton />}>
                 <ProductGrid
                   initialProducts={initialProducts}
                   currentFilters={searchParams}
                   itemsPerPage={itemsPerPage}
                   currentPage={page}
                   currentSort={sortBy}
                 />
             </Suspense>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Skeleton components
function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
       <Skeleton className="h-8 w-3/4" />
       <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
       <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
      </div>
       <Skeleton className="h-8 w-3/4" />
       <Skeleton className="h-8 w-full mt-2" />
       <Skeleton className="h-10 w-full mt-6" /> {/* Skeleton for Reset button */}
    </div>
  );
}

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(18)].map((_, i) => (
                <div key={i} className="border border-[hsl(var(--cart-pink))] rounded-lg p-4 space-y-3 bg-card">
                    <Skeleton className="h-40 w-full rounded-md p-6" /> {/* Adjusted skeleton for image padding */}
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                     <div className="flex justify-between items-center pt-2 border-t border-[hsl(var(--cart-pink))]"> {/* Added border-t */}
                        <Skeleton className="h-8 w-24" /> {/* Skeleton for quantity */}
                         <Skeleton className="h-8 w-20" /> {/* Skeleton for Add button */}
                    </div>
                </div>
            ))}
        </div>
    );
}
