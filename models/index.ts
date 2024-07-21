import { z } from "zod";


export const formSchema = z.object({
  search: z.string(),
  type: z.string().optional(),
})
