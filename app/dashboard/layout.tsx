import { auth } from "@/auth"; // Ensure this points to your root auth.ts
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Secure the layout: Fetch session and redirect if not logged in
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-default-50/50">

      <DashboardNavbar user={session.user} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* 4. A clean, subtle footer tailored for the dashboard */}
      <footer className="w-full border-t border-divider py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-default-500">
            © {new Date().getFullYear()} Commitive. Track your open-source moves.
          </p>
          <div className="flex gap-4 text-sm text-default-500">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}