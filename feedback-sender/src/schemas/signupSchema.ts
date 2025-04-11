import {z} from 'zod';

export const usernmaeValidation = z.string().min(3,"Must be atleast 2 characters").max(20,"Must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores").trim().toLowerCase();

export const signupSchema = z.object({
 // for checking the multiples things thats we created object and we check here what thing are comes in singupSchema
  
 username: usernmaeValidation,
    // here we are using the usernmaeValidation which we created above
    email: z.string().email("Invalid email address"),
    // here we are using the email validation which we created above
    password :z.string().min(8,"Password must be at least 8 characters long").max(20,"Password must be less than 20 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    // here we are using the password validation which we created above

    

})