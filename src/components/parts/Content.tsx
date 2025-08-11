"use client";
import React from "react";
import { motion } from "motion/react";
import { Parisienne, Quicksand } from "next/font/google";
import { cn } from "@/lib/utils";
import RsvpForm from "../forms/RsvpForm";
import Image from "next/image";
import { tr } from "zod/v4/locales";

type Props = {
  guest: string | string[] | undefined;
  eventId: string;
};

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
});

const motionOpt = {
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: { once: true, amount: 0.5 },
  initial: { opacity: 0, y: 20 },
  transition: { duration: 1 },
};

const motionOptLine = {
  whileInView: {
    opacity: 1,
    width: "100%",
  },
  initial: { opacity: 0, width: 0 },
  viewport: { once: true },
  transition: { duration: 1 },
};

const Content = ({ guest, eventId }: Props) => {
  return (
    <>
      <motion.div {...motionOpt} className="space-y-4">
        <h1 className="text-2xl italic">Dear,&nbsp;{guest}</h1>
        <h2 className="text-lg lg:text-xl">
          You&apos;re Invited to the Wedding of
        </h2>
      </motion.div>

      <motion.div
        {...motionOpt}
        transition={{ duration: 1, delay: 1 }}
        className={`${parisienne.className} relative text-[44px] lg:text-6xl font-bold mb-4`}
      >
        <h2 className="text-[#e4d8be] opacity-50 text-[100px] lg:text-[200px]">
          &
        </h2>
        <h2 className="absolute top-0 left-0 right-0 text-green-950">
          Alex Soto
        </h2>
        <h2 className="absolute bottom-0 left-0 right-0 text-green-950">
          Prema Vipassani
        </h2>
      </motion.div>

      <motion.p {...motionOpt} transition={{ duration: 1, delay: 2 }}>
        With joyful hearts, we invite you to celebrate our union as we begin
        this new chapter together.
      </motion.p>

      <motion.hr {...motionOptLine} transition={{ duration: 1, delay: 2 }} />

      <motion.div {...motionOpt} transition={{ duration: 1, delay: 2.5 }}>
        <p className="text-lg font-bold">Wedding Ceremony</p>
        <p>📍 Edinburgh City Chambers</p>
        <p>253 High Street, Edinburgh EH1 1YJ</p>
        <p>🗓️ Saturday, 25th October 2025</p>
        <p>🕤 9:30 AM – 10:30 AM</p>
      </motion.div>

      <motion.div {...motionOpt}>
        <p className="text-lg font-bold">Wedding Reception</p>
        <p>📍 Hotel Du Vin</p>
        <p>11 Bristo Place, Edinburgh EH1 1EZ</p>
        <p>🕤 11:00 AM – 7:00 PM</p>
      </motion.div>

      <motion.hr {...motionOptLine} />

      <motion.p {...motionOpt}>
        Your presence means the world to us, and is the greatest wedding gift we
        could ever ask for.
      </motion.p>
      <motion.p {...motionOpt}>
        However, if giving is your way of showing love, a contribution towards
        Prema’s visa application would be received with heartfelt gratitude and
        deeply appreciated as we take this journey together as husband and wife.
      </motion.p>

      <motion.div {...motionOpt}>
        <p>With love,</p>
        <p className={cn(parisienne.className, "text-4xl text-green-dark")}>
          Alex & Prema
        </p>
      </motion.div>

      <motion.div {...motionOpt}>
        <p className="mb-3">Our Joint Bank Account Details</p>
        <p>Account Name: P&nbsp;Vipassani&nbsp;&&nbsp;A&nbsp;Soto&nbsp;Lopez</p>
        <p>Sort Code: 23-01-20</p>
        <p>Account Number: 14167362</p>
        <p>Bank: Revolut</p>
      </motion.div>

      <motion.p {...motionOpt}>
        Kindly RSVP before 30th&nbsp;September&nbsp;2025
      </motion.p>

      <motion.div {...motionOpt}>
        <RsvpForm eventId={eventId} guest={guest} />
      </motion.div>

      <motion.div
        {...motionOpt}
        className="relative w-full h-[573px] max-w-[430px] max-h-[573px] mt-8 text-center mx-auto"
      >
        <Image
          src="/assets/alex_and_prema.webp"
          alt="alex_prema"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </motion.div>
    </>
  );
};

export default Content;
