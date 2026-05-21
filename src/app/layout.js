import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "ZippyCar | Premium Car Rental",
  description: "Experience premium mobility with Bangladesh's ultimate car rental solution.",
  icons: { icon: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#090d16]">
        <AuthProvider>
          <Navbar />
          <main className="pt-20 md:pt-20 flex-grow">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}