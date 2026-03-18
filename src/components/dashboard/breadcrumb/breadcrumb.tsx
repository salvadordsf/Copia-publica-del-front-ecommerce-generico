import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import React from "react";

interface IBreadcrumbProps {
  items: (
    | {
        href: string;
        label: string;
      }
    | {
        label: string;
        href?: undefined;
      }
  )[];
}

export default function UiBreadcrumb({items}: IBreadcrumbProps) {

  const ITEMS_TO_DISPLAY = 3;

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const middleItems = items.slice(1, items.length - 1);

  return (
    <Breadcrumb className="w-[90%] sm:w-full italic">
      <BreadcrumbList>
        {/* First item */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={firstItem.href!}>{firstItem.label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* If too many, collapse middle items */}
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : (
          <>
            {middleItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
            <BreadcrumbSeparator />
          </>
        )}

        {/* Last item */}
        <BreadcrumbItem>
          <BreadcrumbPage>{lastItem.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
