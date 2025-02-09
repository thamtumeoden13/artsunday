"use client"

import React, { useState, useActionState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formDesignSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createDesign, updateDesign } from "@/lib/actions";
import { Design } from '@/sanity/types';
import MDEditorComponent from './shared/MDEditor';

type FormDataType = Omit<Design, "author">;

const DesignForm = ({ post }: { post?: Design }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [formData, setFormData] = useState<FormDataType>();
  const { toast } = useToast()
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formDataSubmit: FormData) => {
    try {
      const formValues = {
        title: formDataSubmit.get("title") as string,
        subtitle: formDataSubmit.get("subtitle") as string,
        description: formDataSubmit.get("description") as string,
        thumbnail: formDataSubmit.get("thumbnail") as string,
        image: formDataSubmit.get("image") as string,
        pitch,
      }

      await formDesignSchema.parseAsync(formValues);

      console.log(formValues);

      const response = post
        ? await updateDesign(prevState, formDataSubmit, pitch, formData?._id!)
        : await createDesign(prevState, formDataSubmit, pitch);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your design pitch has been created successfully",
        })
      }

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
    if (post) {
      const { _id, title, subtitle, description, thumbnail, image, } = post;

      setFormData({ ...formData!, _id, title, subtitle, description, thumbnail, image });

      if (post.pitch) {
        setPitch(post.pitch)
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
          {"Tiêu Đề"}
        </label>
        <Input
          id={"title"}
          name={"title"}
          className={"startup-form_input"}
          placeholder={"Design Title"}
          required
          value={formData?.title}
          onChange={handleChangeForm}
        />
        {errors.title && (
          <p className={"startup-form_error"}>{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor="subtitle" className={"startup-form_label"}>
          {"Phụ Đề"}
        </label>
        <Input
          id={"subtitle"}
          name={"subtitle"}
          className={"startup-form_input"}
          placeholder={"Design Subtitle"}
          required
          value={formData?.subtitle}
          onChange={handleChangeForm}
        />
        {errors.subtitle && (
          <p className={"startup-form_error"}>{errors.subtitle}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className={"startup-form_label"}>
          {"Mô Tả"}
        </label>
        <Textarea
          id={"description"}
          name={"description"}
          className={"startup-form_textarea"}
          placeholder={"Design Description"}
          required
          value={formData?.description}
          onChange={handleChangeForm}
        />
        {errors.description && (
          <p className={"startup-form_error"}>{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="thumbnail" className={"startup-form_label"}>
          {"Ảnh Đại Diện"}
        </label>
        <Input
          id={"thumbnail"}
          name={"thumbnail"}
          className={"startup-form_input"}
          placeholder={"Design Thumbnail URL"}
          required
          value={formData?.thumbnail}
          onChange={handleChangeForm}
        />
        {errors.thumbnail && (
          <p className={"startup-form_error"}>{errors.thumbnail}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className={"startup-form_label"}>
          {"Hình Ảnh"}
        </label>
        <Input
          id={"image"}
          name={"image"}
          className={"startup-form_input"}
          placeholder={"Design Image URL"}
          value={formData?.image}
          required
          onChange={handleChangeForm}
        />
        {errors.image && (
          <p className={"startup-form_error"}>{errors.image}</p>
        )}
      </div>

      <div data-color-mode={"light"}>
        <label htmlFor="pitch" className={"startup-form_label"}>
          {"Bài viết"}
        </label>

        <MDEditorComponent
          value={pitch}
          onChange={(value) => setPitch(value as string)}
        />
      </div>
      <Button
        type={"submit"}
        className={"startup-form_btn text-white"}
        disabled={isPending}
      >
        {isPending ? "Đang lưu..." : "Lưu"}
        <Send className={"size-6 ml-2"} />
      </Button>
    </form>
  )
}
export default DesignForm