import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await connectToDatabase();
        const video =await Video.find({}).sort({ createdAt: -1 }).lean()
        if(!video || video.length === 0) {
            return NextResponse.json([],{status:200});
        }
        return NextResponse.json(video,{status:200});


    } catch (error) {
        return NextResponse.json({error: "Failed to fetch videos"},{status:500});
    }
}

export async function POST({request : NextRequest}) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({error: "Unauthorized"},{status:401});
        }

        await connectToDatabase();
        const body:IVideo = await request.json();

        if(
            !body.title ||
            !body.description ||
            !body.videourl ||
            !body.thubmnailUrl

        ){
            return NextResponse.json({error: "All fields are required"},{status:400});
        }
        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            }
        }
        const newVideo = await Video.create(videoData);
        return NextResponse.json(newVideo,{status:201});


    } catch (error) {
        return NextResponse.json({error: "Failed to create video"},{status:500});
    }
}