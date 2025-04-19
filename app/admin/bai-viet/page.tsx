"use client";

import { useEffect, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  EditIcon,
  ExternalLink,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Author, Project, ProjectDetail } from "@/sanity/types";
import {
  ApproveAccountDialog,
  DenyAccountDialog,
} from "@/components/ui/confirmation-dialogs";
import { clientNoCache } from "@/sanity/lib/client";
import { PROJECT_DETAILS_BY_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { deleteById, publishedProjectDetail } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Article = Omit<ProjectDetail, "author" | "project"> & {
  author?: Author;
} & { project?: Project } & { published?: "pending" | "approved" | "rejected" };

export default function UsersTable() {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [requests, setRequests] = useState<Article[]>([]);

  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const handlePublishedChange = (
    request: Article,
    newStatus: "approved" | "pending" | "rejected"
  ) => {
    if (newStatus === "approved") {
      openApproveDialog(request);
    } else if (newStatus === "rejected") {
      openDenyDialog(request);
    }
  };

  const openDeleteDialog = (request: Article) => {
    setSelectedRequestId(request._id);
    setDeleteDialogOpen(true);
  };

  const openApproveDialog = (request: Article) => {
    setSelectedRequestId(request._id);
    setApproveDialogOpen(true);
  };

  const openDenyDialog = (request: Article) => {
    setSelectedRequestId(request._id);
    setDenyDialogOpen(true);
  };

  const handleApproveAccount = async () => {
    setApproveDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await publishedProjectDetail(
        selectedRequestId,
        "approved"
      );

      if (status === "ERROR") {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your article has been approved successfully",
        // variant: "destructive",
      });

      getArticles();
    }
  };

  const handleRejectAccount = async () => {
    setDenyDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await publishedProjectDetail(
        selectedRequestId,
        "rejected"
      );

      if (status === "ERROR") {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your article has been rejected successfully",
        // variant: "destructive",
      });

      getArticles();
    }
  };

  const handleDeleteRequest = async () => {
    setDeleteDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await deleteById(selectedRequestId);
      if (status === "ERROR") {
        console.error("ProjectTable -> handleDelete", error);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your item has been deleted successfully",
      });

      getArticles();
    }
  };

  const handleEdit = async (request: Article) => {
    console.log("TableComponent -> path", request);
    router.push(`/admin/bai-viet/${request.slug?.current}`);
  };

  const getArticles = async () => {
    const params = { search: null };
    const searchForProjects = await clientNoCache.fetch(
      PROJECT_DETAILS_BY_QUERY,
      params
    );
    setRequests(searchForProjects);
    console.log("getArticles -> searchForProjects", searchForProjects[0]);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center gap-3 max-w-80">
            <Image
              src={request.thumbnail || "/gsap.svg"}
              alt={request.title!}
              width={45}
              height={60}
              className="object-cover rounded-sm"
            />
            <div className="flex flex-col">
              <span className="font-medium line-clamp-1">{request.title}</span>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {request.subtitle}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "thumnail",
      header: "Thumbnail",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={request.thumbnail || "/gsap.svg"}
              alt={request.title!}
              width={100}
              height={100}
              className="object-cover rounded-sm"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "published",
      header: "Published",
      cell: ({ row }) => {
        const request = row.original;
        const roleColor =
          request.published === "approved"
            ? "text-green-500"
            : request.published === "rejected"
              ? "text-pink-500"
              : "text-gray-500";

        return (
          <div className="w-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`px-4 py-1 h-auto font-medium ${roleColor}`}
                >
                  {request.published}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={request.published}
                  onValueChange={(value: string) =>
                    handlePublishedChange(
                      request,
                      value as "approved" | "pending" | "rejected"
                    )
                  }
                >
                  <DropdownMenuRadioItem
                    value="pending"
                    className="text-gray-500"
                  >
                    Pending
                    {request.published === "pending" && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="approved"
                    className="text-green-500"
                  >
                    Approved
                    {request.published === "approved" && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="rejected"
                    className="text-red-500"
                  >
                    Rejected
                    {request.published === "rejected" && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex flex-col max-w-80">
            <span className="line-clamp-2">{request.description}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "views",
      header: "Views",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center justify-center gap-3">
            <span className="font-medium">{request.views}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "view detail",
      header: "View Detail",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <Button variant="link" className="px-2 h-auto p-0 text-blue-500">
            <Link
              target="_blank"
              href={`/bai-viet/${request?.slug?.current}`}
            >
              View Article
            </Link>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-red-500 border border-red-100 rounded-full"
              onClick={() => openDeleteDialog(request)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-blue-500 border border-blue-100 rounded-full"
              onClick={() => handleEdit(request)}
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: requests,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <section className="w-full bg-white rounded-2xl p-7">
        <div className="w-full p-6 bg-white rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">All Articles</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  A-Z
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                asChild
              >
                <Link href="/admin/articles/new">
                  <span className="flex items-center">
                    <span className="mr-1">+</span> Create a new Article
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-slate-50">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      <DenyAccountDialog
        open={denyDialogOpen}
        onOpenChange={setDenyDialogOpen}
        onConfirm={handleRejectAccount}
      />

      <ApproveAccountDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApproveAccount}
      />

      <DenyAccountDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteRequest}
        title="Delete Request"
        description="Are you sure you want to delete this request? This action cannot be undone."
        buttonTitle="Delete Request"
      />
    </>
  );
}
