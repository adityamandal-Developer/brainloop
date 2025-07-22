import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./_components/sidebar/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className="sticky top-0 px-4 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header> */}
        <div className="flex justify-center items-center flex-1 flex-col gap-4  pt-0">
          <div className="h-full flex-1 justify-center items-center rounded-xl min-h-screen">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
