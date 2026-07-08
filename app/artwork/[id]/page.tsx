import { getArtwork } from "@/lib/artworks";
import { notFound } from "next/navigation";
import ProfDuxChat from "@/components/ProfDuxChat";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const art = getArtwork(id);
  if (!art) notFound();

  return (
    <main className="min-h-screen flex flex-col md:flex-row" style={{ background: "var(--color-void)" }}>
      {/* image */}
      <div className="relative md:w-1/2 h-72 md:h-screen">
        <div className="absolute inset-0" style={{ background: `url(${art.image}) center/cover` }} />
        <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-void via-transparent to-transparent" />
      </div>

      {/* details */}
      <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 gap-5">
        <p className="text-xs tracking-[0.4em] text-bone/40 uppercase">
          Cyprus Museum of Modern Arts
        </p>
        <div>
          <h1 className="display text-4xl md:text-5xl brass-text leading-tight">{art.title}</h1>
          <p className="text-bone/50 text-sm mt-1 italic">{art.titleEn}</p>
        </div>
        <div className="brass-rule w-32" />
        <div className="text-bone/70 text-sm space-y-1">
          <p><span className="text-brass">{art.artist}</span> · {art.country} · {art.artistYear}</p>
          <p>{art.medium} · {art.year}</p>
          <p className="text-bone/40">{art.dimensions}</p>
        </div>
        <p className="text-bone/70 leading-relaxed text-sm max-w-md mt-2">{art.narrative}</p>

        <ProfDuxChat artworkId={art.id} artworkTitle={art.title} />
      </div>
    </main>
  );
}