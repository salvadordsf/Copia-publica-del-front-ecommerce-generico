"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPagesForPagination } from "./get-pages-for-pagination-utility";
import UiPageSize from "./page-size-input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IUiPagination {
	currentPage: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
	pageSize: number;
	onPageSizeAction: (size: number) => void;
}

export default function UiPagination({
	currentPage,
  totalPages,
  onPageChangeAction,
	pageSize,
	onPageSizeAction,
}: IUiPagination) {

  const pagesForPagination = getPagesForPagination(totalPages, currentPage);

  return (
    <div className="grid grid-cols-2 grid-rows-2">
			{!(totalPages <= 1) && 
				<Pagination className="col-span-2">
					<PaginationContent>
						<PaginationItem>
							<PaginationLink
								className={
									`w-full ${currentPage <= 1
										? "pointer-events-none opacity-50"
										: "cursor-pointer"}`
								}
								onClick={(e) => {
									e.preventDefault();
									if (!(currentPage - 1 < 1)) {
										onPageChangeAction(currentPage - 1);
									}
								}}
							>
								<ChevronLeft />
							</PaginationLink>
						</PaginationItem>

						{pagesForPagination.map((page, index) =>
							page === "..." ? (
								<PaginationItem key={`ellipsis-${index}`}>
									<PaginationEllipsis />
								</PaginationItem>
							) : (
								<PaginationItem key={page}>
									<PaginationLink
										href="#"
										isActive={page === currentPage}
										onClick={(e) => {
											e.preventDefault();
											onPageChangeAction(Number(page));
										}}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							)
						)}

						<PaginationItem>
							<PaginationLink
								className={
									currentPage >= totalPages
										? "pointer-events-none opacity-50"
										: "cursor-pointer"
								}
								onClick={(e) => {
									e.preventDefault();
									if (!(currentPage + 1 > totalPages)) {
										onPageChangeAction(currentPage + 1);
									}
								}}
							>
								<ChevronRight />
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			}

      <UiPageSize className="col-start-2 col-end-3 justify-end mt-1 text-neutral-500" onPageSizeAction={onPageSizeAction} pageSize={pageSize}/>
    </div>
  );
}
