import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl: string;
    ogType?: "website" | "article" | "profile";
    ogImage?: string;
    twitterCard?: "summary" | "summary_large_image";
    jsonLd?: object;
    noindex?: boolean;
}

const SEO = ({
    title,
    description,
    canonicalUrl,
    ogType = "website",
    ogImage = "/images/curtains/hero.jpg",
    twitterCard = "summary_large_image",
    jsonLd,
    noindex = false,
}: SEOProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content="Curtains Hub" />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={title} />

            <meta name="author" content="Curtains Hub" />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
