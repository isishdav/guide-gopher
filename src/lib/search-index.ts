import { accessories, collections, faqs, navLinks, services } from "@/data/site";

export type SearchGroup = "Collections" | "Accessories" | "Services" | "Pages" | "Answers";

export interface SearchItem {
    id: string;
    group: SearchGroup;
    title: string;
    description: string;
    href: string;
    image?: string;
    keywords: string;
}

const pageMeta: Record<string, string> = {
    "/": "Luxury curtains in Kigali, Rwanda — sheer, blackout, custom and motorized curtains.",
    "/about": "The Curtains Hub story, workshop and craftspeople in Kigali.",
    "/collections": "Every curtain range: sheer, blackout, wave, pinch pleat, eyelet, linen, layered and motorized.",
    "/accessories": "Curtain rods, tracks, finials, tiebacks, rings, motors and linings in Rwanda.",
    "/services": "Free consultation, measuring, tailoring, installation and aftercare.",
    "/projects": "Homes, hotels, offices and developments we have dressed.",
    "/testimonials": "What clients across Kigali say about working with us.",
    "/contact": "Book a free home visit in Kigali, Nyabugogo or anywhere in Rwanda.",
    "/blog": "Guides and ideas on curtains, light, privacy and interiors.",
};

/**
 * A single flat, static index — instant to filter, no network, no dependencies.
 */
export const searchIndex: SearchItem[] = [
    ...collections.map<SearchItem>((c) => ({
        id: `collection-${c.slug}`,
        group: c.slug === "curtain-accessories" ? "Accessories" : "Collections",
        title: c.title,
        description: c.feeling,
        href: c.slug === "curtain-accessories" ? "/accessories" : `/collections#${c.slug}`,
        image: c.image,
        keywords: `${c.title} ${c.feeling} ${c.description} curtains kigali rwanda`.toLowerCase(),
    })),
    ...accessories.map<SearchItem>((a) => ({
        id: `accessory-${a.title}`,
        group: "Accessories",
        title: a.title,
        description: a.description,
        href: "/accessories",
        image: a.image,
        keywords: `${a.title} ${a.description} curtain accessories rwanda kigali`.toLowerCase(),
    })),
    ...services.map<SearchItem>((s) => ({
        id: `service-${s.title}`,
        group: "Services",
        title: s.title,
        description: s.description,
        href: "/services",
        keywords: `${s.title} ${s.description} service kigali rwanda`.toLowerCase(),
    })),
    ...navLinks
        .concat([{ title: "Journal", href: "/blog" }, { title: "Testimonials", href: "/testimonials" }])
        .map<SearchItem>((l) => ({
            id: `page-${l.href}`,
            group: "Pages",
            title: l.title,
            description: pageMeta[l.href] ?? "",
            href: l.href,
            keywords: `${l.title} ${pageMeta[l.href] ?? ""}`.toLowerCase(),
        })),
    ...faqs.map<SearchItem>((f) => ({
        id: `faq-${f.question}`,
        group: "Answers",
        title: f.question,
        description: f.answer,
        href: "/#faq",
        keywords: `${f.question} ${f.answer}`.toLowerCase(),
    })),
];

export const groupOrder: SearchGroup[] = ["Collections", "Accessories", "Services", "Pages", "Answers"];

export function searchSite(query: string, limit = 12): SearchItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);

    return searchIndex
        .map((item) => {
            let score = 0;
            for (const t of terms) {
                const title = item.title.toLowerCase();
                if (title === t) score += 60;
                else if (title.startsWith(t)) score += 40;
                else if (title.includes(t)) score += 24;
                else if (item.keywords.includes(t)) score += 8;
                else return null;
            }
            if (item.group === "Collections" || item.group === "Accessories") score += 4;
            return { item, score };
        })
        .filter((r): r is { item: SearchItem; score: number } => r !== null)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((r) => r.item);
}

export const suggestedSearches = [
    "Blackout curtains",
    "Sheer curtains",
    "Curtain rods",
    "Motorized curtains",
    "Free consultation",
];
