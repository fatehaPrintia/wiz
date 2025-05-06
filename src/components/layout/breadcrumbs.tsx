'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <Fragment key={item.href}>
            <li>
              <Link
                href={item.href}
                className={`hover:text-foreground ${
                  index === items.length - 1 ? 'font-medium text-foreground' : ''
                }`}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
            {index < items.length - 1 && (
              <li>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
