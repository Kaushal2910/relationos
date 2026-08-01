import React from "react";
import { PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel";
import type { ImageItem } from "@/components/ui/phone-mockups-1-utils/phone-carousel";

/**
 * RelationOS product screens.
 *
 * Each entry points at a screenshot in /public/screens (a .webp produced by
 * `npm run optimize`) and carries a branded wireframe `fallback`. The fallback
 * renders *behind* the image, so:
 *   • with no images present  → the phone shows clean wireframe app screens
 *   • once you drop the PNGs in public/screens and run `npm run optimize`
 *     → the real screenshots simply cover them
 * Nothing else needs to change when you add the assets later.
 */
export const relationosScreens: ImageItem[] = [
  {
    src: "/screens/discover.webp",
    alt: "Discover — swipe on a candlelit date spot card",
    caption: "Swipe on date spots you'd love",
    fallback: {
      name: "Discover",
      grad: "from-rose-400 via-rose-500 to-amber-400",
      accent: "#E4557B",
    },
  },
  {
    src: "/screens/home.webp",
    alt: "Paired dashboard with upcoming date and streak",
    caption: "A shared home for your circle",
    fallback: {
      name: "RelationOS",
      grad: "from-amber-300 via-orange-400 to-rose-400",
      accent: "#E4557B",
    },
  },
  {
    src: "/screens/wishlist.webp",
    alt: "Wishlist of matched and planned experiences",
    caption: "Mutual likes glow on your wishlist",
    fallback: {
      name: "Your matches",
      grad: "from-rose-300 via-pink-400 to-fuchsia-400",
      accent: "#E4557B",
    },
  },
  {
    src: "/screens/memory.webp",
    alt: "Memory detail with photo grid and diary note",
    caption: "Keep every evening forever",
    fallback: {
      name: "Memory",
      grad: "from-indigo-400 via-violet-500 to-rose-400",
      accent: "#6C5CE7",
    },
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={relationosScreens} />;
}
