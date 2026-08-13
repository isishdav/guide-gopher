import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  isActive?: boolean;
  imageSrc?: string;
  name?: string;
  title?: string;
  quote?: string;
}

export default function TestimonialCard({
  isActive = true,
  imageSrc = "/images/curtains/client-1.jpg",
  name = "James Arthur",
  title = "Finally Found the Solution",
  quote = "I used to dread checking my accounts, but AI budgeting tools gave me a clear picture of my spending within days. Now I actually look forward to managing my money."
}: TestimonialCardProps) {
  return (
    <div className={cn(
      "flex items-center justify-center transition-all duration-500 ease-in-out h-[500px] p-6",
      isActive ? "scale-100 opacity-100" : "scale-75 opacity-20 blur-[2px]"
    )}>
      <Card className={cn(
        "bg-transparent border-none shadow-none transition-all duration-500",
        isActive ? "w-full max-w-[1000px]" : "w-full max-w-[220px]"
      )}>
        <CardContent className={cn(
          "p-0 flex transition-all duration-500",
          isActive ? "flex-col md:flex-row items-center gap-8 md:gap-12" : "justify-center"
        )}>

          {/* Image Container */}
          <div className={cn(
            "shrink-0 transition-all duration-500",
            isActive ? "w-[200px] md:w-[320px]" : "w-[200px] md:w-[220px]"
          )}>
            <div className={cn(
              "overflow-hidden bg-zinc-800 transition-all duration-500",
              isActive ? "aspect-square rounded-none" : "aspect-square rounded-none"
            )}>
              <img
                src={imageSrc}
                alt={name}
                className={cn(
                  "h-full w-full object-cover grayscale contrast-125",
                )}
              />
            </div>
          </div>

          {/* Text Content - Only rendered when active */}
          {isActive && (
            <div className="flex flex-col space-y-6 flex-1 animate-in fade-in slide-in-from-left-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                {title}
              </h2>

              <blockquote className="text-lg md:text-xl leading-relaxed text-zinc-400">
                &quot;{quote}&quot;
              </blockquote>

              <footer className="pt-2 text-zinc-500 text-base font-medium">
                {name}
              </footer>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}