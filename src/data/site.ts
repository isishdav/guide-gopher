export const SITE_URL = "https://curtainshub.lovable.app";

export const brand = {
  name: "Curtains Hub",
  shortName: "Curtains Hub",
  slogan: "Your Confidence Begins Here.",
  description:
    "Curtains Hub creates calm, private, beautifully lit homes in Kigali, Rwanda — bespoke curtains, drapery and curtain accessories, measured, tailored and installed by our own craftspeople.",
  email: "buycurtainshub@gmail.com",
  phone: "+250 787 176 493",
  phoneHref: "tel:+250787176493",
  whatsapp: "https://wa.me/250787176493",
  address: {
    street: "KN 08 St, Nyabugogo",
    locality: "Kigali",
    region: "Kigali City",
    postalCode: "",
    country: "RW",
  },
  addressFull: "KN 08 St, Nyabugogo, Kigali, Rwanda",
  geo: { latitude: -1.9403, longitude: 30.0567 },
  hours: "Mon–Sat, 8:00 – 19:00",
  social: {
    instagram: "https://www.instagram.com/curtainshub_",
    facebook: "https://www.facebook.com/",
    youtube: "https://www.youtube.com/@curtainshub",
    x: "https://x.com/mycurtainshub",
  },
};

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Collections", href: "/collections" },
  { title: "Accessories", href: "/accessories" },
  { title: "Services", href: "/services" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];

/**
 * Collections — written around how a room feels, never around fabric specs.
 * Each entry carries a small gallery so the collections page can breathe like
 * a lifestyle editorial rather than a product list.
 */
