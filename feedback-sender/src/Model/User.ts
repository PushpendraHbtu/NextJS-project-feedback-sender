import mongoose, { Schema , Document  } from "mongoose";

export interface Message extends Document {   //here we are defining the datatype as we are using typescript like cpp 
    content: string;
    contentat : Date;
    }
// here we deifning the schema for the message

    const MessageSchema: Schema<Message> = new Schema({ 
        content: { type: String, required: true },
        contentat: { type: Date, default: Date.now , required: true },

    })

    export interface User extends Document {   //here we are defining the datatype as we are using typescript like cpp 
        username: string;
        email: string;
        password: string;
        isAcceptingMessages: boolean;
        messages: Message[]; //array of messages
        verifyCode: string;
        isVerified: boolean;
        verifCodeExpiry : Date;
        }


        const UserSchema: Schema<User> = new Schema({ 
            username : { type: String, required: [true, "Username Required "] , trim: true , unique: true },
            email : { type: String, required: [true, "Email Required "] , trim: true , match : [ /.+\@.+\..+/, 'please use a valid email address']  },
            password : { type: String, required: [true, "Password Required "] ,},
            verifyCode : { type: String, required: [true, "Verification Code Required "] },
            verifCodeExpiry : { type: Date, required: [true, "Verification Code Expiry Required "] },

            isVerified : { type: Boolean, default: false },
            isAcceptingMessages : { type: Boolean, default: true },
            messages : [MessageSchema], //array of messages Beacuse we have a custom schema for messages so we have to define it here as well
    
        })

        const UserModel =(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema); //here we are creating the model for the user and exporting it

        export default UserModel; //exporting the model for the user