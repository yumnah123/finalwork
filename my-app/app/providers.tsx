// app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { SiteProvider } from "../components/context/SiteContext";

export function Providers({
  children,
  session,
  initialSettings,
}: {
  children: React.ReactNode;
  session?: any;
  initialSettings: any;
}) {
  return (
    <SessionProvider session={session}>
      <SiteProvider initialSettings={initialSettings}>
        {children}
      </SiteProvider>
    </SessionProvider>
  );
}
