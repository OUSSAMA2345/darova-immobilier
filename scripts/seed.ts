/**
 * Seeds the Supabase database with realistic Darova Immobilier content.
 * Usage: npm run seed
 * Requires SUPABASE_SERVICE_ROLE_KEY in your .env (never expose this key client-side).
 */
import { createClient } from "@supabase/supabase-js";
import { mockProperties } from "../src/lib/data/mock-properties";
import { mockTestimonials } from "../src/lib/data/mock-testimonials";
import { mockBlogPosts } from "../src/lib/data/mock-blog";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in your environment."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function seed() {
  console.log("Seeding properties...");
  const { error: propError } = await supabase.from("properties").upsert(
    mockProperties.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      listing_type: p.listing_type,
      property_type: p.property_type,
      status: p.status,
      price: p.price,
      city: p.city,
      neighborhood: p.neighborhood,
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      surface_area: p.surface_area,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      floor: p.floor,
      year_built: p.year_built,
      has_parking: p.has_parking,
      has_elevator: p.has_elevator,
      has_pool: p.has_pool,
      has_garden: p.has_garden,
      is_furnished: p.is_furnished,
      is_featured: p.is_featured,
      images: p.images,
      amenities: p.amenities,
      agent_name: p.agent_name,
      agent_phone: p.agent_phone,
      agent_whatsapp: p.agent_whatsapp,
      views_count: p.views_count,
    })),
    { onConflict: "slug" }
  );
  if (propError) console.error("Properties error:", propError.message);
  else console.log(`✓ ${mockProperties.length} properties seeded`);

  console.log("Seeding testimonials...");
  const { error: testError } = await supabase.from("testimonials").insert(
    mockTestimonials.map((t) => ({
      client_name: t.client_name,
      client_role: t.client_role,
      client_avatar: t.client_avatar,
      rating: t.rating,
      comment: t.comment,
      city: t.city,
    }))
  );
  if (testError) console.error("Testimonials error:", testError.message);
  else console.log(`✓ ${mockTestimonials.length} testimonials seeded`);

  console.log("Seeding blog posts...");
  const { error: blogError } = await supabase.from("blog_posts").upsert(
    mockBlogPosts.map((b) => ({
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      cover_image: b.cover_image,
      category: b.category,
      author_name: b.author_name,
      author_avatar: b.author_avatar,
      read_time: b.read_time,
      published_at: b.published_at,
    })),
    { onConflict: "slug" }
  );
  if (blogError) console.error("Blog posts error:", blogError.message);
  else console.log(`✓ ${mockBlogPosts.length} blog posts seeded`);

  console.log("Done.");
}

seed();
