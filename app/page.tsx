import Hero from "@/components/Hero";
import ScratchCard from "@/components/ScratchCard";

export default function Page() {
  return (
    <>
      <Hero />
      <section className="min-h-screen flex items-center">
        <ScratchCard
          name="Crestmobile"
          year="1899"
          src="/crest-sample.jpg"
          story="The only surviving example in the world. Recovered as a rusted frame and returned, piece by piece, to running condition."
        />
      </section>
    </>
  );
}