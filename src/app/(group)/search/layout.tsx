import { ThemeProvider } from "@/components/context/theme-provider";
import { AppSidebar } from "@/components/search/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full gap-2 font-semibold text-lg animate-pulse">
              <Spinner />
            </div>
          }
        >
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </Suspense>
      </SidebarProvider>
    </ThemeProvider>
  );
}
