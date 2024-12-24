"use client"

import React, { useState, useRef, useActionState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

// import { EarthCanvas } from './canvas'
// import { SectionWrapper } from '../hoc'
import styles from "@/styles"
import { cn, slideIn, staggerContainer } from "@/lib/utils"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"
import { formContactSchema } from "@/lib/validation";
import z from "zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Contact = ({ className }: { className?: string }) => {

  const formRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string
      }

      await formContactSchema.parseAsync(formValues);

      console.log(formValues);

      const result = await emailjs.send('service_djy948a', 'template_jd2t2tf',
        {
          from_name: formValues.name,
          to_name: 'Cococ Studio',
          from_email: formValues.email,
          to_email: 'ltv.mrvu@gmail.com',
          message: formValues.message
        },
        'ugaUp8luB88w0ka3B'
      )

      if (result.status == 200) {
        toast({
          title: "Success",
          description: "Thank you, I will get back to you as soon as possible",
        })
      }

      
      return {
        // ...prevState,
        error: "",
        status: "SUCCESS",
      }
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


  return (
    <motion.div
      variants={staggerContainer()}
      className={cn('flex-[0.75] bg-black p-8 rounded-2xl border-white border', className)}
    >
      <p className={styles.sectionSubText}>Get in touch</p>
      <TypewriterEffectSmooth words={words_1} cursorClassName="bg-primary" />

      <form
        ref={formRef}
        action={formAction}
        className='mt-12 flex flex-col gap-8'
      >
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Tên của bạn
          </span>
          <Input
            required
            id="name"
            name='name'
            placeholder="what's your name?"
            className='bg-tertiary py-4 px-6 h-12
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
          {errors.name && (
            <p className={"startup-form_error"}>{errors.name}</p>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Your Email
          </span>
          <Input
            required
            id="name"
            name='email'
            placeholder="what's your email?"
            className='bg-tertiary py-4 px-6 h-12
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
          {errors.email && (
            <p className={"startup-form_error"}>{errors.email}</p>
          )}
        </label>
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Your Message
          </span>
          <Textarea
            required
            rows={7}
            id="message"
            name='message'
            placeholder="what do you want to say?"
            className='bg-tertiary py-4 px-6 
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
          {errors.message && (
            <p className={"startup-form_error"}>{errors.message}</p>
          )}
        </label>

        <Button
          type={"submit"}
          className={"startup-form_btn text-white"}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Send Your Message"}
          <Send className={"size-6 ml-2"} />
        </Button>
      </form>
    </motion.div>
  )
}

export default Contact; // SectionWrapper(Contact, 'contact')


const words_1 = [
  {
    text: "LIÊN",
    className: "text-white",
  },
  {
    text: "HỆ",
    className: "text-white",
  },
  {
    text: "VỚI",
    className: "text-white",
  },
  {
    text: "CHÚNG",
    className: "text-primary",
  },
  {
    text: "TÔI.",
    className: "text-primary",
  },
];