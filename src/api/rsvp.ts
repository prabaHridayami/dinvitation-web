export const createRsvpApi = async ({
  eventId,
  guest,
  attending,
  companion,
}: RsvpProps) => {
  try {
    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        guest,
        isAttending: attending === "yes",
        numberOfCompanion: attending === "yes" ? companion : 0,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create RSVP");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating RSVP:", error);
    throw new Error("Failed to create RSVP");
  }
};

export const getRsvpApi = async (eventId: string, guest: string) => {
  try {
    const response = await fetch(
      `/api/rsvp?eventId=${encodeURIComponent(
        eventId
      )}&guest=${encodeURIComponent(guest)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Response from getRsvpApi:", eventId);
    if (!response.ok) {
      throw new Error("Failed to fetch RSVP");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching RSVP:", error);
    throw new Error("Failed to fetch RSVP");
  }
};

export const updateRsvpApi = async ({
  eventId,
  guest,
  attending,
  companion,
}: RsvpProps) => {
  try {
    const response = await fetch("/api/rsvp", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        guest,
        isAttending: attending === "yes",
        numberOfCompanion: attending === "yes" ? companion : 0,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update RSVP");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating RSVP:", error);
    throw new Error("Failed to update RSVP");
  }
};
