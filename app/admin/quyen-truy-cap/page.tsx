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
  ExternalLink,
  PlusCircleIcon,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Author, Project } from "@/sanity/types";
import {
  ApproveAccountDialog,
  DenyAccountDialog,
} from "@/components/ui/confirmation-dialogs";
import { clientNoCache } from "@/sanity/lib/client";
import {
  AUTHORS_BY_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  PROJECTS_BY_QUERY,
} from "@/sanity/lib/queries";
import Link from "next/link";
import { updateCategory, updateRoleByAdmin } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { Combobox, ComboboxDataType } from "@/components/shared/ComboBox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [selectedRequest, setSelectedRequest] = useState<Author | null>(null);

  const [role, setRole] = useState<string | null>(null);
  const [users, setUsers] = useState<Author[] | []>([]);

  const openApproveDialog = (
    request: Author,
    newRole: "admin" | "editor" | "viewer"
  ) => {
    setSelectedRequestId(request._id);
    setSelectedRequest(request);
    setRole(newRole);
    setApproveDialogOpen(true);
  };

  const handleApproveAccount = async () => {
    setApproveDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequest) {
      const post = {
        ...selectedRequest,
        role: role,
      };
      const { error, status } = await updateRoleByAdmin(post);

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
        description: "Your role has been approved successfully",
        // variant: "destructive",
      });

      getUsers();
    }
  };

  const openDeleteDialog = (request: Author) => {
    setSelectedRequestId(request._id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteRequest = async () => {
    setDeleteDialogOpen(false);
    setSelectedRequestId(null);
    if (selectedRequestId) {
      const { error, status } = await updateRoleByAdmin(post);

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
        description: "Your Role has been updated successfully",
        // variant: "destructive",
      });

      getUsers();
    }
  };

  const getUsers = async () => {
    const params = { search: null };
    const searchUsers = await clientNoCache.fetch(AUTHORS_BY_QUERY, params);

    console.log("PermissionTable -> getUsers", searchUsers);
    setUsers(searchUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns: ColumnDef<Author>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const request = row.original;
        return (
          <div className="flex items-center gap-3 max-w-80">
            {/* <Image
              src={request.thumbnail || "/gsap.svg"}
              alt={request.title!}
              width={45}
              height={60}
              className="object-cover rounded-sm"
            /> */}
            <div className="flex flex-col">
              <span className="font-medium line-clamp-1">{request.name}</span>
              <span className="text-sm text-muted-foreground line-clamp-1">
                {request.email}
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
              src={"/gsap.svg"}
              alt={"avatar"}
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
          request.role === "admin"
            ? "text-green-500"
            : request.role === "editor"
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
                  {request.role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={request.role}
                  onValueChange={(value: string) =>
                    openApproveDialog(
                      request,
                      value as "admin" | "editor" | "viewer"
                    )
                  }
                >
                  <DropdownMenuRadioItem
                    value="admin"
                    className="text-green-500"
                  >
                    Admin
                    {request.role === "admin" && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="editor"
                    className="text-red-500"
                  >
                    Editor
                    {request.role === "editor" && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="viewer"
                    className="text-gray-500"
                  >
                    Viewer
                    {request.role === "viewer" && (
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
    // {
    //   accessorKey: "description",
    //   header: "Description",
    //   cell: ({ row }) => {
    //     const request = row.original;
    //     return (
    //       <div className="flex flex-col max-w-80">
    //         <span className="line-clamp-2">{request.description}</span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "view detail",
    //   header: "View Detail",
    //   cell: ({ row }) => {
    //     const request = row.original;
    //     return (
    //       <div className="flex items-center justify-center gap-3">
    //         <Button variant="link" className="px-2 h-auto p-0 text-blue-500">
    //           <Link target="_blank" href={`/du-an/${request?.slug?.current}`}>
    //             View Product
    //           </Link>
    //           <ExternalLink className="w-4 h-4 ml-1" />
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
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
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users || [],
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
            <h1 className="text-xl font-semibold">All Products</h1>
            <div className="flex items-center justify-between mb-6 gap-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  A-Z
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
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
