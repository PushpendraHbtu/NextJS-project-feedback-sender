import {z} from 'zod';


export const messageSchema = z.object({
content: z.string().min(10,"Message must be at least 10 characters long").max(500,{message: 'Message must be less than 500 characters long'}).trim(), // here we use two method for printing message 
    
})