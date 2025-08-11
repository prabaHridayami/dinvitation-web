"use client";

import React, { useState } from "react";
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
import { createRsvpApi, getRsvpApi, updateRsvpApi } from "@/api/rsvp";
import { useMutation } from "@tanstack/react-query";

type Props = {
  eventId: string;
  guest: string | string[] | undefined;
};

const FormSchema = z
  .object({
    eventId: z.string().min(1, {
      message: "Event ID is required",
    }),
    guest: z.string().min(1, {
      message: "Guest name is required",
    }),
    attending: z.string().refine((value) => value === "yes" || value === "no", {
      message: "Please select if you are attending",
    }),
    companion: z.string().refine((value) => Number(value) >= 0, {
      message: "Number of companions cannot be negative",
    }),
  })
  .refine((data) => data.attending === "yes" || Number(data.companion) === 0, {
    message: "If you are attending, you must provide a companion.",
  });

const RsvpForm = ({ eventId, guest }: Props) => {
  const [submitted, setsubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventId, // from props
      guest: String(guest) || "", // from props
      attending: "yes", // or 'yes'/'no' as appropriate
      companion: 0 || "", // or another sensible default
    },
  });

  const handleRsvp = async (data: z.infer<typeof FormSchema>) => {
    const isRsvp = await getRsvpApi(data.eventId, data.guest);
    console.log("isRsvp:", isRsvp);
    if (isRsvp.success) {
      // If RSVP exists, update it
      return await updateRsvpApi(data);
    } else {
      // If RSVP does not exist, create it
      return await createRsvpApi(data);
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (params: z.infer<typeof FormSchema>) => {
      return handleRsvp(params);
    },
    onSuccess: () => {
      setsubmitted(true);
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Form submitted with data:", data);
    mutate(data);
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
          name="eventId"
          render={() => (
            <FormItem hidden>
              <FormControl>
                <Input type="text" hidden />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guest"
          render={() => (
            <FormItem hidden>
              <FormControl>
                <Input type="text" hidden />
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
          className="text-white transition-colors rounded-full bg-green-950 hover:bg-green-800"
        >
          Submit RSVP
        </Button>

        {submitted && (
          <p className="italic text-green-950">
            {form.getValues("attending") === "yes"
              ? "Thank you for confirming your attendance!"
              : "Thank you for your kind wishes!"}
          </p>
        )}
      </form>
    </Form>
  );
};

export default RsvpForm;
