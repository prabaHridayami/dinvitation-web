"use client";
import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";

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
    companion: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.attending === "no" && Number(data.companion) > 0) {
      ctx.addIssue({
        path: ["companion"],
        code: z.ZodIssueCode.custom,
        message: "If you are not attending, you cannot have companions.",
      });
    }
  });

const RsvpForm = ({ eventId, guest }: Props) => {
  const [submitted, setsubmitted] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventId, // from props
      guest: String(guest) || "", // from props
      attending: "yes", // or 'yes'/'no' as appropriate
      companion: "0", // or another sensible default
    },
  });

  const { data } = useQuery({
    queryKey: ["rsvp", eventId, guest],
    queryFn: async () => {
      if (!eventId || !guest) return null;
      const response = await getRsvpApi(eventId, String(guest));

      return response;
    },
    enabled: !!eventId && !!guest,
  });

  useEffect(() => {
    if (data && data.success) {
      form.reset({
        eventId: data.data.eventId,
        guest: data.data.guest,
        attending: data.data.isAttending ? "yes" : "no",
        companion: String(data.data.numberOfCompanion || 0),
      });
    } else {
      form.reset();
    }
  }, [data, form]);

  const handleRsvp = async (params: z.infer<typeof FormSchema>) => {
    params = {
      ...params,
      attending: "yes",
      companion: params.attending === "yes" ? params.companion : "0",
    };
    if (data.success) {
      // If RSVP exists, update it
      return await updateRsvpApi(params);
    } else {
      // If RSVP does not exist, create it
      return await createRsvpApi(params);
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

        {(submitted || data?.data) && (
          <p className="italic text-green-950">
            {form.getValues("attending") === "yes"
              ? "Thank you for confirming your attendance!"
              : "Thank you for your kind wishes!"}
          </p>
        )}

        <Button
          type="submit"
          className="text-white transition-colors rounded-full bg-green-950 hover:bg-green-800"
        >
          Submit RSVP
        </Button>
      </form>
    </Form>
  );
};

export default RsvpForm;
