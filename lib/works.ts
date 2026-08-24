/**
 * The five developments. Descriptions are transcribed verbatim from the
 * WordPress /works/<slug>/ pages.
 *
 * Gallery images were pulled from those same pages into
 * public/images/work/<slug>/ and are numbered 01.jpg upward, so the file list
 * is derived from a count rather than spelled out.
 */

export type Work = {
  slug: string;
  title: string;
  /** Derived from the tagline on each project's own logo, where one exists. */
  type: "Residential" | "Commercial" | "Mixed-use";
  /**
   * The product mix printed under each project wordmark.
   * Real Corner and Real Classic both read "Shops | Showrooms | Flats", which
   * is why they are Mixed-use rather than purely residential.
   */
  offering: string[];
  /** Short line for cards and meta descriptions. */
  summary: string;
  body: string[];
  /** Trailing call-to-action lines, set apart from the body. */
  emphasis: string[];
  galleryCount: number;
};

const works: Work[] = [
  {
    slug: "real-corner",
    title: "Real Corner",
    type: "Mixed-use",
    offering: ["Shops", "Showrooms", "Flats"],
    summary:
      "Modern urban living, where open, light-filled interiors meet everyday comfort.",
    body: [
      "Real Corner Site embodies the essence of modern living at its finest. It's a testament to our commitment to creating innovative living spaces that effortlessly blend comfort and style. These residences are thoughtfully designed to cater to the demands of contemporary life, offering a harmonious blend of form and function. Inside, you'll find open and airy living spaces that are filled with natural light, highlighting the attention to detail that permeates every aspect of the design. Whether you're relaxing in the spacious bedrooms, enjoying the view from your balcony, or gathering in the state-of-the-art kitchen, Real Corner Site offers an unparalleled living experience. Our team's dedication to quality and customer satisfaction shines through in every corner of these exceptional residences, providing a backdrop for your lifestyle to flourish. Real Corner Site is where your aspirations for modern, urban living find their perfect home.",
    ],
    emphasis: [],
    galleryCount: 23,
  },
  {
    slug: "real-classic",
    title: "Real Classic",
    type: "Mixed-use",
    // Logo artwork reads "SHOWRROMS" — a typo in the client's own file.
    offering: ["Shops", "Showrooms", "Flats"],
    summary:
      "Timeless elegance and modern luxury, where classic sophistication meets contemporary design.",
    body: [
      "Real Classic Site is a masterpiece in the realm of timeless elegance and modern luxury. These properties are a true reflection of our commitment to excellence, blending classic sophistication with contemporary design. As you step inside, you'll be immersed in an environment that exudes a sense of grandeur, where opulent textures, rich hues, and intricate detailing harmonize seamlessly. Every room is a showcase of meticulous curation, blending functionality with aesthetics, and inviting an abundance of natural light. From the bespoke furnishings that grace the interiors to the carefully selected accents, Real Classic Site is a living masterpiece where comfort, style, and sophistication converge. It's not just a residence; it's an immersive experience that sets a new standard for refined living, embodying the epitome of modern luxury.",
    ],
    emphasis: [],
    galleryCount: 16,
  },
  {
    slug: "real-point",
    title: "Real Point",
    type: "Commercial",
    offering: ["Showrooms", "Corporate space", "Offices"],
    summary:
      "An ultra-modern commercial space for brands and businesses aiming for growth and expansion.",
    body: [
      "Real Point is the ultimate destination that facilitates an Ultra-Modern Commercial Space for brands and businesses that aims for growth and expansion. It provides an opportunity to gain the success and take your business ahead an extra mile. The building is constructed with the most advanced technologies and facilities to suit every small and big businesses.",
      "Quality construction, modern architecture and efficient implementation make Real Point the right choice for every businessman. The commercial space meets the demand of the market in terms of contemporary infrastructure and advanced technologies. The infrastructure ensures the efficient functionality of every shop and office in the most eminent way.",
    ],
    emphasis: [
      "Choose the right space to achieve your success!",
      "A space that is proficient & rewarding!!",
    ],
    galleryCount: 3,
  },
  {
    slug: "real-bunglows",
    title: "Real Bunglows",
    type: "Residential",
    // No tagline on this logo.
    offering: [],
    summary:
      "An oasis of tranquility and luxury, where spacious layouts merge with lush surroundings.",
    body: [
      "Welcome to Real Bungalow Site, an oasis of tranquility and luxury where every detail is meticulously designed to cater to your desires for an elevated lifestyle. These bungalows are a testament to the art of fine living, with spacious layouts and architectural finesse that merge seamlessly with the lush surroundings. Each bungalow is a retreat in itself, showcasing a blend of timeless design and modern amenities. As you step inside, you'll be greeted by open living spaces, high ceilings, and large windows that allow nature's beauty to become a part of your everyday life. Our commitment to quality and excellence is evident in every square foot, from the carefully selected materials to the thoughtfully integrated technology. Real Bungalow Site is more than just a place to live; it's an embodiment of your aspirations, where you can create cherished memories, entertain guests, and savor the joys of life. Experience a lifestyle that transcends the ordinary, where every day is an opportunity to embrace the extraordinary.",
    ],
    emphasis: [],
    galleryCount: 9,
  },
  {
    slug: "real-residency",
    title: "Real Residency",
    type: "Residential",
    // No tagline on this logo.
    offering: [],
    summary:
      "Modern, sustainable living with design innovation, green spaces and meticulously planned layouts.",
    body: [
      "Realgroups' real residency project has quickly become a hallmark of modern, sustainable living, offering a unique blend of design innovation and comfort. With a commitment to delivering top-notch residential spaces, Realgroups has designed this project to cater to the evolving needs of urban dwellers. Boasting a range of amenities, green spaces, and meticulously planned layouts, the real residency project stands as a testament to quality and attention to detail. From contemporary architecture to eco-friendly features, it reflects Realgroups' dedication to enhancing the quality of life for its residents. This project promises not only a place to call home but an environment that fosters community, convenience, and a higher standard of living.",
    ],
    emphasis: [],
    galleryCount: 1,
  },
];

export { works };

export const coverFor = (slug: string) => `/images/work/${slug}/cover.jpg`;
export const logoFor = (slug: string) => `/images/work/${slug}/logo.jpg`;

/** Gallery files are numbered 01.jpg, 02.jpg ... in source order. */
export function galleryFor(work: Work): string[] {
  return Array.from(
    { length: work.galleryCount },
    (_, i) => `/images/work/${work.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
  );
}

export const findWork = (slug: string) => works.find((w) => w.slug === slug);

/** Wraps around, so every project has a next and previous. */
export function adjacentWorks(slug: string) {
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: works[(i - 1 + works.length) % works.length],
    next: works[(i + 1) % works.length],
  };
}