export const collections = [
  {
    slug: "sheer-curtains",
    title: "Sheer Curtains",
    feeling: "Softer mornings",
    description:
      "Daylight arrives filtered instead of glaring, and the room glows. You keep the view and the privacy — the harshness is simply gone.",
    image: "/images/curtains/cat-sheer.jpg",
    alt: "Bright Scandinavian living room with white sheer curtains diffusing morning sunlight",
    gallery: [
      { src: "/images/curtains/cat-sheer.jpg", alt: "White sheer curtains softening sunlight in a bright minimal living room" },
      { src: "/images/curtains/collection-sheer.jpg", alt: "Voile sheer curtains layered across a tall apartment window" },
      { src: "/images/curtains/hero-light.jpg", alt: "Sheer linen curtains moving gently in a sunlit modern room" },
    ],
  },
  {
    slug: "blackout-curtains",
    title: "Blackout Curtains",
    feeling: "Deeper sleep",
    description:
      "True darkness, quieter rooms, cooler afternoons. The kind of night that lets a family wake up genuinely rested.",
    image: "/images/curtains/cat-blackout.jpg",
    alt: "Calm hotel-style bedroom with soft blackout curtains drawn against morning light",
    gallery: [
      { src: "/images/curtains/cat-blackout.jpg", alt: "Blackout curtains creating restful darkness in a serene bedroom" },
      { src: "/images/curtains/collection-blackout.jpg", alt: "Blackout drapes in a minimalist luxury bedroom" },
      { src: "/images/curtains/project-2.jpg", alt: "Master suite with layered sheer and blackout curtains" },
    ],
  },
  {
    slug: "wave-curtains",
    title: "Wave Curtains",
    feeling: "Effortless order",
    description:
      "One continuous, perfectly even ripple from ceiling to floor. Architectural calm for rooms that want nothing fussy in them.",
    image: "/images/curtains/cat-wave.jpg",
    alt: "Ivory wave-fold curtains in even ripples along a floor-to-ceiling window",
    gallery: [
      { src: "/images/curtains/cat-wave.jpg", alt: "Wave curtains in uniform folds along a glass wall" },
      { src: "/images/curtains/project-1.jpg", alt: "Penthouse living space with full-height wave curtains" },
      { src: "/images/curtains/cat-luxury.jpg", alt: "Tall ivory drapes with a continuous wave header" },
    ],
  },
  {
    slug: "double-layer-curtains",
    title: "Double Layer Curtains",
    feeling: "Light on your terms",
    description:
      "Sheer by day, closed by night — one gesture changes the whole mood of a room. Comfort you can adjust hour by hour.",
    image: "/images/curtains/cat-double.jpg",
    alt: "Bedroom with a sheer inner layer and soft greige outer drape",
    gallery: [
      { src: "/images/curtains/cat-double.jpg", alt: "Double layer curtains with sheer and opaque panels" },
      { src: "/images/curtains/collection-hotel.jpg", alt: "Dual-track sheer and blackout curtains in a suite" },
      { src: "/images/curtains/after-room.jpg", alt: "Living room dressed with layered curtains" },
    ],
  },
  {
    slug: "pinch-pleat-curtains",
    title: "Pinch Pleat Curtains",
    feeling: "Quiet refinement",
    description:
      "Hand-formed pleats that fall in a perfectly even rhythm and let the room speak. Ideal where you want structure instead of drama.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQilUiY6UGVGycxy_I1M5YGZI_EFgXquY1Do8IWk2Q0Ag&s=10",
    alt: "Cream pinch pleat curtains hanging neatly beside a bright study window",
    gallery: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQilUiY6UGVGycxy_I1M5YGZI_EFgXquY1Do8IWk2Q0Ag&s=10", alt: "Pinch pleat curtains in even folds beside a marble desk" },
      { src: "/images/curtains/collection-office.jpg", alt: "Tailored pleated curtains in a calm meeting room" },
      { src: "/images/curtains/craft.jpg", alt: "Hand-finishing the hem of a tailored curtain panel" },
    ],
  },
  {
    slug: "eyelet-curtains",
    title: "Eyelet Curtains",
    feeling: "Uncluttered living",
    description:
      "Clean metal rings, soft even waves, nothing fussy. The simplest way to make a modern apartment feel considered.",
    image: "/images/curtains/cat-roller.jpg",
    alt: "White eyelet curtains drawn back in a bright modern apartment",
    gallery: [
      { src: "/images/curtains/cat-roller.jpg", alt: "Eyelet curtains softening daylight in a minimal apartment" },
      { src: "/images/curtains/cat-zebra.jpg", alt: "Neutral curtain panel framing a white window reveal" },
      { src: "/images/curtains/before-room.jpg", alt: "Modern room before curtains were fitted" },
    ],
  },
  {
    slug: "day-night-curtains",
    title: "Day & Night Curtains",
    feeling: "Focus without gloom",
    description:
      "A sheer layer for the day, a dimming layer for the evening — draw either and the light shifts with your mood.",
    image: "/images/curtains/cat-zebra.jpg",
    alt: "Day and night curtains layered in a white minimal room with soft striped light",
    gallery: [
      { src: "/images/curtains/cat-zebra.jpg", alt: "Sheer and dimming curtain layers on a dual track" },
      { src: "/images/curtains/collection-office.jpg", alt: "Workspace with glare-controlled curtains" },
      { src: "/images/curtains/cat-roller.jpg", alt: "Curtains fitted across a bright open-plan space" },
    ],
  },
  {
    slug: "linen-curtains",
    title: "Linen Curtains",
    feeling: "Warmth that lasts",
    description:
      "Natural woven linen that turns afternoon sun into a warm glow across the floor. Character, not decoration.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeX9Szxx7HMnBk82PMZ5QBkeqz0heyXhKfomVVOe4Snw&s=10",
    alt: "Natural linen curtains filtering warm afternoon light onto a linen sofa",
    gallery: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeX9Szxx7HMnBk82PMZ5QBkeqz0heyXhKfomVVOe4Snw&s=10", alt: "Linen curtains filtering golden afternoon light" },
      { src: "/images/curtains/collection-custom.jpg", alt: "Bespoke hardware and curtain header detailing" },
      { src: "/images/curtains/project-3.jpg", alt: "Timber-warm interior with tailored curtains" },
    ],
  },
  {
    slug: "motorized-curtains",
    title: "Motorized Curtains",
    feeling: "Mornings that begin gently",
    description:
      "Your curtains open with the sunrise and close as you sit down for dinner. Comfort that arrives without being asked.",
    image: "/images/curtains/cat-motorized.jpg",
    alt: "Motorized ivory curtains gliding open on a ceiling track to reveal a garden",
    gallery: [
      { src: "/images/curtains/cat-motorized.jpg", alt: "Motorized curtains opening on a discreet ceiling track" },
      { src: "/images/curtains/project-1.jpg", alt: "Penthouse with motorised full-height drapes" },
      { src: "/images/curtains/cat-wave.jpg", alt: "Automated wave curtains along a glass facade" },
    ],
  },
  {
    slug: "luxury-curtains",
    title: "Luxury Curtains",
    feeling: "A home that feels finished",
    description:
      "Weighted, hand-finished drapes with a quiet sheen — the detail guests notice before they know why the room feels expensive.",
    image: "/images/curtains/cat-luxury.jpg",
    alt: "Full-height ivory pleated luxury drapes in a refined reception room",
    gallery: [
      { src: "/images/curtains/cat-luxury.jpg", alt: "Hand-finished luxury drapes falling to the floor" },
      { src: "/images/curtains/collection-luxury.jpg", alt: "Velvet luxury curtains framing tall windows" },
      { src: "/images/curtains/craft.jpg", alt: "Craftsperson finishing a luxury curtain by hand" },
    ],
  },
  {
    slug: "curtain-accessories",
    title: "Accessories",
    feeling: "The details that finish a room",
    description:
      "Rods, tracks, finials, tiebacks, rings, hooks and motors — the quiet hardware that makes curtains hang perfectly for years. Curtain accessories in Kigali, fitted or supplied on their own.",
    image: "/images/curtains/cat-accessories.jpg",
    alt: "Luxury curtain accessories including matte black rods, finials, rings and tassel tiebacks on white marble",
    gallery: [
      { src: "/images/curtains/cat-accessories.jpg", alt: "Curtain rods, finials, rings and tiebacks arranged on marble" },
      { src: "/images/curtains/collection-custom.jpg", alt: "Bespoke curtain hardware and header detailing" },
      { src: "/images/curtains/craft.jpg", alt: "Craftsperson fitting curtain hardware by hand" },
    ],
  },
];

