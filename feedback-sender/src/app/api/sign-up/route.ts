import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Model/User";
import bcrypt from "bcryptjs";
import {sendVerificationEmail}  from "@/Helper/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect(); // Connect to the database

    try{
        const { username, email, password } = await request.json(); // Parse the request body
          }
    catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response(JSON.stringify(
            { success: false, 
                message: "Database connection error." }),
                 { status: 500 }); 

    }

}