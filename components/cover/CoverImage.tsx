/**
 * Image de fond plein cadre pour un bandeau sombre (hero, bannières de page,
 * bandeau contact). À placer en premier enfant d'un conteneur `relative`.
 * N'affiche rien si aucune image n'est définie — le bandeau garde son fond
 * uni actuel.
 */
export default function CoverImage({ url }: { url?: string | null }) {
  if (!url) return null;
  return (
    <>
      <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="w-full h-full object-cover cover-kenburns" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1220]/70 via-[#0b1220]/60 to-[#0b1220]/85" aria-hidden />
    </>
  );
}
