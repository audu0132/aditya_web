"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thanks! You're on the list.");
      }}
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-950 transition-colors"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-zinc-950 text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors"
      >
        SUBSCRIBE
      </button>
    </form>
  );
}
