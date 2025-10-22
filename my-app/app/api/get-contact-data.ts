export async function getContactData() {
  try {

    const baseUrl =
      process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}/api/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            contactPages {
              bookingService
              phoneSupport
              officeHours
              weekendOffice
              emergencyService
              note
              faqs(orderBy: { order: asc }) {
                question
                answer
                order
              }
            }
          }
        `,
      }),
      cache: "no-store", 
    });

    const data = await res.json();



    return data.data?.contactPages?.[0] || null;
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
}
