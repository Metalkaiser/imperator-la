import { AuthProvider } from "./components/context/authContext";
import { webAppProps } from "../utils/utils";

export const metadata = {
  title: webAppProps.name + " - Administración",
  description: webAppProps.adminDescription,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider><body>{children}</body></AuthProvider>;
}