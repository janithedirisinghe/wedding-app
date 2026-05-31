import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import PageFooter from "../components/pagefooter";

export const metadata: Metadata = {
  title: "Invity - Wedding Invitation Manager",
  description: "Create and manage beautiful wedding invitations with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-50">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />
            
            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <div className="container-responsive py-6">
                {children}
              </div>
            </main>
            
            {/* Footer */}
            <PageFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
