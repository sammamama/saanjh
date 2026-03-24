import {
  Wifi, Eye, FlameKindling, Bath, Home,
  ParkingSquare, Tv2, Flame, Thermometer,
  UtensilsCrossed, Coffee, Refrigerator, Microwave,
  Music, Monitor, Bike, BookOpen, ShieldCheck,
  Camera, Utensils, Dumbbell, Wind, Luggage,
  Baby, Gamepad2, DoorOpen, Soup, WashingMachine,
  Shirt, Sparkles, Car, BedDouble, ShowerHead,
  Wine, Trash2, Lock, Briefcase, Apple,
  CalendarCheck, KeyRound, Trees, Timer, Sandwich,
  Flame as FirePit, Coins, MapPin, Wrench,
  LucideMoreHorizontal,
  HouseHeart,
  Bubbles,
} from "lucide-react";

import type { ElementType } from "react";

type RoomName = "Dusk" | "Twilight" | "Horizon" | "Eve" | "Starling" | "Comet" | "Eclipse" | "Luna" | "Myst"
type GroupRoomName = "The Sunset Suite" | "The Attic Collective" | "Saanjh — The Full Musical Sunset" | "The Celestial Couple" | "The Eclipse Duplex" | "The Grand Himalayan" | "The Orbit"

export interface Room<T extends string = RoomName> {
  name: T;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  guests: number;
  bestValue?: boolean;
  highlights: string[];
  features?: string[];
}

export interface GroupRoom extends Room<GroupRoomName> {
  rooms: RoomName[];
}

export const featureIcons: Record<string, typeof Wifi> = {
    // Views
  "Mountain View":            Eye,
  "Valley View":              Eye,

  // Outdoor
  "Private Balcony":          DoorOpen,
  "Balcony":                  DoorOpen,
  "Fire Pit":                 Flame,
  "BBQ Grill":                Utensils,
  "Outdoor Dining":           UtensilsCrossed,
  "Outdoor Furniture":        Home,
  "Bikes":                    Bike,
  "Garden":                   Trees,

  // Bathroom
  "Private Bathroom":         Bath,
  "Bathtub":                  Bath,
  "Hot Water":                ShowerHead,
  "Hair Dryer":               Wind,
  "Shower Gel":               ShowerHead,

  // Bedroom
  "King Bed":                 BedDouble,
  "Extra Pillows":            BedDouble,
  "Blackout Blinds":          Home,
  "Hangers":                  Shirt,
  "Mosquito Net":             Home,
  "Wardrobe":                 Home,
  "Cotton Linen":             BedDouble,

  // Entertainment
  "Wi-Fi":                    Wifi,
  "TV":                       Tv2,
  "JBL Sound System":         Music,
  "Arcade Games":             Gamepad2,
  "Board Games":              Gamepad2,
  "Books":                    BookOpen,
  "Yoga Mat":                 Dumbbell,
  "Theme Room":               Sparkles,

  // Heating & Cooling
  "Fireplace":                FlameKindling,
  "Portable Heater":          Thermometer,

  // Kitchen
  "Kitchen":                  Soup,
  "Refrigerator":             Refrigerator,
  "Microwave":                Microwave,
  "Coffee":                   Coffee,
  "Wine Glasses":             Wine,
  "Toaster":                  Timer,
  "Blender":                  Timer,
  "Rice Maker":               Timer,
  "BBQ Utensils":             Utensils,
  "Dining Table":             UtensilsCrossed,
  "Cooking Basics":           Utensils,
  "Dishes & Cutlery":         UtensilsCrossed,
  "Hot Water Kettle":         Coffee,
  "Bread Maker":              Sandwich,
  "Rubbish Compactor":        Trash2,
  "Freezer":                  Refrigerator,

  // Laundry
  "Paid Washing Machine":     WashingMachine,
  "Paid Dryer":               WashingMachine,
  "Laundromat Nearby":        MapPin,
  "Iron":                     Shirt,

  // Parking
  "Free Parking":             ParkingSquare,
  "Free Street Parking":      Car,
  "Paid Street Parking":      Coins,

  // Family
  "Children's Playroom":      Baby,
  "Children's Books & Toys":  Baby,
  "Baby Cot":                 Baby,
  "Baby Safety Gates":        Baby,
  "Fireplace Screen":         FlameKindling,
  "Window Grilles":           Home,
  "Power Point Covers":       Wrench,

  // Services
  "Breakfast":                Apple,
  "Self Check-in":            KeyRound,
  "Building Staff":           ShieldCheck,
  "Cleaning During Stay":     Sparkles,
  "Luggage Drop-off":         Luggage,
  "Long-term Stays":          CalendarCheck,
  "Free Resort Access":       Dumbbell,
  "Dedicated Workspace":      Monitor,

  // Safety
  "Lock on Door":             Lock,
  "Security Camera":          Camera,
  "Fire Extinguisher":        Flame,
  "First Aid Kit":            Briefcase,

  // ETC
  "And More":                 LucideMoreHorizontal,
  "Attic":                    HouseHeart,
  "Jacuzzi":                  Bubbles
};
