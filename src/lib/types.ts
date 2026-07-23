export type ListingType = "vente" | "location";

export type PropertyType =
  | "appartement"
  | "villa"
  | "maison"
  | "bureau"
  | "commerce"
  | "terrain";

export type PropertyStatus = "disponible" | "reserve" | "vendu" | "loue";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  listing_type: ListingType;
  property_type: PropertyType;
  status: PropertyStatus;
  price: number;
  city: string;
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
  surface_area: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  year_built?: number;
  has_parking: boolean;
  has_elevator: boolean;
  has_pool: boolean;
  has_garden: boolean;
  is_furnished: boolean;
  is_featured: boolean;
  images: string[];
  amenities: string[];
  agent_name: string;
  agent_phone: string;
  agent_whatsapp: string;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_avatar: string;
  rating: number;
  comment: string;
  city: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author_name: string;
  author_avatar: string;
  read_time: number;
  published_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  source: "contact" | "property" | "evaluation" | "callback";
  property_id?: string;
  status: "nouveau" | "en_cours" | "traite" | "perdu";
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface PropertyFiltersState {
  listingType?: ListingType;
  propertyType?: PropertyType | "tous";
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSurface?: number;
}
