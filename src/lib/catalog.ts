import a1 from "@/assets/p-a1.jpg";
import a2 from "@/assets/p-a2.jpg";
import a3 from "@/assets/p-a3.jpg";
import b1 from "@/assets/p-b1.jpg";
import b2 from "@/assets/p-b2.jpg";
import b3 from "@/assets/p-b3.jpg";
import edGarage from "@/assets/ed-garage.jpg";
import edStreet from "@/assets/ed-street.jpg";
import edElevator from "@/assets/ed-elevator.jpg";
import edBus from "@/assets/ed-bus.jpg";
import edBedroom from "@/assets/ed-bedroom.jpg";
import edStairwell from "@/assets/ed-stairwell.jpg";

export const CATALOG_NO = "AN-001";
export const SEASON = "FALL 2026";
export const DROP = "DROP 001";
export const RELEASE = "OFF THE RECORD";

export type Side = "A" | "B";
export type Category = "OUTERWEAR" | "TOPS" | "BOTTOMS";

export interface Product {
  slug: string;
  track: string;
  side: Side;
  sku: string;
  name: string;
  price: number;
  category: Category;
  colorway: string;
  image: string;
  gallery: string[];
  liner: string;
  fit: string;
  material: string;
  care: string;
  sizes: string[];
}

/** Editorial / campaign plates — placeholders for the AN-001 fashion film stills. */
export const editorial = [
  { src: edGarage, caption: "PLATE 01 — LEVEL B2, PARKING STRUCTURE", frame: "4:3" },
  { src: edStreet, caption: "PLATE 02 — WET STREET, 02:41", frame: "4:3" },
  { src: edElevator, caption: "PLATE 03 — ELEVATOR, CAM 04", frame: "4:3" },
  { src: edBus, caption: "PLATE 04 — NIGHT BUS, MOTION", frame: "4:3" },
  { src: edBedroom, caption: "PLATE 05 — ROOM, FLASH", frame: "4:3" },
  { src: edStairwell, caption: "PLATE 06 — STAIRWELL, RED", frame: "4:3" },
];

export const products: Product[] = [
  {
    slug: "off-the-record-hoodie",
    track: "A1",
    side: "A",
    sku: "AN-001-A1",
    name: "OFF THE RECORD HOODIE",
    price: 180,
    category: "OUTERWEAR",
    colorway: "SIGNAL RED",
    image: a1,
    gallery: [a1, edGarage, edStairwell],
    liner:
      "Cut heavy, dyed loud. The campaign piece of AN-001 — a 480gsm loopback hood printed with the release mark. Worn under flash it reads as pure signal.",
    fit: "Boxy. Dropped shoulder. Takes true size for a relaxed fit, size down for closer.",
    material: "480gsm cotton loopback. Garment dyed. Ribbed cuff and hem.",
    care: "Cold wash inside out. Hang dry. Colour will settle with wear.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "nightfall-zip-hoodie",
    track: "A2",
    side: "A",
    sku: "AN-001-A2",
    name: "NIGHTFALL ZIP HOODIE",
    price: 195,
    category: "OUTERWEAR",
    colorway: "DEEP GREEN",
    image: a2,
    gallery: [a2, edElevator, edBus],
    liner:
      "A quiet counterpart to A1. Full-length zip, deep green, no visible branding beyond the catalogue tag at the hem.",
    fit: "Regular. Slightly longer body. True to size.",
    material: "420gsm brushed cotton fleece. Metal zip pull stamped AN.",
    care: "Cold wash. Do not tumble dry. Cool iron if needed.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "liner-notes-long-sleeve",
    track: "A3",
    side: "A",
    sku: "AN-001-A3",
    name: "LINER NOTES LONG SLEEVE",
    price: 90,
    category: "TOPS",
    colorway: "BLACK / WHITE",
    image: a3,
    gallery: [a3, edBedroom, edStreet],
    liner:
      "Black ground, white text set in the AN-001 metadata face. Reads as a sleeve insert worn on the body.",
    fit: "Straight body. Long sleeve with narrow cuff. True to size.",
    material: "220gsm combed cotton jersey. Water-based print.",
    care: "Cold wash inside out. Hang dry.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "side-b-rugby",
    track: "B1",
    side: "B",
    sku: "AN-001-B1",
    name: "SIDE B STRIPED RUGBY",
    price: 145,
    category: "TOPS",
    colorway: "BLACK / WHITE",
    image: b1,
    gallery: [b1, edStreet, edGarage],
    liner:
      "Wide banded stripe, heavy rugby knit, plain twill collar. The most physical garment in the release.",
    fit: "Relaxed. Wide body, generous sleeve. Size down for a standard fit.",
    material: "300gsm cotton pique. Twill collar, rubber buttons.",
    care: "Cold wash separately for the first three washes. Hang dry.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "dub-plate-sweatpant",
    track: "B2",
    side: "B",
    sku: "AN-001-B2",
    name: "DUB PLATE SWEATPANT",
    price: 130,
    category: "BOTTOMS",
    colorway: "LIGHT GREY",
    image: b2,
    gallery: [b2, edBedroom, edBus],
    liner:
      "Relaxed leg, elastic hem, drawcord left long on purpose. Grey marl that photographs like concrete.",
    fit: "Relaxed through thigh, tapered to cuff. True to size.",
    material: "400gsm cotton-rich fleece. Twill drawcord.",
    care: "Cold wash. Do not tumble dry.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    slug: "run-out-groove-jean",
    track: "B3",
    side: "B",
    sku: "AN-001-B3",
    name: "RUN-OUT GROOVE JEAN",
    price: 210,
    category: "BOTTOMS",
    colorway: "FADED BLUE",
    image: b3,
    gallery: [b3, edStreet, edStairwell],
    liner:
      "Baggy leg, heavy faded indigo, stacked at the ankle. Named for the silence at the end of a record.",
    fit: "Baggy. Mid rise, wide straight leg. Take your usual waist.",
    material: "14oz rigid cotton denim, stone washed.",
    care: "Wash rarely, cold, inside out. Hang dry.",
    sizes: ["28", "30", "32", "34", "36"],
  },
];

export const bySide = (side: Side) => products.filter((p) => p.side === side);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) =>
  `$${n.toFixed(2).replace(/\.00$/, ".00")}`;
