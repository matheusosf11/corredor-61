"use client";

import { FormEvent, useState } from "react";

export function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section className="bg-[#0b1730] px-5 py-5 md:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3 md:items-center">
          <span
            aria-hidden
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center border border-gold/50 text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="6" width="18" height="12" rx="1.2" />
              <path d="m4 7 8 7 8-7" />
            </svg>
          </span>
          <div>
            <p className="font-sans text-[13px] font-extrabold tracking-[0.14em] text-white uppercase">
              Assine nossa newsletter
            </p>
            <p className="mt-1 text-[13px] text-cream/70">
              Receba as principais notícias e bastidores de Brasília, direto no seu e-mail.
            </p>
          </div>
        </div>

        {sent ? (
          <p className="font-sans text-[13px] text-gold">
            Cadastro anotado nesta proposta. O envio entra na versão final.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-md overflow-hidden bg-white"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu e-mail"
              className="min-w-0 flex-1 px-4 py-3 text-[14px] text-[#0b1730] placeholder:text-navy/40 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold px-5 font-sans text-[11px] font-extrabold tracking-[0.14em] text-[#0b1730] uppercase hover:bg-[#d4ad52]"
            >
              Inscrever
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
