"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session?: any;
};

function Provider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
