import { Jost } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const jost = Jost({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
 });

export const metadata = {
  title: "mindjourney",
  description: "generated happiness",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
