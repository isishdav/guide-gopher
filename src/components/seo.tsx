import { SITE_URL, brand } from "@/data/site";
import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    /** Absolute URL, or a path such as "/collections" — resolved against the site URL. */
    canonicalUrl: string;
    ogType?: "website" | "article" | "profile";
    ogImage?: string;
    twitterCard?: "summary" | "summary_large_image";
    jsonLd?: object;
    noindex?: boolean;
    keywords?: string;
}

const absolute = (value: string) =>
    value.startsWith("http") ? value : `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;

const SEO = ({
    title,
    description,
    canonicalUrl,
    ogType = "website",
    ogImage = "/images/curtains/hero-light.jpg",
    twitterCard = "summary_large_image",
    jsonLd,
    noindex = false,
    keywords,
}: SEOProps) => {
    const url = absolute(canonicalUrl);
    const image = absolute(ogImage);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />
            <meta
                name="robots"
                content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"}
            />

            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content={brand.name} />
            <meta property="og:locale" content="en_RW" />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={title} />

            <meta name="geo.region" content="RW-01" />
            <meta name="geo.placename" content="Kigali" />
            <meta name="author" content={brand.name} />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
