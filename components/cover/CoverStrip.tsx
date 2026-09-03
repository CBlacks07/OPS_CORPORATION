import Reveal from '@/components/motion/Reveal';

/**
 * Bandeau photo décoratif au-dessus du titre d'une section claire (fond blanc
 * ou slate-50), sans recouvrir le texte. N'affiche rien si aucune image n'est
 * définie.
 */
export default function CoverStrip({ url }: { url?: string | null }) {
  if (!url) return null;
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl h-52 md:h-64 mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover cover-kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
      </div>
    </Reveal>
  );
}
