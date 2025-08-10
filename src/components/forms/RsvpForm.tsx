"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  eventId: string;
  guest: string | string[] | undefined;
};

const FormSchema = z
  .object({
    attending: z.enum(["yes", "no"], {
      error: "Please confirm your attendance",
    }),
    companion: z.string().min(1, {
      message: "Companion is required",
    }),
  })
  .refine((data) => data.attending === "yes" || data.companion === "", {
    message: "If you are attending, you must provide a companion.",
  });

const RsvpForm = ({ eventId, guest }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // event.preventDefault();
    // Handle form submission logic here

    console.log("Event ID:", eventId);
    console.log("Guest:", guest);
    // console.log("Form submitted", isAttending, numberOfCompanion);

    // const res = await fetch("/api/rsvp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     eventId,
    //     guest,
    //     isAttending,
    //     numberOfCompanion,
    //   }),
    // });

    // const data = await res.json();
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="attending"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Confirm your attendance:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel>Yes, I&apos;ll be there</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel>No, but I wish you all the best!</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companion"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Number of companions:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter number of companions"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          onClick={() => {
            console.log("test");
          }}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RsvpForm;
