"use client";

import { Search } from "lucide-react";

export function HelpSearchBox() {
  return (
    <form
      className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-premium"
      onSubmit={(e) => e.preventDefault()}
      role="search"
      aria-label="Cerca nel centro assistenza"
    >
      <Search className="ml-2 h-5 w-5 shrink-0 text-body" />
      <input
        type="search"
        placeholder="Cerca una domanda, ad esempio “come cancello una prenotazione”"
        className="h-11 w-full border-0 bg-transparent text-sm text-ink placeholder:text-body/70 focus:outline-none focus:ring-0"
      />
      <button
        type="submit"
        className="hidden h-11 shrink-0 items-center rounded-xl bg-navy px-5 text-sm font-medium text-white hover:bg-navy-800 sm:flex"
      >
        Cerca
      </button>
    </form>
  );
}
