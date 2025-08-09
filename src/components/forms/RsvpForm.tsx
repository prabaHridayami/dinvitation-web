"use client";
import React, { useState } from "react";

type Props = {
  eventId: string;
  guest?: string;
};

const RsvpForm = ({ eventId, guest }: Props) => {
  const [isAttending, setIsAttending] = useState<boolean>(false);
  const [numberOfCompanion, setNumberOfCompanion] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here

    console.log("Event ID:", eventId);
    console.log("Guest:", guest);
    console.log("Form submitted", isAttending, numberOfCompanion);

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        guest,
        isAttending,
        numberOfCompanion,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="attending">Will you attend?</label>
        <select
          id="attending"
          name="attending"
          required
          onChange={(e) => setIsAttending(e.target.value === "yes")}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="companion">Number of companion:</label>
        <input
          type="number"
          id="companion"
          name="companion"
          required
          onChange={(e) =>
            setNumberOfCompanion(e.target.value ? parseInt(e.target.value) : 0)
          }
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RsvpForm;
