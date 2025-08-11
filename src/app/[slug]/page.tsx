import React from "react";
import { getEventBySlug } from "../../lib/requests/event";
import RsvpForm from "@/components/forms/RsvpForm";
import Image from "next/image";
import { Parisienne } from "next/font/google";
import { cn } from "@/lib/utils";

const parisienne = Parisienne({
  variable: "--font-parisienne",
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
    <div className="bg-[#fdfcf7]">
      <div className={cn("container relative mx-auto p-4 xl:w-1/3")}>
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
        <div className="relative z-10 p-8 py-20 space-y-10 text-center bg-transparent lg:p-20 xl:p-30">
          <div className="space-y-4">
            <h1 className="text-2xl italic">Dear,&nbsp;{guest}</h1>
            <h2 className="text-lg lg:text-xl">
              You&apos;re Invited to the Wedding of
            </h2>
          </div>

          <div
            className={`${parisienne.className} relative text-5xl lg:text-7xl font-bold mb-4`}
          >
            <h2 className="text-[#e4d8be] opacity-50 text-[120px] lg:text-[200px]">
              &
            </h2>
            <h2 className="absolute top-0 left-0 right-0 text-green-950">
              Alex Soto
            </h2>
            <h2 className="absolute bottom-0 left-0 right-0 text-green-950">
              Prema Vipassani
            </h2>
          </div>

          <p>
            With joyful hearts, we invite you to celebrate our union as we begin
            this new chapter together.
          </p>

          <hr />

          <div>
            <p className="text-lg font-bold">Wedding Ceremony</p>
            <p>📍 Edinburgh City Chambers</p>
            <p>253 High Street, Edinburgh EH1 1YJ</p>
            <p>🗓️ Saturday, 25th October 2025</p>
            <p>🕤 9:30 AM – 10:30 AM</p>
          </div>

          <div>
            <p className="text-lg font-bold">Wedding Reception</p>
            <p>📍 Hotel Du Vin</p>
            <p>11 Bristo Place, Edinburgh EH1 1EZ</p>
            <p>🕤 11:00 AM – 7:00 PM</p>
          </div>

          <hr />

          <p>
            Your presence means the world to us, and is the greatest wedding
            gift we could ever ask for.
          </p>
          <p>
            However, if giving is your way of showing love, a contribution
            towards Prema’s visa application would be received with heartfelt
            gratitude and deeply appreciated as we take this journey together as
            husband and wife.
          </p>

          <div>
            <p>With love,</p>
            <p className={cn(parisienne.className, "text-4xl text-green-dark")}>
              Alex & Prema
            </p>
          </div>

          <div>
            <p className="mb-3">Our Joint Bank Account Details</p>
            <p>Account Name: P Vipassani & A Soto Lopez</p>
            <p>Sort Code: 23-01-20</p>
            <p>Account Number: 14167362</p>
            <p>Bank: Revolut</p>
          </div>

          <p>Kindly RSVP before 30th&nbsp;September&nbsp;2025</p>

          <RsvpForm eventId={event._id} guest={guest} />

          <div className="relative w-full h-[573px] max-w-[430px] max-h-[573px] mt-8 text-center mx-auto">
            <Image
              src="/assets/alex_and_prema.webp"
              alt="alex_prema"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
