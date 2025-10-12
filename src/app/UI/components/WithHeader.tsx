"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

const WithHeader = () => {
  const pathname = usePathname();
  const showHeader = pathname !== "/login";

  return showHeader ? <Header /> : null;
};

export default WithHeader;
