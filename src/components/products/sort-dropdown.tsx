
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortOption } from '@/services/product-service';

interface SortDropdownProps {
  currentSort: SortOption;
}

export function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const newSortValue = value as SortOption;
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when sorting changes
    params.delete('page');

    if (newSortValue === 'latest') {
        // Remove sortBy if it's the default ('latest')
        params.delete('sortBy');
    } else {
        params.set('sortBy', newSortValue);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Map sort option value to display text
  const sortOptionText: Record<SortOption, string> = {
    latest: 'Latest',
    oldest: 'Oldest',
    // Add other options if they exist
  };


  return (
    <div className="flex items-center space-x-2">
      {/* Label is removed */}
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger id="sort-by" className="w-[180px]">
          <span className="text-sm text-muted-foreground mr-1">Sort by:</span> {/* Add text inside trigger */}
          <SelectValue placeholder="Select..." /> {/* Placeholder for initial state */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          {/* Add other sort options here if needed, e.g., price, rating */}
          {/* <SelectItem value="price-asc">Price: Low to High</SelectItem> */}
          {/* <SelectItem value="price-desc">Price: High to Low</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
