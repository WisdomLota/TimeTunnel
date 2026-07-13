import { notFound } from "next/navigation";
import { getMuseumConfig } from "@/lib/museums";
import { MuseumProvider } from "@/lib/museums/context";

export default async function MuseumLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ museum: string }>;
}) {
  const { museum } = await params;
  const config = getMuseumConfig(museum);
  if (!config) notFound();

  return <MuseumProvider config={config}>{children}</MuseumProvider>;
}