export const accessories = [
  { title: "Curtain Rods & Poles", description: "Matte black, brushed steel and timber poles cut to your exact window width.", image: "/images/curtains/cat-accessories.jpg" },
  { title: "Ceiling & Wall Tracks", description: "Silent gliding tracks, single or dual, for wave headers and layered curtains.", image: "/images/curtains/cat-wave.jpg" },
  { title: "Finials & End Caps", description: "The jewellery of a window — sculpted, understated finishes that match your interior.", image: "/images/curtains/collection-custom.jpg" },
  { title: "Tiebacks & Tassels", description: "Rope, leather and hand-tied tassels that hold a drape in a soft, deliberate curve.", image: "/images/curtains/cat-luxury.jpg" },
  { title: "Rings, Hooks & Glides", description: "Precision hardware so every pleat sits evenly and nothing snags or squeaks.", image: "/images/curtains/craft.jpg" },
  { title: "Brackets & Supports", description: "Concealed, load-tested brackets for heavy blackout and full-height drapes.", image: "/images/curtains/cat-blackout.jpg" },
  { title: "Motors & Remotes", description: "Smart motors, remotes and app control retro-fitted to new or existing tracks.", image: "/images/curtains/cat-motorized.jpg" },
  { title: "Pelmets & Valances", description: "Tailored pelmets that hide hardware and seal light at the top of the window.", image: "/images/curtains/cat-roman.jpg" },
  { title: "Linings & Interlinings", description: "Blackout, thermal and acoustic linings that change how a room sleeps and sounds.", image: "/images/curtains/collection-blackout.jpg" },
  { title: "Sheer Voile Panels", description: "Standalone voiles and net panels to layer with curtains you already own.", image: "/images/curtains/cat-sheer.jpg" },
];

