import Pagination from '../invoices/pagination';
import Search from '../search';
import Table from '../invoices/table';
import { CreateInvoice } from '../invoices/buttons';
import { lusitana } from '../fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '../skeletons';
import { fetchInvoicesPages } from '../../lib/data';

export default async function Page({ searchParams }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
