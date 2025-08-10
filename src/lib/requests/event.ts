import clientPromise from "@/lib/mongodb";
import { Collection, Db } from "mongodb";

export async function getEvents(): Promise<any | null> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "dinvitation");

  const events: Collection = db.collection("events");
  return events.find().toArray();
}

export async function getEventByUid(uid: string): Promise<any | null> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "dinvitation");

  const events: Collection = db.collection("events");
  return events.findOne({ uid });
}

export async function getEventBySlug(slug: string): Promise<any | null> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "dinvitation");

  const events: Collection = db.collection("events");
  const event = await events.findOne({ slug });

  if (!event) {
    return null;
  }

  return {
    ...event,
    _id: event._id.toString(), // Convert ObjectId to string for easier handling in the frontend
  };
}
