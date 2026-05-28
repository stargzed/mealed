// Five mock chef headshots sourced from Unsplash's free chef portrait set,
// constrained to small square crops so the avatar strip stays lightweight.
// Switch to real chef photos once the marketplace is seeded.
const HEADSHOTS = [
 {
  src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&h=120&fit=crop&crop=faces",
  alt: "Verified chef Maya",
 },
 {
  src: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=120&h=120&fit=crop&crop=faces",
  alt: "Verified chef Andre",
 },
 {
  src: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=120&h=120&fit=crop&crop=faces",
  alt: "Verified chef Lina",
 },
 {
  src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=120&h=120&fit=crop&crop=faces",
  alt: "Verified chef Sofia",
 },
 {
  src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=120&h=120&fit=crop&crop=faces",
  alt: "Verified chef Marcus",
 },
];

/**
 * "Trusted by 100+ chefs" pill that opens the hero stacked headshot avatars
 * + supporting copy. Replaces the older initial-letter avatar version.
 */
export function TrustPill() {
 return (
  <div className="inline-flex items-center rounded-full border border-border bg-white p-1 pr-3.5 shadow-soft">
   <div className="flex -space-x-2">
    {HEADSHOTS.map((h) => (
     <span
      key={h.src}
      className="relative inline-flex w-7 h-7 rounded-full overflow-hidden ring-2 ring-white bg-soft"
     >
      {/* Plain <img> on purpose these are external Unsplash crops, no
        Next image optimization needed. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
       src={h.src}
       alt={h.alt}
       className="object-cover w-full h-full"
       loading="lazy"
      />
     </span>
    ))}
   </div>
   <p className="pl-3 text-xs text-sub whitespace-nowrap">
    Verified local chefs in LA
   </p>
  </div>
 );
}
