import { dayNumbers } from "@/lib/editorial";

export function NumerosDoDia() {
  return (
    <aside
      id="economia"
      className="scroll-mt-[88px] border border-[#e6e0d2] bg-white px-5 py-5"
    >
      <h3 className="font-sans text-[12px] font-extrabold tracking-[0.16em] text-[#0b1730] uppercase">
        Números do dia
      </h3>
      <ul className="mt-4 flex flex-col gap-4">
        {dayNumbers.map((item) => (
          <li key={item.value}>
            <p className="font-sans text-[28px] leading-none font-extrabold tracking-[-0.03em] text-[#0b1730]">
              {item.value}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-[#3a465c]">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
