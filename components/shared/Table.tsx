"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Combobox, ComboboxDataType } from "./ComboBox";
import { useEffect, useState } from "react";

export const TableComponent = ({
  headers = ['Title', 'Permalink', 'Thumbnail', 'Description'],
  customType = '',
  data, title, className, path,
  actions = [],
  onDelete, onEdit,
}: {
  headers?: string[];
  customType?: string;
  data: any[];
  title: string;
  className?: string;
  path?: string;
  actions?: string[];
  onDelete?: (post: any) => void;
  onEdit?: (post: any) => void;
}
) => {

  const [dataList, setDataList] = useState(data)

  const handleActionRow = (post: any, action: string) => {
    if (action === 'Edit') {
      if (onEdit) onEdit(post)
    } else if (action === 'Delete') {
      if (onDelete) onDelete(post)
    }
  }

  const handleEditRow = (item: ComboboxDataType) => {
    console.log('TableComponent -> handleChangeCombobox', item)

    const newData = dataList.map((data) => {
      if (data._id === item._id) {
        return item
      }
      return data
    })
    setDataList(newData)
  }

  const renderCustomColumns = (item: any) => {
    if (customType === 'author') {
      return (
        <>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
          <TableCell width={200} height={100}>
            <Image
              src={item.image}
              alt={'avatar'}
              width={100}
              height={100}
              className="object-cover w-full rounded-sm"
            />

          </TableCell>
          <TableCell>
            <Combobox
              data={[
                { _id: 'admin', title: 'Admin' },
                { _id: 'editor', title: 'Editor' },
                { _id: 'viewer', title: 'Viewer' },
              ]}
              initValue={item.role}
              className={"!mt-0 !w-[24rem] !h-[2.5rem] !border-white-100 !text-white-100 !text-[18px]"}
              onChange={(value: ComboboxDataType) => handleEditRow({ ...item, role: value._id })}
            />
          </TableCell>
        </>
      )
    }

    return null
  }

  useEffect(() => {
    setDataList(data)
  }, [data])

  return (
    <Table className={cn('w-full', className)}>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={header} className="text-20-medium !text-white">{header}</TableHead>
          ))}
          {!!actions.length && <TableHead className="text-20-medium !text-white">Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList.map((item, index) => (
          <TableRow key={`${item._id}-${index}`} className="hover:bg-slate-800">
            {!customType ? (
              <>
                <TableCell width={200} className="font-medium">{item.title}</TableCell>
                <TableCell width={200}>{item.slug?.current}</TableCell>
                <TableCell width={200} height={100}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="object-cover w-full rounded-sm"
                  />

                </TableCell>
                <TableCell className="font-normal">{item.description}</TableCell>
              </>
            ) : (
              renderCustomColumns(item)
            )
            }
            {[...actions]?.map((act) => (
              <TableCell key={act} className="w-[40px] items-center justify-center ">
                {act === 'Edit' && <EditIcon className={"size-6 text-white hover:cursor-pointer"} onClick={() => handleActionRow(item, act)} />}
                {act === 'Delete' && <TrashIcon className={"size-6 text-red-500 hover:cursor-pointer"} onClick={() => handleActionRow(item, act)} />}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}