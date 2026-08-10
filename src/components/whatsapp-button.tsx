import { brand } from "@/data/site";

/**
 * Floating WhatsApp contact button — fixed bottom-right on every page.
 * Sharp-edged monochrome disc in line with the brand, with a gentle
 * breathing halo that is disabled for reduced-motion users via CSS.
 */
const WhatsAppButton = () => (
  <a
    href={`${brand.whatsapp}?text=${encodeURIComponent("Hello Curtains Hub, I would like a curtain consultation.")}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Curtains Hub on WhatsApp"
    className="whatsapp-fab group fixed z-40 bottom-5 right-5 md:bottom-8 md:right-8 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-background shadow-lift transition-transform duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span className="whatsapp-fab__halo" aria-hidden="true" />
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="relative h-6 w-6 md:h-7 md:w-7"
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.78.96-.96 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.42 0 1.43 1.04 2.81 1.19 3 .15.2 2.05 3.13 4.96 4.38.69.3 1.24.48 1.66.61.7.22 1.33.19 1.83.12.56-.09 1.75-.71 2-1.4.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.52 0 4.88.98 6.65 2.76a9.34 9.34 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.42 9.41zM20.5 3.49A11.28 11.28 0 0 0 12.04 0C5.82 0 .76 5.06.76 11.28c0 1.99.52 3.93 1.5 5.64L.5 24l7.25-1.9a11.25 11.25 0 0 0 4.29 1.09h.01c6.22 0 11.28-5.06 11.28-11.28 0-3.01-1.17-5.85-3.3-7.97z" />
    </svg>
  </a>
);

export default WhatsAppButton;
