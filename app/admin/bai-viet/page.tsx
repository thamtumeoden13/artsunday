"use client";

import { useEffect, useState } from "react";
import { Author, Project, ProjectDetail } from "@/sanity/types";
import {
  ApproveAccountDialog,
  DenyAccountDialog,
} from "@/components/ui/confirmation-dialogs";
import { clientNoCache } from "@/sanity/lib/client";
import { ALL_ARTICLES_BY_QUERY } from "@/sanity/lib/queries";
import { deleteById, publishedProjectDetail } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import TableComponent, { DataProps } from "@/components/admin/table/TableComponent";
import { ArticleProps, columns } from "@/components/admin/articles/column";

import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, EditIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Article = Omit<ProjectDetail, "author" | "project"> & {
  author?: Author;
} & { project?: Project } & { published?: "pending" | "approved" | "rejected" };

export default function UsersTable() {
  const router = useRouter();

  const [requests, setRequests] = useState<Article[]>([]);

  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  const openDeleteDialog = (request: ArticleProps) => {
    setSelectedRequestId(request._id);
    setDeleteDialogOpen(true);
  };

  const openApproveDialog = (request: ArticleProps) => {
    setSelectedRequestId(request._id);
    setApproveDialogOpen(true);
  };

  const openDenyDialog = (request: ArticleProps) => {
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
      ALL_ARTICLES_BY_QUERY,
      params
    );
    setRequests(searchForProjects);
    console.log("getArticles -> searchForProjects", searchForProjects.length);
  };

  useEffect(() => {
    getArticles();
  }, []);

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

  const _columns: ColumnDef<Article>[] = [
    ...columns,
    {
      accessorKey: "published",
      header: "Xuất bản",
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

  return (
    <>
      <section className="w-full bg-white rounded-2xl p-7">
        <TableComponent
          data={requests}
          columns={_columns as ColumnDef<DataProps>[]}
          title="Tất cả bài viết"
          description="Tạo bài viết mới"
          openApproveDialog={openApproveDialog}
          openDenyDialog={openDenyDialog}
          openDeleteDialog={openDeleteDialog}
          onEdit={handleEdit}
        />
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
