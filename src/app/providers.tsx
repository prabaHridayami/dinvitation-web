"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { ThemeProvider } from "@/components/theme-provider";
// import { PopupProvider } from "@/contexts/PopupContext";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