export const services = [
  { title: "A designer at your door", description: "We come to you, read the light in each room and suggest what will actually feel right — before anything is ordered." },
  { title: "Measured to the millimetre", description: "Every drop and return is measured on site, so your curtains hang as though the windows were built for them." },
  { title: "Fabrics you'll want to touch", description: "Linens, velvets and performance weaves chosen for how they fall, feel and age in daily family life." },
  { title: "Darkness when you need it", description: "Blackout layers for bedrooms and media rooms — deeper sleep, cooler rooms, quieter evenings." },
  { title: "Privacy without shadows", description: "Sheers that keep the world outside while daylight keeps coming in." },
  { title: "Hand-finished tailoring", description: "Hems, headers and linings finished by hand, because that is the part you feel for years." },
  { title: "Motorised comfort", description: "One touch, or a schedule that follows the sun. Your home starts anticipating you." },
  { title: "Installation without mess", description: "Certified fitters, protected floors, and a room left cleaner than we found it." },
  { title: "Hotels & workplaces", description: "Contract-grade systems delivered in phases so guests and teams are never disturbed." },
  { title: "Cared for afterwards", description: "Guarantees on stitching, hardware and installation, and a team that answers when you call." },
];

export const whyChoose = [
  { title: "You'll feel it first", description: "Rooms become calmer, cooler and quieter. The look is the part you notice second." },
  { title: "Made by people, not machines alone", description: "Our tailors have decades behind the machine, and their names are on your order." },
  { title: "Honest, transparent pricing", description: "One quote, everything included. No surprises after the measuring tape leaves." },
  { title: "One person, start to finish", description: "The designer who reads your rooms is the one who signs off the installation." },
  { title: "Built for real family life", description: "Fabrics tested against sunlight, washing and small hands — and still beautiful in year five." },
  { title: "Installed as though it were ours", description: "Level tracks, perfect fall, nothing left behind but the room you imagined." },
];

export const stats = [
  { value: "4,800+", label: "Homes transformed", description: "Families now living with better light" },
  { value: "6,200+", label: "Rooms completed", description: "Residential, hospitality and workplace" },
  { value: "1,500+", label: "Fabrics curated", description: "Chosen for feel, fall and longevity" },
  { value: "15", label: "Years of craft", description: "Tailoring window dressing by hand" },
  { value: "98%", label: "Would recommend us", description: "Verified after installation" },
];

export const process = [
  { step: "01", title: "We listen", description: "A conversation about how you live, when you're home and what the room should feel like." },
  { step: "02", title: "We measure", description: "Every window, door and track measured on site, with samples held against your walls." },
  { step: "03", title: "We tailor", description: "Your fabric cut, lined and hand-finished in our own workshop." },
  { step: "04", title: "We install", description: "Fitted, dressed and left immaculate." },
];

export const testimonials = [
  {
    id: 1,
    title: "Our home finally feels like ours",
    quote:
      "I didn't expect curtains to change how we live, but the mornings are softer and the evenings feel private. The house feels calm now — and it looks like the windows were designed around them.",
    author: "Amelia Hartley",
    role: "Homeowner, Palm Residences",
    image: "/images/curtains/client-1.jpg",
  },
  {
    id: 2,
    title: "The detail designers dream about",
    quote:
      "I specify window dressing for a living and Curtains Hub is the only partner I hand a drawing to without worrying. Every pleat, return and finish lands exactly as drawn.",
    author: "Julian Reyes",
    role: "Principal Architect, Reyes Studio",
    image: "/images/curtains/client-2.jpg",
  },
  {
    id: 3,
    title: "Ninety suites, zero complaints",
    quote:
      "They redressed our entire property in three weeks without disturbing a single guest. Two years on, guests still comment on how well they sleep.",
    author: "Margaret Vance",
    role: "General Manager, The Aurelia Hotel",
    image: "/images/curtains/client-3.jpg",
  },
  {
    id: 4,
    title: "Buyers feel it the moment they walk in",
    quote:
      "We dressed four show apartments. People stop talking about square metres and start imagining living there. That is worth far more than what we paid.",
    author: "Daniel Okafor",
    role: "Director, Northline Developments",
    image: "/images/curtains/client-4.jpg",
  },
];

