/* Minimal evidence chronology: no art, photographs or generated source-image galleries.
   Display only source metadata and approved cross-references. */
(() => {
  const current = location.pathname.match(/year-(202[0-6])\.html$/);
  if (!current) return;
  if (current[1] === "2024") {
    const body = document.querySelector("#entry-6 .diary-entry-body");
    if (body && !body.querySelector(".whro-diary-link")) {
      const p = document.createElement("p");
      p.className = "whro-diary-link";
      const a = document.createElement("a");
      a.href = "whro-meeting.html";
      a.textContent = "Read the WHRO meeting record →";
      p.appendChild(a);
      body.appendChild(p);
    }
  }
  document.querySelectorAll(".diary-entry").forEach((entry) => {
    const note = entry.querySelector(".source-note");
    if (!note || entry.querySelector(".entry-metadata")) return;
    const raw = note.innerHTML;
    const evidence = raw.match(/<b>Evidence:<\/b>\s*([^<]+)/i)?.[1]?.trim() || "Source under review";
    const status = raw.match(/<b>Status:<\/b>\s*([^<]+)/i)?.[1]?.trim() || "Publication review pending";
    const type = entry.querySelector(".source-kind")?.textContent?.replace(/^(?:ARCHIVE|RECORD)\s*\/\s*/i,"").trim() || "Documentary source";
    const date = entry.querySelector(".diary-entry-date")?.textContent?.trim() || "Date under review";
    const details = document.createElement("details");
    details.className = "entry-metadata";
    const summary = document.createElement("summary");
    summary.textContent = "Source details and publication status";
    details.appendChild(summary);
    const list = document.createElement("dl");
    for (const [label,value] of [["Date",date],["Record type",type],["Source",evidence],["Publication status",status]]) {
      const wrapper = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      wrapper.append(dt,dd);
      list.appendChild(wrapper);
    }
    details.appendChild(list);
    note.replaceWith(details);
  });
})();
