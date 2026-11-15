export function TanneryOriginStamp() {
  return (
    <aside
      aria-label="Sialkot Tannery Origin Certification"
      className="border border-[#C5A059] bg-[#FDFBF7] p-5 md:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#703816]">
            Certified Export Provenance
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1F1A17]">
            Sialkot Tannery Origin Stamp
          </h3>
          <p className="mt-1 font-serif text-base italic text-[#544840]">
            Chrome-free drum &amp; slow pit vegetable tanning compliant with European REACH protocols.
          </p>
        </div>
        <div className="shrink-0 border border-[#1F1A17] bg-[#F5F0EB] px-3 py-2 text-left sm:text-right">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
            Batch Registry
          </div>
          <div className="tabular-nums text-sm font-semibold text-[#1F1A17]">
            SLK-EST-402B
          </div>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-[#D8CEBF] pt-4 sm:grid-cols-4">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
            Origin Zone
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#1F1A17]">Sialkot, PK</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
            Chemical Spec
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#1F1A17]">EU REACH Pass</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
            Dry Port
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#1F1A17]">Sambrial / KHI</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#544840]">
            Hide Grading
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#1F1A17]">Grade A &amp; B Bench</dd>
        </div>
      </dl>
    </aside>
  );
}
