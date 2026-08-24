/**
 * Long-form page copy, transcribed verbatim from the WordPress /studio/ page
 * which the new About / Team / Contact pages replace.
 */

/**
 * About page. Three blocks, exactly as supplied — no added headings, values
 * band or call to action.
 */
export const about = {
  title: "About Us",
  blocks: [
    {
      body: [
        "Real Point is the ultimate destination that facilitates an Ultra-Modern Commercial Space for brands and businesses that aims for growth and expansion. It provides an opportunity to gain the success and take your business ahead an extra mile. The building is constructed with the most advanced technologies and facilities to suit every small and big businesses.",
        "Quality construction, modern architecture and efficient implementation make Real Point the right choice for every businessman. The commercial space meets the demand of the market in terms of contemporary infrastructure and advanced technologies. The infrastructure ensures the efficient functionality of every shop and office in the most eminent way.",
      ],
      emphasis: [
        "Choose the right space to achieve your success!",
        "A space that is proficient & rewarding!!",
      ],
    },
    {
      body: [
        "What sets Real Homes apart is our unwavering commitment to customer satisfaction and our passion for real estate. We know that every client is unique, which is why we take the time to understand your preferences and requirements. Whether you're searching for a cozy suburban dwelling, a downtown apartment, or a sprawling estate, we have a diverse portfolio of properties to choose from. At Real Homes, we don't just sell houses; we help you find a place to call home. Let us be your trusted partner on your journey to real estate success.",
      ],
      emphasis: [],
    },
    {
      body: [
        "At Real Group, we are more than just a real estate company; we are the architects of dreams and the builders of future homes. Our journey is a testament to our passion for real estate and a commitment to delivering excellence with every project. With a rich history of innovation and a reputation for integrity, our mission is to redefine living spaces, creating environments where families flourish, and businesses thrive. Real Group's core values of integrity, quality, and customer-centricity guide every decision we make. Our team is a harmonious blend of experience, vision, and dedication, working tirelessly to craft exceptional properties that stand as testaments to our commitment to excellence. We're not just building structures; we're creating the backdrop for your most cherished memories and your path to a brighter future. At Real Group, our journey is your journey, and your dream is our mission.",
      ],
      emphasis: [],
    },
  ],
} as const;

/**
 * Team page. Four paragraphs, exactly as supplied — no pull quote, pillars
 * or call to action.
 */
export const team = {
  title: "Our Team of Global Experts",
  body: [
    "At the heart of our organization is a global network of experts who fuel our commitment to excellence. Our Partners and Directors are not just leaders; they are visionaries and world-renowned authorities in their respective fields. United by a shared dedication to innovation and unwavering passion, they bring together diverse skills, creative genius, technical mastery, and astute management expertise. What sets our team apart is the fusion of these talents, creating a holistic approach that transcends the boundaries of traditional project design and construction. It's this holistic approach that truly defines us and sets the stage for the success of every project we undertake.",
    "Our team is not confined by geographical borders; we believe in the power of global collaboration. Each of our Partners and Directors brings with them a wealth of knowledge that spans the globe. With a strong international presence and a deep understanding of various cultural nuances, we excel in navigating the complexities of projects worldwide. This diverse perspective fosters innovation and ensures that we always stay on the cutting edge of industry trends.",
    "In our team, creativity knows no bounds. Our Partners and Directors are not only experts but also creative visionaries who push the envelope of what's possible. They approach every project with a fresh perspective, embracing challenges as opportunities to devise unique and imaginative solutions. This creative approach infuses every aspect of our work, from the initial design concept to the final execution, ensuring that our projects stand out as iconic representations of excellence.",
    "What truly distinguishes our team is our unwavering commitment to excellence. Our Partners and Directors set the bar high, and this standard is embedded in every phase of our projects.",
  ],
} as const;

export type TeamMember = {
  name: string;
  role: string;
  image?: string;
};

/**
 * Intentionally empty.
 *
 * The nine profiles on the WordPress site are unmodified theme demo data
 * (placeholder names, Lorem Ipsum bios, and copy referencing "Lexicon + Ion").
 * The live theme hides them with `.team-list-content { display: none }`, so
 * they were never public. Drop the real roster in here and the grid on
 * /team renders itself.
 */
export const teamMembers: TeamMember[] = [];

export const contact = {
  eyebrow: "Get in touch",
  title: "Contact Us",
  lead:
    "Talk to us about availability, floor plans or a site visit. We will get back to you as soon as possible.",
  address: {
    label: "Address",
    lines: ["Rajkot, INDIA", "Bapa Sitaram Chowk, Mavadi Rajkot – 360 004"],
  },
  formHeading: "Leave us Message",
  /**
   * Embed carried over verbatim from the WordPress /studio/ page.
   * Marker is "REAL PRIME" at 22.259899, 70.780385.
   */
  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d923.1193503312688!2d70.78038527234219!3d22.259898700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb1def095dab%3A0x3fb4b29caf35927!2sREAL%20PRIME!5e0!3m2!1sen!2sin!4v1697259223242!5m2!1sen!2sin",
    title: "Real Group office location on Google Maps",
  },
} as const;
