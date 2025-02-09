"use client"

import React, { useEffect, useState } from 'react'
import { ROUTE_BY_SLUG_QUERY, PROJECTS_BY_QUERY } from '@/sanity/lib/queries';
import { TableComponent } from './shared/Table';
import { Combobox, ComboboxDataType } from './shared/ComboBox';
import { client, clientNoCache } from '@/sanity/lib/client';
import { PlusCircleIcon } from 'lucide-react';
import { Project } from '@/sanity/types';
import { updateRoute } from '@/lib/actions';
import { toast } from '@/hooks/use-toast';

const RouteTable = ({ slug, title, role }: { slug: string, title: string, role?: string }) => {
  const params = { slug }

  const [projects, setProjects] = useState<ComboboxDataType[] | null>(null)
  const [homeHeroPost, setHomeHeroPost] = useState<Project[] | null>([])
  const [routeId, setRouteId] = useState<string>('')
  const [selected, setSelected] = useState<ComboboxDataType | null>(null);

  const getProjects = async () => {
    const projects = await clientNoCache.fetch(PROJECTS_BY_QUERY, { search: null });
    setProjects(projects);
  }

  const getRouteSelect = async () => {
    const { _id, select: homeHeroPost } = await clientNoCache.fetch(ROUTE_BY_SLUG_QUERY, params)

    setHomeHeroPost(homeHeroPost);
    setRouteId(_id);
  }

  const handleAddRouteSelect = async () => {
    if (!selected) return;

    const { error, status } = await updateRoute('', routeId, selected._id)
    if (status === 'ERROR') {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
      return;
    }
    toast({
      title: "Success",
      description: "Your Home Hero has been updated successfully",
      // variant: "destructive",
    });
    getProjects();
    getRouteSelect();
  }

  const handleDelete = async (post: Project) => {
    const { error, status } = await updateRoute('', routeId, post._id, true)

    if (status === 'ERROR') {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
      return;
    }

    toast({
      title: "Success",
      description: "Your Home Hero has been deleted successfully",
      // variant: "destructive",
    });

    getProjects();
    getRouteSelect();
  }

  useEffect(() => {
    getProjects();
    getRouteSelect();
  }, [])

  if (!projects || !homeHeroPost) return <div>Loading...</div>;

  return (
    <section className={"section_container !justify-items-center !mt-0 overflow-auto h-full"}>

      <div className='absolute top-0 left-0 right-0 flex items-center justify-between w-full h-24 px-10 py-4 '>
        <p className='w-96'>{title}</p>
        {(role == 'admin' || role == 'editor') && <div className='flex items-center justify-end flex-1 gap-10 py-10'>
          <Combobox
            data={projects}
            className={"startup-form_input !mt-0 !w-[24rem] !h-[2.5rem] !border-white-100 !text-white-100 !text-[18px]"}
            onChange={(value: ComboboxDataType) => { setSelected(value) }}
          />
          <PlusCircleIcon className={"size-12 text-white hover:cursor-pointer"} onClick={handleAddRouteSelect} />
        </div>}
      </div>
      <div className='flex justify-end w-full h-full'  >
        <TableComponent
          data={homeHeroPost}
          title={title}
          actions={role == 'admin' || role == 'editor' ? ['Delete'] : []}
          onDelete={handleDelete}
        />
      </div>
    </section>
  )
}
export default RouteTable
