import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function getPosts(): Promise<any[]> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "dinvitation");

  const posts: Collection = db.collection("events");
  return posts.find().toArray();
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { eventId, guest, isAttending, numberOfCompanion } = body;

    const client = await clientPromise;
    const db: Db = client.db(process.env.DB_NAME || "dinvitation");
    const rsvps: Collection = db.collection("rsvp");
    const result = await rsvps.insertOne({
      eventId,
      guest,
      isAttending,
      numberOfCompanion,
      createdAt: new Date(),
    });
    return NextResponse.json({
      message: "RSVP created successfully",
      data: result.insertedId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
