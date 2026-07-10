import { getArtwork, artworkImage } from "@/lib/artworks";
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
        <div className="absolute inset-0" style={{ background: `url(${artworkImage(art)}) center/cover` }} />
        <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-void via-transparent to-transparent" />
      </div>

      {/* details */}
      <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 gap-5">
        <p className="text-xs tracking-[0.4em] text-bone/40 uppercase">
          Cyprus Museum of Modern Arts
        </p>

        <div>
          <h1 className="display text-4xl md:text-5xl brass-text leading-tight">{art.title}</h1>
          <p className="text-bone/60 text-sm mt-2">{art.artist} · {art.country}</p>
        </div>

        <div className="brass-rule w-32" />
        <div className="mt-3">
          <ProfDuxChat artworkId={art.num} artworkTitle={art.title} />
        </div>

        <div className="text-bone/70 text-sm space-y-1">
          <p><span className="text-brass">{art.category}</span></p>
          {art.keywords.length > 0 && (
            <p className="text-bone/50">{art.keywords.join(" · ")}</p>
          )}
          <p className="text-bone/30 text-xs tracking-widest mt-1">{art.id}</p>
        </div>

        <p className="text-bone/70 leading-relaxed text-sm max-w-md">{art.narrative}</p>

        {/* PROMINENT Prof Dux nudge */}
        <div className="mt-4">
          <div
            className="rounded-lg p-5 flex items-center gap-4"
            style={{ background: "var(--color-patina)", boxShadow: "inset 0 0 0 1px var(--color-brass)" }}
          >
            <div className="flex-1">
              <p className="display text-brass text-base">Curious about this work?</p>
              <p className="text-bone/50 text-xs mt-1">
                Ask Prof Dux anything — the story, the artist, the technique. By voice or text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}