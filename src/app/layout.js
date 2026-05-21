import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthProvider } from "@/context/AuthContext"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZippyCar | Manage Your Fleet",
  description: "Manage your premium vehicles with ease.",
  icons: {
    icon: '/logo.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16]">
        
        <AuthProvider>
          <section>
            <Navbar />
          
          </section>

          <main className="pt-20 md:pt-20 flex-grow">
            {children}
          </main>
          
          <section>
           
            <Footer />
          </section>
        </AuthProvider>
      </body>
    </html>
  );
}