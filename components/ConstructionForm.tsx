"use client"

import React, { useState, useActionState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formConstructionSchema } from "@/lib/validation";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createConstruction, updateConstruction } from "@/lib/actions";
import { Construction } from '@/sanity/types';

type FormDataType = Omit<Construction, "author">;

const ConstructionForm = ({ post }: { post?: Construction }) => {
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

      await formConstructionSchema.parseAsync(formValues);

      console.log(formValues);

      const response = post
        ? await updateConstruction(prevState, formDataSubmit, pitch, formData?._id!)
        : await createConstruction(prevState, formDataSubmit, pitch);

      if (response.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your construction pitch has been created successfully",
        })
      }

      // router.push(`/hang-muc/${response.result.slug.current}`)
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
          {"Title"}
        </label>
        <Input
          id={"title"}
          name={"title"}
          className={"startup-form_input"}
          placeholder={"Construction Title"}
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
          {"Subtitle"}
        </label>
        <Input
          id={"subtitle"}
          name={"subtitle"}
          className={"startup-form_input"}
          placeholder={"Construction Subtitle"}
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
          {"Description"}
        </label>
        <Textarea
          id={"description"}
          name={"description"}
          className={"startup-form_textarea"}
          placeholder={"Construction Description"}
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
          {"Thumbnail URL"}
        </label>
        <Input
          id={"thumbnail"}
          name={"thumbnail"}
          className={"startup-form_input"}
          placeholder={"Construction Thumbnail URL"}
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
          {"Image URL"}
        </label>
        <Input
          id={"image"}
          name={"image"}
          className={"startup-form_input"}
          placeholder={"Construction Image URL"}
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
export default ConstructionForm