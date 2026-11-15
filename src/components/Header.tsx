import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_LINKS = [
  { href: '#catalog', label: 'Catalog' },
  { href: '#specs', label: 'Hide Specs' },
  { href: '#craft', label: 'Craft & Origin' },
  { href: '#inquiry', label: 'Export Inquiry' },
];

export function Header({ bagCount, onOpenBag }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#1F1A17] bg-[#FDFBF7]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 py-3.5 md:px-8 xl:px-12">
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-[#1F1A17] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#703816]"
        >
          Riaz Tannery
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.08em] text-[#544840] transition-colors hover:text-[#1F1A17] hover:underline hover:decoration-[#C5A059] hover:underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#703816]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open Sample Bag, ${bagCount} units`}
            className="mechanical-hover inline-flex items-center gap-2 border border-[#703816] bg-[#703816] px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-[#FDFBF7] hover:border-[#1F1A17] hover:bg-[#1F1A17] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F1A17]"
          >
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sample Bag</span>
            <span className="tabular-nums font-bold">({bagCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#1F1A17] bg-[#FDFBF7] text-[#1F1A17] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#703816]"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#D8CEBF] bg-[#F5F0EB] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-[#D8CEBF]">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F1A17]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
