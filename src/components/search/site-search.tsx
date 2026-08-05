"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { groupOrder, searchSite, suggestedSearches, type SearchItem } from "@/lib/search-index";
import { ArrowUpRight, Search, X } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface SiteSearchProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Instant, dependency-free site search over collections, accessories,
 * services, pages and FAQ answers. Full keyboard support: ↑ ↓ Enter Esc.
 */
const SiteSearch = ({ open, onOpenChange }: SiteSearchProps) => {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState("");
    const [active, setActive] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    const results = React.useMemo(() => searchSite(query), [query]);

    React.useEffect(() => {
        setActive(0);
    }, [query]);

    React.useEffect(() => {
        if (!open) setQuery("");
    }, [open]);

    // Scroll the highlighted option into view as the user arrows through
    React.useEffect(() => {
        const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
        el?.scrollIntoView({ block: "nearest" });
    }, [active]);

    const go = React.useCallback(
        (item: SearchItem) => {
            onOpenChange(false);
            navigate(item.href);
        },
        [navigate, onOpenChange],
    );

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (!results.length) return;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((i) => (i + 1) % results.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((i) => (i - 1 + results.length) % results.length);
        } else if (event.key === "Enter") {
            event.preventDefault();
            go(results[active]);
        }
    };

    const grouped = groupOrder
        .map((group) => ({ group, items: results.filter((r) => r.group === group) }))
        .filter((g) => g.items.length > 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[680px] p-0 gap-0 top-[12%] translate-y-0 border border-border bg-background/95 backdrop-blur-2xl overflow-hidden"
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                    inputRef.current?.focus();
                }}
            >
                <DialogTitle className="sr-only">Search Curtains Hub</DialogTitle>

                <div className="flex items-center gap-3 border-b border-border px-5">
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <input
                        ref={inputRef}
                        type="search"
                        role="combobox"
                        aria-expanded={results.length > 0}
                        aria-controls="site-search-results"
                        aria-autocomplete="list"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Search curtains, blinds, accessories, services…"
                        aria-label="Search the website"
                        className="h-14 w-full bg-transparent text-[0.95rem] font-semibold outline-none placeholder:font-medium placeholder:text-muted-foreground"
                    />
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        aria-label="Close search"
                        className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>

                <div ref={listRef} id="site-search-results" role="listbox" className="max-h-[58vh] overflow-y-auto p-2">
                    {/* Empty state */}
                    {!query && (
                        <div className="p-4 space-y-4">
                            <p className="eyebrow">Popular searches</p>
                            <ul className="flex flex-wrap gap-2">
                                {suggestedSearches.map((s) => (
                                    <li key={s}>
                                        <button
                                            type="button"
                                            onClick={() => setQuery(s)}
                                            className="border border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* No results */}
                    {query && results.length === 0 && (
                        <div className="px-5 py-10 text-center space-y-2">
                            <p className="text-body-sm font-semibold text-foreground">
                                Nothing matches “{query}”.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Try “blackout”, “sheer”, “rods” or{" "}
                                <button
                                    type="button"
                                    className="underline underline-offset-4 hover:text-foreground"
                                    onClick={() => {
                                        onOpenChange(false);
                                        navigate("/contact");
                                    }}
                                >
                                    ask our team directly
                                </button>
                                .
                            </p>
                        </div>
                    )}

                    {grouped.map(({ group, items }) => (
                        <div key={group} className="mb-2">
                            <p className="eyebrow px-4 py-2">{group}</p>
                            <ul>
                                {items.map((item) => {
                                    const index = results.indexOf(item);
                                    return (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={index === active}
                                                data-index={index}
                                                onMouseEnter={() => setActive(index)}
                                                onClick={() => go(item)}
                                                className="w-full flex items-center gap-4 px-4 py-3 text-left transition-colors aria-selected:bg-secondary"
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        width={56}
                                                        height={56}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-12 w-12 shrink-0 object-cover"
                                                    />
                                                ) : (
                                                    <span className="h-12 w-12 shrink-0 border border-border" aria-hidden="true" />
                                                )}
                                                <span className="min-w-0 flex-1">
                                                    <span className="block truncate text-sm font-bold text-foreground">{item.title}</span>
                                                    <span className="block truncate text-xs font-medium text-muted-foreground">{item.description}</span>
                                                </span>
                                                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4 border-t border-border px-5 py-3 text-[0.7rem] font-semibold text-muted-foreground">
                    <span>↑ ↓ to navigate</span>
                    <span>↵ to open</span>
                    <span>esc to close</span>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SiteSearch;
