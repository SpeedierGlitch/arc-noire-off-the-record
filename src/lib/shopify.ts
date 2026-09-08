import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "2614r4-cv.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "7a8f700a2ac8b1a7e08b593ec5801b4a";

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    images: { edges: Array<{ node: { url: string; altText: string | null } }> };
    variants: { edges: Array<{ node: ShopifyVariant }> };
    options: Array<{ name: string; values: string[] }>;
  };
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 5) { edges { node { url altText } } }
  variants(first: 50) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

export async function fetchProducts(first = 100, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query: query ?? null });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  const node = data?.data?.product;
  return node ? { node } : null;
}

export function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).format(
    Number(amount),
  );
}

/** The six pieces pressed as OFF THE RECORD / AN-001, in tracklist order. */
export const DROP_TRACKS: Array<{ title: string; side: "A" | "B"; track: string }> = [
  { title: '"LIFEGUARD" HOODIE', side: "A", track: "A1" },
  { title: "NIGHTFALL ZIP-UP", side: "A", track: "A2" },
  { title: "ARCHIVE TEE", side: "A", track: "A3" },
  { title: "AFTERHOURS RUGBY", side: "B", track: "B1" },
  { title: "OFF-THE-JOB SWEATS", side: "B", track: "B2" },
  { title: "NIGHTSHIFT DENIM", side: "B", track: "B3" },
];

export function trackFor(title: string) {
  return DROP_TRACKS.find((t) => t.title.toLowerCase() === title.trim().toLowerCase());
}

export async function fetchDropProducts(): Promise<Array<ShopifyProduct & { side: string; track: string }>> {
  const all = await fetchProducts(250);
  const ordered: Array<ShopifyProduct & { side: string; track: string }> = [];
  for (const spec of DROP_TRACKS) {
    const match = all.find((p) => p.node.title.trim().toLowerCase() === spec.title.toLowerCase());
    if (match) ordered.push({ ...match, side: spec.side, track: spec.track });
  }
  return ordered;
}
