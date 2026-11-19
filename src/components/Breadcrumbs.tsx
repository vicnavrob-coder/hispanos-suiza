"use client";

import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const schema = breadcrumbSchema(items);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 sm:py-4"
      >
        <ol
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm"
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {isLast ? (
                  <span
                    style={{ color: "#6B7280" }}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.url}
                      className="hover:text-[#C8102E] transition-colors"
                      style={{ color: "#9CA3AF" }}
                    >
                      {item.name}
                    </Link>
                    <span style={{ color: "#D1D5DB" }}>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
