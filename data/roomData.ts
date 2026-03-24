import { GroupRoom, Room } from "@/types/roomType";
import {
  duskHighlights,
  duskFeatures,
  twilightHighlights,
  twilightFeatures,
  horizonFeatures,
  starlingHighlights,
  starlingFeatures,
  eveFeatures,
  eclipseFeatures,
  cometFeatures,
  lunaFeatures,
  lunaHighlights,
  mystFeatures,
  cometHighlights,
} from "./featureData";

const CDN = process.env.CDN;


// ################################
// ########## INDIVIDUAL ROOMS #########
// ################################
export const individualRooms: Room[] = [
  {
    name: "Dusk",
    tagline: "Luxury Room with Terrace",
    bestValue: true,
    description: `Dusk is the most luxurious of all the rooms at the property. It has an attached terrace where you can enjoy bonfire and barbecue and a settee area (Lower himachali style sitting).\n\n 
        Saanjh is the right option for someone who is willing to experience nature up close while staying in a close proximity to the main city.`,
    image: `${CDN}/covers/dusk-cover.avif`,
    imageAlt: "Dusk Room Cover Pic - Saanjh, Shimla",
    guests: 2,
    highlights: duskHighlights,
    features: duskFeatures,
  },
  {
    name: "Twilight",
    tagline: "Economy Deluxe Room",
    description: `Twilight is the most economic of all the rooms at Saanjh. It has an attached washroom with very ambient lighting and passionately done interiors.\n\nSaanjh is the right option for someone who is willing to experience nature up close while staying in close proximity to the main city.`,
    image: `${CDN}/covers/twilight-cover.avif`,
    imageAlt: "Twilight Room Cover - Saanjh, Shimla",
    guests: 2,
    highlights: twilightHighlights,
    features: twilightFeatures,
  },
  {
    name: "Horizon",
    tagline: "Attic Room with Balcony",
    description: `Horizon is a cozy luxury room with an attached balcony perfect for a couple to have breakfast in. It is on the attic floor, which is one experience you can only get in the hills.\n\nEnjoy barbecue and bonfire with our dedicated chefs.`,
    image: `${CDN}/covers/horizon-cover.avif`,
    imageAlt: "Horizon Room Cover - Saanjh, Shimla",
    guests: 2,
    bestValue: false,
    highlights: starlingHighlights,
    features: horizonFeatures,
  },
  {
    name: "Starling",
    tagline: "Attic Panoramic Room",
    description: `Starling is a cozy luxury room with amazing panoramic views, perfect for a couple to stay. It is on the attic floor, which is one experience you can only get in the hills.\n\nEnjoy access to all common areas with a lot to read and play.`,
    image: `${CDN}/covers/starling-cover.avif`,
    imageAlt: "Starling Room Cover - Saanjh, Shimla",
    guests: 2,
    bestValue: false,
    highlights: starlingHighlights,
    features: starlingFeatures,
  },
  {
    name: "Eve",
    tagline: "Attic Room with Balcony",
    description: `Eve is a cozy luxury room with an attached balcony perfect for a couple to have breakfast in. It is on the attic floor, which is one experience you can only get in the hills.\n\nEnjoy barbecue and bonfire with our dedicated chefs.`,
    image: `${CDN}/covers/eve-cover.avif`,
    imageAlt: "Eve Room Cover - Saanjh, Shimla",
    guests: 2,
    bestValue: false,
    highlights: starlingHighlights,
    features: eveFeatures,
  },
  {
    name: "Eclipse",
    tagline: "Duplex Room with Balcony",
    description: `Eclipse is a stylish and unique duplex room that sets the stage for a memorable trip. Spread across two floors with two king beds, it's perfect for families or groups looking for something truly special.\n\nEnjoy your private balcony with stunning views and all the comforts of home.`,
    image: `${CDN}/covers/eclipse-cover.avif`,
    imageAlt: "Eclipse Room Cover - Rua, Shimla",
    guests: 4,
    bestValue: true,
    highlights: duskHighlights,
    features: eclipseFeatures,
  },
  {
    name: "Comet",
    tagline: "Room with Balcony and View",
    description: `Comet is a duplex which offers rustic interiors, breathtaking valley views, and all the comforts for a peaceful stay.\n\nStep out onto your private balcony and soak in the Himalayan landscape.`,
    image: `${CDN}/covers/comet-cover.avif`,
    imageAlt: "Comet Room Cover - Rua, Shimla",
    guests: 4,
    bestValue: false,
    highlights: cometHighlights,
    features: cometFeatures,
  },
  {
    name: "Luna",
    tagline: "Room with Jacuzzi and View",
    description: `Luna is a stylish and unique room with a private jacuzzi, perfect for a relaxing getaway. Soak under the open sky while taking in breathtaking mountain views.\n\nA truly indulgent experience nestled in the heart of the Himalayas.`,
    image: `${CDN}/covers/luna-cover.avif`,
    imageAlt: "Luna Room Cover - Rua, Shimla",
    guests: 2,
    bestValue: false,
    highlights: lunaHighlights,
    features: lunaFeatures,
  },
  {
    name: "Myst",
    tagline: "Room with Jacuzzi and View",
    description: `Myst is a stylish and unique room with a private jacuzzi, perfect for a relaxing getaway. Soak under the open sky while taking in breathtaking mountain views.\n\nA truly indulgent experience nestled in the heart of the Himalayas.`,
    image: `${CDN}/covers/myst-cover.avif`,
    imageAlt: "Myst Room Cover - Rua, Shimla",
    guests: 2,
    bestValue: false,
    highlights: lunaHighlights,
    features: mystFeatures,
  },
];





