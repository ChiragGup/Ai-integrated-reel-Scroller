import { NextResponse } from "next/server";
import ConnectToDb from "@/helper/db";
import Video from "@/module/video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helper/options";


export async function DELETE(request, { params }) {
  try {
    const { id } = await params; 

    await ConnectToDb();
    await Video.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE VIDEO ERROR:", error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, thumbnailUrl } = body;

    if (!title || !description || !thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await ConnectToDb();

    const updated = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        thumbnailUrl,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE VIDEO ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

