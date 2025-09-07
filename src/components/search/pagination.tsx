"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export function PaginationDemo({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const jt = searchParams.get("jt") ?? "";
  const et = searchParams.get("et") ?? "";
  const ms = searchParams.get("ms") ?? "50000";

  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (jt) params.append("jt", jt);
    if (et) params.append("et", et);
    if (ms) params.append("ms", ms);
    params.append("page", targetPage.toString());
    return `/search?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(prevPage)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={buildHref(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={buildHref(nextPage)}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