// ################################
// ########## GROUP ROOMS #########
// ################################

export const groupRooms: GroupRoom[] = [
  {
    name: "The Sunset Suite",
    tagline: "Two rooms, one unforgettable view",
    description: `Combine Dusk and Twilight for a private 2BHK experience with a stunning private balcony, living area, and common dining space. Perfect for two couples or a small family looking for a luxurious Himalayan escape with a dedicated bonfire area.`,
    rooms: ["Dusk", "Twilight"],
    guests: 4,
    image: `${CDN}/covers/sunset-suite.png`,
    imageAlt:
      "Dusk and Twilight rooms at Saanjh with private balcony and mountain view",
    highlights: [
      "2BHK Private",
      "Private Balcony",
      "Bonfire",
      "Living Area",
      "Mountain View",
    ],
  },
  {
    name: "The Attic Collective",
    tagline: "A cozy sky-high escape for six",
    description: `Starling, Horizon, and Eve together form a dreamy 3BHK attic retreat. Each room has its own private balcony, and the group shares a common dining area. There's no better way to experience the magic of waking up in the Himalayan attic with your closest ones.`,
    rooms: ["Starling", "Horizon", "Eve"],
    guests: 6,
    image: `${CDN}/covers/attic-cover.png`,
    imageAlt:
      "Attic rooms at Saanjh with panoramic Himalayan views and private balconies",
    highlights: [
      "3BHK Attic",
      "3 Private Balconies",
      "Panoramic View",
      "Common Dining",
      "Mountain View",
    ],
  },
  {
    name: "Saanjh — The Full Musical Sunset",
    tagline: "The whole villa, all to yourself",
    description: `Book all five rooms at Saanjh and unlock a completely private 5BHK boutique villa experience. Three balconies, a private dining area, dedicated bonfire pit, and breathtaking mountain views — all exclusively yours. The ultimate group retreat in the Himalayas for up to 10 people.`,
    rooms: ["Dusk", "Twilight", "Horizon", "Starling", "Eve"],
    guests: 10,
    image: `${CDN}/covers/villa-cover.png`,
    imageAlt:
      "Full Saanjh villa exterior with mountain backdrop and sunset view, Mashobra Shimla",
    highlights: [
      "Entire Villa",
      "5BHK Private",
      "3 Balconies",
      "Private Dining",
      "Bonfire",
    ],
  },
  {
    name: "The Celestial Couple",
    tagline: "Two jacuzzis, endless stars, pure indulgence",
    description: `Myst and Luna together create the ultimate romantic escape. Two king-size bedrooms, two private jacuzzis, and breathtaking views — designed for two couples who want to experience luxury at its finest in the hills of Shimla.`,
    rooms: ["Myst", "Luna"],
    guests: 4,
    image: `${CDN}/covers/couple-cover.png`,
    imageAlt:
      "Jacuzzi room with mountain view at Rua, Shimla — perfect romantic escape",
    highlights: [
      "2 Jacuzzis",
      "2 King Beds",
      "Mountain View",
      "Romantic",
      "Best for Couples",
    ],
  },
  {
    name: "The Eclipse Duplex",
    tagline: "Two floors, two beds, endless possibilities",
    description: `Eclipse's unique duplex layout gives you two king-size beds spread across two floors, making it perfect for families or a group of friends who want their own space without compromising on togetherness.`,
    rooms: ["Eclipse"],
    guests: 4,
    image: `${CDN}/covers/eclipse-duplex-cover.png`,
    imageAlt:
      "Eclipse duplex room with rustic interiors and valley view at Rua, Shimla",
    highlights: [
      "Duplex Layout",
      "2 King Beds",
      "Private Balcony",
      "Valley View",
      "Rustic Interiors",
    ],
  },
  {
    name: "The Orbit",
    tagline: "Three beds, two balconies, one stellar stay",
    description: `Eclipse and Comet together offer a spacious retreat with three king-size beds, two private balconies, and stunning views. Perfect for a group of friends or a multi-family trip looking for comfort and character in Shimla.`,
    rooms: ["Eclipse", "Comet"],
    guests: 6,
    image: `${CDN}/covers/orbit-cover.png`,
    imageAlt:
      "Eclipse and Comet rooms at Rua with two balconies and valley views, Shimla",
    highlights: [
      "3 King Beds",
      "2 Balconies",
      "Duplex + Suite",
      "Valley View",
      "Mountain View",
    ],
  },
  {
    name: "The Grand Himalayan",
    tagline: "Two villas, eighteen souls, one memory",
    description: `Book every room across both Saanjh and Rua for the ultimate group experience. Two private villas, eighteen guests, all the balconies, a private bonfire, jacuzzis, duplex suites, panoramic attic rooms — everything the Himalayas have to offer, all at once.`,
    rooms: [
      "Dusk",
      "Twilight",
      "Horizon",
      "Starling",
      "Eve",
      "Eclipse",
      "Comet",
      "Luna",
      "Myst",
    ],
    guests: 18,
    image: `${CDN}/covers/grand-cover.avif`,
    imageAlt:
      "Aerial view of Saanjh and Rua villas nestled in the Himalayan hills, Shimla",
    highlights: [
      "2 Private Villas",
      "All Balconies",
      "2 Jacuzzis",
      "Bonfire",
      "18 Guests",
    ],
  },
];
