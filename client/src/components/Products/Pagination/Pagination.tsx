import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTranslations } from 'use-intl';

type PaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const ProductsPagination = ({
  page,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  const t = useTranslations('common');
  return (
    <Pagination className="justify-end mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            label={t('PREVIOUS')}
          />
        </PaginationItem>

        {/* First page always shown */}
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={page === 1}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
          >
            {1}
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis shown if needed */}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Generate page links with logic to handle current page and limited display */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((pageNumber) => {
            // Show current page and 1 page before and after
            return (
              pageNumber !== 1 &&
              pageNumber !== totalPages &&
              (pageNumber === page ||
                pageNumber === page - 1 ||
                pageNumber === page + 1)
            );
          })
          .map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis shown if needed */}
        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page always shown if more than 1 page */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={page === totalPages}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
            label={t('NEXT')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;
