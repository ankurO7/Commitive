import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-white">

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <DashboardNavbar user={session.user} />

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="relative z-10 w-full border-t border-white/5 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">C</span>
            </div>
            <p className="text-sm text-white/20">
              © {new Date().getFullYear()} Commitive. Track your open-source moves.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-white/20">
            <a href="#" className="hover:text-white/50 transition-colors">Documentation</a>
            <a href="#" className="hover:text-white/50 transition-colors">GitHub Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}