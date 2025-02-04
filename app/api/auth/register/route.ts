import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/models/User";


export async function POST(request: NextRequest) {
    

    try {
        const {email,password,} = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        await connectToDatabase();

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        await User.create({
            email,
            password
        });

        return NextResponse.json(
            {message: "User registered successfully"},
            {status: 201}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 500}
        )
    }

}


// async function registerUser() {
//     try {
//         const response = await fetch("/api/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: "email",
//                 password: "password"
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Response:", data);
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// }

// registerUser();
