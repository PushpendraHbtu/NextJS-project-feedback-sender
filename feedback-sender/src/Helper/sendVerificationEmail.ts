import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/Verifiactionmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string   // otp
) : Promise<ApiResponse<any>> {

    try {
        // Send the email using Resend API
        await resend.emails.send({
            from: "you@example.com",
            to: email,
            subject: "Verification Code",
            react: VerificationEmail({
                username,
                otp: verifyCode,
            }),
        });
        console.log("Verification email sent successfully.");
        return {
            success: true,
            message: "Verification email sent successfully.",
        }
    
    }
    catch (emailError) {
        console.error("Error sending verification email:", emailError);
        return {
            success: false,
            message: "Failed to send verification email.",
        };
    }
} 