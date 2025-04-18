import dbConnect from "@/lib/dbConnect";
import UserModel from "@/Model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/Helper/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect(); // Connect to the database

    try {
        const { username, email, password } = await request.json(); // Parse the request body

        // Check if the user already exists and verified user 
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })

        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify(
                {
                    success: false,
                    message: "Username already exists."
                }),
                { status: 400 }); // Conflict status code
        }

        //Now find the new user by Email 

        const existingUserByEmail = await UserModel.findOne({ email, isVerified: true })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit verification code

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify(
                    {
                        success: false,
                        message: "Email already exists."
                    }),
                    { status: 400 }); // Conflict status code
            }
            else {
                // If the user exists but is not verified, update the verification code and expiry date
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                existingUserByEmail.password = hashedPassword; // Update the password
                existingUserByEmail.verifyCode = verifyCode; // Update the verification code    
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // Set the expiry date to 1 hour from now
                await existingUserByEmail.save(); // Save the updated user document
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1); // Set the expiry date to 1 hour from now
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate, // Set the expiry date for the verification code
                isVerified: false, // Set the user as not verified
                // isDeleted: false, // Set the user as not deleted
                isAcceptingMessages: true, // Set the user as accepting messages
                messages: [], // Initialize an empty array for messages
            })
            await newUser.save(); // Save the new user to the database

        }

        // Send the verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode); // Send the verification email
        if (!emailResponse.success) {
            return new Response(JSON.stringify(
                {
                    success: false,
                    message: "Failed to send verification email."
                }),
                { status: 500 }); // Internal server error status code
        }

        return new Response(JSON.stringify(
            {
                success: true,
                message: "User registered successfully. Verification email sent.",
                //    isAccesptingMessages: true, // Set to true if the user is accepting messages
            }),
            { status: 201 }); // Created status code

    }




    catch (error) {
        console.error("Error connecting to the database:", error);
        return new Response(JSON.stringify(
            {
                success: false,
                message: "Database connection error."
            }),
            { status: 500 });

    }

}