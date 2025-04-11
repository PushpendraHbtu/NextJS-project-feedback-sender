import {z} from 'zod';


export const verifySchema = z.object({
    code: z.string().min(6,"Code must be 6 characters long").max(6,"Code must be 6 characters long").regex(/^[0-9]+$/, "Code can only contain numbers").trim(),
})