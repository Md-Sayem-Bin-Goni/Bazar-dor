
"use client";

import { Toast } from "@heroui/react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toast.Provider
        placement="top end"
        maxVisibleToasts={3}
        gap={12}
      />
    </>
  );
}