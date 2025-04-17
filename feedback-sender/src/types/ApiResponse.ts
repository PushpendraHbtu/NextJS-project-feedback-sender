// This is a custom type definition for the API response

// It defines the structure of the response object returned by the API

import { Message } from '@/Model/User'; // Importing the Message type

export interface ApiResponse<T> {
    success: boolean; // Indicates if the API call was successful
    message: string; // A message providing additional information about the response
    isAccesptingMessages ? : boolean; // Optional field indicating if the API is accepting messages
    messages ? : Message[]; // Optional field containing an array of messages, if applicable
}

