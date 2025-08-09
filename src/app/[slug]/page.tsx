import clientPromise from "@/lib/mongodb";
import { GetServerSideProps } from "next";
import React from "react";
import { getPosts } from "../api/rsvp/route";
import { getEventBySlug } from "../api/event/route";
import RsvpForm from "@/components/forms/RsvpForm";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const guest =
    typeof searchParams.guest === "string" ? searchParams.guest : "";

  const event = slug && (await getEventBySlug(slug));

  console.log("Event:", event);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <RsvpForm eventId={event._id} guest={guest} />
    </div>
  );
};

export default Page;
