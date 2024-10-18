import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ConversationProvider } from "@/contexts/ConversationContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "ChatGPT - Clone",
  description: "Clone web from ChatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ConversationProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ConversationProvider>
      </body>
    </html>
  );
}