export const projects = [
  {
    title: "Skyline Penthouse, Downtown",
    category: "Residential",
    description: "Full-height ivory drapes on silent motorised tracks — the city stays in view, the glare stays out.",
    image: "/images/curtains/project-1.jpg",
    alt: "Luxury penthouse dining room with tall ivory pleated curtains and a city skyline view",
  },
  {
    title: "Aurelia Master Suite",
    category: "Residential",
    description: "Sheer by day, blackout by night. A couple who used to wake at five now sleep until seven.",
    image: "/images/curtains/project-2.jpg",
    alt: "Elegant master bedroom with layered sheer and soft blackout curtains",
  },
  {
    title: "The Aurelia Hotel Lobby",
    category: "Hospitality",
    description: "Twelve-metre drapes that make a landmark lobby feel warm rather than vast.",
    image: "/images/curtains/project-3.jpg",
    alt: "Grand hotel lobby with towering floor-to-ceiling curtains",
  },
  {
    title: "Meridian Corporate Floor",
    category: "Commercial",
    description: "Glare gone, focus back. A glass-walled boardroom that finally works in the afternoon.",
    image: "/images/curtains/collection-office.jpg",
    alt: "Modern office boardroom with glare-control window dressing",
  },
  {
    title: "Harbour View Apartments",
    category: "Property Development",
    description: "Four show apartments dressed in ten days — every viewing now begins with a compliment.",
    image: "/images/curtains/cat-sheer.jpg",
    alt: "Bright apartment living room dressed with white sheer curtains",
  },
  {
    title: "Golden Hour Villa",
    category: "Residential",
    description: "Layered drapes over sheers to warm a double-height room that once echoed.",
    image: "/images/curtains/cat-luxury.jpg",
    alt: "Double-height villa living room with full-height luxury drapes",
  },
];

export const faqs = [
  {
    question: "Why are premium curtains worth the investment?",
    answer:
      "Because you live inside the result every day. Properly tailored curtains change how a room sleeps, sounds and feels — better rest, less heat, more privacy — and hand-finished fabrics still hang beautifully years after cheap panels have sagged and faded.",
  },
  {
    question: "Is the consultation and measurement really free?",
    answer:
      "Yes. A Curtains Hub designer visits your home, office or site, reads the light in each room, measures every window and door, brings fabric samples and prepares a full quotation at no cost and with no obligation.",
  },
  {
    question: "How long until my rooms are transformed?",
    answer:
      "Most bespoke orders are tailored, delivered and installed within 1 working days of fabric approval because there are already made curtains. Larger hotel and commercial projects are phased so your space stays in use throughout.",
  },
  {
    question: "Do blackout curtains really create true darkness?",
    answer:
      "Our blackout layers block up to 99% of incoming light. Paired with a wraparound track or pelmet they create genuine darkness, while also reducing heat gain and softening outside noise.",
  },
  {
    question: "Can you work with my existing interior?",
    answer:
      "Always. Send photos, a mood board or your designer's drawings and we will shortlist fabrics, folds and hardware that sit naturally in the home you already love.",
  },
  {
    question: "Do you work with hotels, offices and developers?",
    answer:
      "Yes. We supply contract-grade, fire-rated fabrics and dual-track systems for hotels, offices, apartment buildings and developments, with volume pricing and a dedicated project manager.",
  },
];
