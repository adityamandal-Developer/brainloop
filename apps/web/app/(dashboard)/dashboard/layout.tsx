// layout.tsx
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      <main>{children}</main>
    </div>
  );
}
