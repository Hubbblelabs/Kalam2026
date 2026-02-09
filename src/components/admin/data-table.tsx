'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  fetchData: (params: any) => Promise<any>;
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  toolbar?: React.ReactNode;
  /** Extra filter params merged into each fetch */
  filters?: Record<string, string | undefined>;
  refreshKey?: number;
}

export function DataTable<T extends { id: string }>({
  columns,
  fetchData,
  onRowClick,
  actions,
  toolbar,
  filters = {},
  refreshKey = 0,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [sort, setSort] = useState('-createdAt');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const cleanFilters: Record<string, string> = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v) cleanFilters[k] = v;
      });

      const result = await fetchData({
        page: pagination.page,
        limit: pagination.limit,
        sort,
        search,
        ...cleanFilters,
      });

      setData(result.data || []);
      if (result.pagination) {
        setPagination((prev) => ({
          ...prev,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        }));
      }
    } catch (err) {
      console.error('Failed to load data:', err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, pagination.page, pagination.limit, sort, search, filters, refreshKey]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSort = (key: string) => {
    setSort((prev) => {
      const field = prev.startsWith('-') ? prev.slice(1) : prev;
      if (field === key) {
        return prev.startsWith('-') ? key : `-${key}`;
      }
      return `-${key}`;
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const getSortIcon = (key: string) => {
    const field = sort.startsWith('-') ? sort.slice(1) : sort;
    if (field !== key) return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    return sort.startsWith('-') ? (
      <ArrowDown className="h-4 w-4 ml-1" />
    ) : (
      <ArrowUp className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
        </form>
        <div className="flex items-center gap-2 ml-auto">{toolbar}</div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={col.className}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center font-medium hover:text-foreground transition-colors"
                    >
                      {col.header}
                      {getSortIcon(col.key)}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              {actions && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render
                        ? col.render(row)
                        : (row as any)[col.key] ?? '—'}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      {actions(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {pagination.total > 0
            ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(
                pagination.page * pagination.limit,
                pagination.total
              )} of ${pagination.total}`
            : 'No results'}
        </p>
        <div className="flex items-center gap-2">
          <Select
            value={String(pagination.limit)}
            onValueChange={(val) =>
              setPagination((prev) => ({ ...prev, limit: Number(val), page: 1 }))
            }
          >
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-2">
              {pagination.page} / {pagination.totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: prev.totalPages,
                }))
              }
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
