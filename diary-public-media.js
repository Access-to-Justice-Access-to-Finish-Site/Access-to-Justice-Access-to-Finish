(() => {
  const match = location.pathname.match(/year-(202[0-6])\.html$/);
  if (!match) return;

  const year = match[1];
  const publicMedia = {
    "2020": { entries: {} },
    "2021": { entries: {} },
    "2022": { entries: {} },
    "2023": {
      entries: {
        4: { image: "assets/evidence/classmate-redacted-quote.png", alt: "Redacted contemporaneous classmate account with identity and private conversation removed.", caption: "A redacted contemporaneous account. It establishes what the sender reported; it is not presented as a final legal finding." }
      },
      supplements: [
        { image: "assets/evidence/shelley-key-text-visual.png", alt: "Redacted faculty message describing ongoing discrimination at Western Law and an inhospitable environment.", caption: "Contemporaneous written context. The public exhibit removes identifying and unrelated private information." }
      ]
    },
    "2024": {
      entries: {
        2: { image: "assets/evidence/botterell-lawyer-statement-highlight.png", alt: "Redacted transcript excerpt highlighting a question about wanting to be a lawyer and comments about communication.", caption: "Transcript T-120–T-121. The exhibit separates the recorded wording from my interpretation." }
      }
    },
    "2025": { entries: {} },
    "2026": { entries: {} }
  };

  const config = publicMedia[year] || { entries: {} };
  const gallery = [];

  const evidenceFigure = (item) => {
    const figure = document.createElement("figure");
    figure.className = "diary-artifact public-evidence-figure";
    figure.innerHTML = `<a href="${item.image}" target="_blank" rel="noopener" aria-label="Open this evidence image at full size"><img src="${item.image}" alt="${item.alt}" loading="lazy"></a><figcaption><span class="artifact-caption">${item.caption}</span><span class="artifact-disclaimer">Open the image to review it at full size without cropping.</span></figcaption>`;
    return figure;
  };

  Object.entries(config.entries || {}).forEach(([entryNumber, item]) => {
    const entry = document.querySelector(`#entry-${entryNumber}`);
    if (!entry || !item.image) return;
    const placeholder = entry.querySelector(".diary-artifact");
    placeholder?.replaceWith(evidenceFigure(item));
  });

  (config.supplements || []).forEach((item) => gallery.push(item));

  if (year === "2024") {
    const whroEntry = document.querySelector("#entry-6 .diary-entry-body");
    if (whroEntry && !whroEntry.querySelector(".whro-diary-link")) {
      const link = document.createElement("p");
      link.className = "whro-diary-link";
      link.innerHTML = '<a class="button" href="whro-meeting.html">Open the dedicated WHRO meeting page →</a>';
      whroEntry.append(link);
    }
  }

  document.querySelectorAll(".diary-entry").forEach((entry) => {
    const note = entry.querySelector(".source-note");
    if (!note || entry.querySelector(".entry-metadata")) return;
    const raw = note.innerHTML;
    const evidence = raw.match(/<b>Evidence:<\/b>\s*([^<]+)/i)?.[1]?.trim() || "Source description under review";
    const status = raw.match(/<b>Status:<\/b>\s*([^<]+)/i)?.[1]?.trim() || "Publication review pending";
    const type = entry.querySelector(".artifact-top span:first-child")?.textContent?.replace(/^ARCHIVE\s*\/\s*|^RECORD\s*\/\s*/i, "").trim() || "Documentary record";
    const date = entry.querySelector(".diary-entry-date")?.textContent?.trim() || "Date under review";
    const details = document.createElement("details");
    details.className = "entry-metadata";
    details.innerHTML = `<summary>Evidence details and publication status</summary><dl><div><dt>Date</dt><dd>${date}</dd></div><div><dt>Document type</dt><dd>${type}</dd></div><div><dt>Source</dt><dd>${evidence}</dd></div><div><dt>Publication status</dt><dd>${status}</dd></div></dl>`;
    note.replaceWith(details);
  });

  if (gallery.length) {
    const section = document.createElement("section");
    section.className = "public-media-gallery";
    section.setAttribute("aria-labelledby", `gallery-${year}`);
    section.innerHTML = `<div class="eyebrow">Selected public-ready evidence</div><h2 id="gallery-${year}">${year} supporting record</h2><p class="gallery-intro">Only material that adds distinct documentary context is displayed. Repeated art, private identifiers and unrelated third-party details are excluded.</p><div class="public-media-grid"></div>`;
    const grid = section.querySelector(".public-media-grid");
    gallery.forEach((item) => grid.append(evidenceFigure(item)));
    document.querySelector(".diary-chronology")?.after(section);
  }

  document.querySelectorAll(".diary-artifact:not(.public-evidence-figure) .artifact-disclaimer").forEach((note) => {
    note.textContent = "Sensitive or unverified source retained privately; a public copy will be added only after verification, permission and redaction review.";
  });
})();
