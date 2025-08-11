import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { eventId, guest, isAttending, numberOfCompanion } = body;

    if (!eventId || !guest) {
      return NextResponse.json(
        { success: false, error: "Missing eventId or guest parameter" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db: Db = client.db(process.env.DB_NAME || "dinvitation");
    const rsvps: Collection = db.collection("rsvp");

    const updateResult = await rsvps.updateOne(
      { eventId, guest },
      {
        $set: {
          isAttending,
          numberOfCompanion,
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "RSVP not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "RSVP updated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const guest = searchParams.get("guest");

    console.log("GET RSVP:", { eventId, guest });

    if (!eventId || !guest) {
      return NextResponse.json(
        { success: false, error: "Missing eventId or guest parameter" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db: Db = client.db(process.env.DB_NAME || "dinvitation");
    const rsvps: Collection = db.collection("rsvp");
    const rsvp = await rsvps.findOne({ eventId, guest });

    if (!rsvp) {
      return NextResponse.json(
        { success: false, error: "RSVP not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rsvp });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
