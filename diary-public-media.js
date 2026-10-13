(() => {
  const match = location.pathname.match(/year-(202[0-6])\.html$/);
  if (!match) return;

  const year = match[1];
  const publicMedia = {
    "2020": {
      entries: {
        2: { image: "assets/diary/art-studio-2020.jpg", alt: "The artist working on a large acrylic painting in her studio before law school.", caption: "Studio practice and business development before Western Law." }
      }
    },
    "2021": {
      entries: {
        2: { image: "assets/diary/toronto-star-project-aaron-2021.jpg", alt: "Retained view of the March 31, 2021 Toronto Star feature about Project Aaron.", caption: "Toronto Star feature by Ann Marie Elpa, March 31, 2021. Displayed as a contextual record of media coverage." },
        4: { image: "assets/diary/project-aaron-fundraiser.jpg", alt: "Project Aaron crowdfunding page showing 1,177 dollars raised against a 1,000 dollar goal.", caption: "The retained fundraising record shows $1,177 raised against the $1,000 goal." },
        6: { image: "assets/diary/western-induction-2021.jpg", alt: "Signing the Western Law induction book at the start of law school.", caption: "September 7, 2021: induction into the JD Class of 2024." },
        7: { image: "assets/diary/sls-first-year-representative.jpg", alt: "Student Legal Society profile identifying Renée as a first-year representative.", caption: "Contemporaneous first-year Student Legal Society representative profile." },
        8: { image: "assets/diary/bfln-panel-redacted.jpg", alt: "A legal-career panel slide with unrelated third-party names redacted.", caption: "November 2021 legal-career workshop. Unrelated panelist names are redacted; the original is preserved privately." }
      }
    },
    "2022": {
      entries: {
        1: { image: "assets/diary/contracts-study-notes.jpg", alt: "A contracts casebook beside handwritten study notes.", caption: "Contemporaneous first-year coursework and preparation." }
      }
    },
    "2023": {
      entries: {
        1: { audio: "assets/audio/01-chamberlain-early-notice.mp3", audioTitle: "Early notice and a request for solutions", transcript: "February 2023 · Transcript T-025–T-026", quote: "“I just want to find solutions.”", audioCopy: "This excerpt documents early notice, isolation and a solution-focused request while academic problems were unfolding." },
        4: { image: "assets/evidence/classmate-redacted-quote.png", alt: "Redacted contemporaneous classmate account with identity and private conversation removed.", caption: "A redacted contemporaneous account. It establishes what the sender reported; it is not presented as a final legal finding." }
      },
      supplements: [
        { image: "assets/evidence/shelley-key-text-visual.png", alt: "Redacted faculty message describing ongoing discrimination at Western Law and an inhospitable environment.", caption: "Contemporaneous written context. The public exhibit removes the student greeting, device details and unrelated private information." }
      ]
    },
    "2024": {
      entries: {
        1: { image: "assets/diary/western-law-building.jpg", alt: "Exterior of the Western Law building.", caption: "Institutional setting for the 2024 academic and administrative record." },
        2: { image: "assets/evidence/botterell-lawyer-statement-highlight.png", alt: "Redacted transcript excerpt highlighting a question about wanting to be a lawyer and comments about communication.", caption: "Transcript T-120–T-121. The public exhibit separates the recorded wording from my interpretation.", audio: "assets/audio/02-botterell-return-conditions.mp3", audioTitle: "Return conditions and acknowledged workarounds", transcript: "August 16, 2024 · Transcript T-105–T-107", quote: "“There are workarounds.”", audioCopy: "The excerpt addresses a physician’s note, withdrawal and retake options, campus attendance and the proposed timing of a return." },
        4: { audio: "assets/audio/03-whro-anti-reprisal.mp3", audioTitle: "Complaint support and anti-reprisal guidance", transcript: "2024 · Transcript T-184–T-185", quote: "“If you become aware of any blowback, it’s very important that you immediately advise.”", audioCopy: "This records guidance given near the end of a human-rights consultation. It does not, by itself, establish that a later event was reprisal." }
      }
    },
    "2025": {
      entries: {
        3: { audio: "assets/audio/04-april-2025-graduation-plan.mp3", audioTitle: "A proposed completion route", transcript: "April 2025 · Transcript T-218–T-219", quote: "“What does that gap look like, and how do you propose to close that gap?”", audioCopy: "The discussion contemplated a supported proposal requiring an academic decision-maker with authority. The route was not implemented." }
      }
    },
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

  const audioCard = (item) => {
    const section = document.createElement("section");
    section.className = "public-audio-card";
    section.setAttribute("aria-label", item.audioTitle);
    section.innerHTML = `<div class="public-audio-meta"><span>Contextual audio excerpt</span><strong>${item.transcript}</strong></div><h3>${item.audioTitle}</h3><blockquote>${item.quote}</blockquote><audio controls preload="metadata" src="${item.audio}">Your browser does not support audio playback.</audio><p>${item.audioCopy}</p><p class="audio-boundary">The complete original recording remains preserved privately. This excerpt supports only the narrow context described here and should be read with the cited transcript pages.</p>`;
    return section;
  };

  Object.entries(config.entries || {}).forEach(([entryNumber, item]) => {
    const entry = document.querySelector(`#entry-${entryNumber}`);
    if (!entry) return;
    if (item.image) {
      const placeholder = entry.querySelector(".diary-artifact");
      const figure = evidenceFigure(item);
      placeholder?.replaceWith(figure);
      // The evidence image is already visible beside its dated entry. Do not duplicate it in a second gallery.
    }
    if (item.audio) entry.querySelector(".diary-entry-body")?.append(audioCard(item));
  });

  (config.supplements || []).forEach((item) => gallery.push(item));

  if (gallery.length) {
    const section = document.createElement("section");
    section.className = "public-media-gallery";
    section.setAttribute("aria-labelledby", `gallery-${year}`);
    section.innerHTML = `<div class="eyebrow">Selected public-ready media</div><h2 id="gallery-${year}">${year} evidence gallery</h2><p class="gallery-intro">Only the strongest contextual images are displayed. Originals remain preserved; duplicates, private identifiers and unrelated third-party details are excluded.</p><div class="public-media-grid"></div>`;
    const grid = section.querySelector(".public-media-grid");
    const seen = new Set();
    gallery.forEach((item) => {
      if (!item.image || seen.has(item.image)) return;
      seen.add(item.image);
      grid.append(evidenceFigure(item));
    });
    document.querySelector(".diary-chronology")?.after(section);
  }

  document.querySelectorAll(".diary-artifact:not(.public-evidence-figure) .artifact-disclaimer").forEach((note) => {
    note.textContent = "Sensitive or unverified source retained privately; a public copy will be added only after verification, permission and redaction review.";
  });
})();
