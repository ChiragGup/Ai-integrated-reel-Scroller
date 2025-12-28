import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helper/options";
import ConnectToDb from "@/helper/db";
import Video from "@/module/video";

// GET all videos
export async function GET(request) {
  try {
    await ConnectToDb();
    const result = await Video.find().lean();

    if (!result || result.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching videos" }, { status: 500 });
  }
}

// POST new video
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDb();

    const body = await request.json();
    const { title, description, videoUrl, thumbnailUrl, transformation } = body;

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const videoData = {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      transformation: {
        height: 1920,
        width: 1080,
        quality: transformation?.quality ?? 100,
      },
    };

    const response = await Video.create(videoData);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating video" }, { status: 500 });
  }
}
