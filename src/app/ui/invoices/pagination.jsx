'use client';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Example rendering: previous/next and page numbers
  return (
    <nav className="flex items-center gap-2">
      <a
        href={createPageURL(currentPage - 1)}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'}`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </a>
      {Array.from({ length: totalPages }, (_, i) => (
        <a
          key={i + 1}
          href={createPageURL(i + 1)}
          className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
        >
          {i + 1}
        </a>
      ))}
      <a
        href={createPageURL(currentPage + 1)}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </a>
    </nav>
  );
}
