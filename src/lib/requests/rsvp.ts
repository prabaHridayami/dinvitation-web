import clientPromise from "@/lib/mongodb";
import { Db, Collection } from "mongodb";

export async function getPosts(): Promise<any[]> {
  const client = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "dinvitation");

  const posts: Collection = db.collection("events");
  return posts.find().toArray();
}
