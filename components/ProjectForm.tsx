"use client"

import React, { useState, useActionState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formProjectSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/lib/actions";
import { Combobox, ComboboxDataType } from "./shared/ComboBox";
import { client, clientNoCache } from "@/sanity/lib/client";
import { CONSTRUCTIONS_BY_QUERY } from "@/sanity/lib/queries";
import { Author, Construction, Project } from '@/sanity/types';

type FormDataType = Omit<Project, "author" | "construction">;
type ProjectFormType = Omit<Project, "author" | "construction"> & { author?: Author } & { construction?: Construction };

const ProjectForm = ({ post }: { post?: ProjectFormType }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState<string>("");
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [selected, setSelected] = useState<ComboboxDataType | null>(null);
  const [initValue, setInitValue] = useState<string>('');
  const [constructions, setConstructions] = useState<ComboboxDataType[]>([])
  const { toast } = useToast()
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {

      const constructionId = selected?._id ?? initValue;

      const formValues = {
        title: formDataSubmit.get("title") as string,
        subtitle: formDataSubmit.get("subtitle") as string,
        description: formDataSubmit.get("description") as string,
        thumbnail: formDataSubmit.get("thumbnail") as string,
        image: formDataSubmit.get("image") as string,
        constructionId,
        pitch,
      }

      console.log('handleFormSubmit', formValues);
      await formProjectSchema.parseAsync(formValues);

      console.log(formValues);

      const response = post
        ? await updateProject(prevState, formDataSubmit, pitch, constructionId, formData?._id!)
        : await createProject(prevState, formDataSubmit, pitch, constructionId);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your project pitch has been created successfully",
        })
      }

      // router.push(`/du-an/${selected?.slug?.current}`)
      router.push(`/auth`)

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        })

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      })

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      }
    }
  }

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    {
      error: "",
      status: "INITIAL",
    }
  );

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData!,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const getConstructions = async () => {
      const result = await clientNoCache.fetch(CONSTRUCTIONS_BY_QUERY, { search: null });

      setConstructions(result || [])
    }

    getConstructions();

  }, [])

  useEffect(() => {
    if (post) {
      const { _id, title, subtitle, description, thumbnail, image, pitch, construction } = post;

      setFormData({ ...formData!, _id, title, subtitle, description, thumbnail, image });

      if (pitch) {
        setPitch(pitch)
      }

      if (construction) {
        setInitValue(construction._id)
      }

    }
  }, [post])

  return (
    <form
      action={formAction}
      className={"startup-form"}
    >
      <div>
        <label htmlFor="title" className={"startup-form_label"}>
          {"Title"}
        </label>
        <Input
          id={"title"}
          name={"title"}
          value={formData?.title}
          onChange={handleChangeForm}
          className={"startup-form_input"}
          required
          placeholder={"Project Title"}
        />
        {errors.title && (
          <p className={"startup-form_error"}>{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="subtitle" className={"startup-form_label"}>
          {"Subtitle"}
        </label>
        <Input
          id={"subtitle"}
          name={"subtitle"}
          value={formData?.subtitle}
          className={"startup-form_input"}
          required
          placeholder={"Project Subtitle"}
          onChange={handleChangeForm}
        />
        {errors.subtitle && (
          <p className={"startup-form_error"}>{errors.subtitle}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className={"startup-form_label"}>
          {"Description"}
        </label>
        <Textarea
          id={"description"}
          name={"description"}
          value={formData?.description}
          className={"startup-form_textarea"}
          required
          placeholder={"Project Description"}
          onChange={handleChangeForm}
        />
        {errors.description && (
          <p className={"startup-form_error"}>{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="thumbnail" className={"startup-form_label"}>
          {"Thumbnail URL"}
        </label>
        <Input
          id={"thumbnail"}
          name={"thumbnail"}
          value={formData?.thumbnail}
          className={"startup-form_input"}
          required
          placeholder={"Project Thumbnail URL"}
          onChange={handleChangeForm}
        />
        {errors.thumbnail && (
          <p className={"startup-form_error"}>{errors.thumbnail}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className={"startup-form_label"}>
          {"Image URL"}
        </label>
        <Input
          id={"image"}
          name={"image"}
          value={formData?.image}
          className={"startup-form_input"}
          required
          placeholder={"Project Image URL"}
          onChange={handleChangeForm}
        />
        {errors.image && (
          <p className={"startup-form_error"}>{errors.image}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className={"startup-form_label"}>
          {"Construction"}
        </label>
        <Combobox
          data={constructions}
          initValue={initValue}
          className={"startup-form_input justify-between"}
          onChange={(value: ComboboxDataType) => { setSelected(value) }}
        />
        {errors.image && (
          <p className={"startup-form_error"}>{errors.image}</p>
        )}
      </div>

      <div data-color-mode={"light"}>
        <label htmlFor="pitch" className={"startup-form_label"}>
          {"Pitch"}
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id={"pitch"}
          preview={"edit"}
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem is solves",
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
      </div>
      <Button
        type={"submit"}
        className={"startup-form_btn text-white"}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className={"size-6 ml-2"} />
      </Button>
    </form>
  )
}
export default ProjectForm