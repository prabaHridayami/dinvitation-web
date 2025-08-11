import React from "react";
import { getEventBySlug } from "../../lib/requests/event";
import RsvpForm from "@/components/forms/RsvpForm";
import Image from "next/image";
import { Parisienne, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import Content from "@/components/parts/Content";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { guest } = await searchParams;

  const event = slug && (await getEventBySlug(slug));

  if (!event && !guest) {
    return <div>Event not found</div>;
  }

  return (
    <div className="bg-golden-light">
      <div
        className={cn(
          quicksand.className,
          "container relative mx-auto p-4 xl:w-1/3"
        )}
      >
        {/* Background frames */}
        <div className="absolute mb-8 top-0 left-0 right-0 h-[300px] lg:h-[500px] z-0 pointer-events-none">
          <Image src="/assets/top-frame.png" alt="top-frame" fill priority />
        </div>

        <div className="absolute mb-8 bottom-0 left-0 right-0 h-[300px] lg:h-[500px] z-0 pointer-events-none">
          <Image
            src="/assets/bottom-frame.png"
            alt="bottom-frame"
            fill
            priority
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 p-6 py-20 space-y-10 text-center bg-transparent lg:p-20 xl:p-30">
          <Content guest={guest} eventId={event._id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
