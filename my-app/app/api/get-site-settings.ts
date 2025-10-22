export async function getSiteSettings() {
  try {
   
    const baseUrl =
      process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}/api/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            siteSettings {
              siteName
              phoneNumber
              phoneNumberRaw
              companyDescription
              addressLine1
              addressLine2
              city
              postalCode
              country
              googleMapsUrl
              email
              website
              websiteUrl
              facebookUrl
              twitterUrl
              linkedinUrl
              copyrightText
              designerCredit
              logo {
                url
              }
            }
          }
        `,
      }),
      // Disable caching to always fetch latest CMS content
      cache: "no-store",
    });

    const data = await res.json();

    return data.data?.siteSettings?.[0] || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
