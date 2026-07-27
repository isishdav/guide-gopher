import Layout from "@/components/layout";
import SEO from "@/components/seo";
import ContactForm from "@/components/sections/contact/contact-form";
import { brand } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Curtains Hub",
  url: "/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: brand.name,
    email: brand.email,
    telephone: brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address.street,
      addressLocality: brand.address.locality,
      addressRegion: brand.address.region,
      postalCode: brand.address.postalCode,
      addressCountry: brand.address.country,
    },
    openingHours: brand.hours,
  },
};

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Curtains Hub | Free Curtain Consultation & Quote"
        description="Book a free curtain consultation with Curtains Hub. Custom measurement, premium fabrics and professional installation for homes, hotels and offices."
        canonicalUrl="/contact"
        jsonLd={jsonLd}
      />
      <Layout>
        <ContactForm />
      </Layout>
    </>
  );
};

export default Contact;
