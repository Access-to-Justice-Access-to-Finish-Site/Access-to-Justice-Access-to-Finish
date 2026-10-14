(() => {
  const index = document.querySelector("[data-evidence-index]");
  if (!index) return;

  const filters = [...document.querySelectorAll("[data-filter]")];
  const records = [...index.querySelectorAll(".evidence-record")];
  const count = document.querySelector("[data-result-count]");
  const empty = document.querySelector("[data-empty-state]");
  const clear = document.querySelector("[data-clear-filters]");

  const applyFilters = () => {
    let shown = 0;
    records.forEach((record) => {
      const matches = filters.every((filter) => {
        if (!filter.value) return true;
        return (record.dataset[filter.dataset.filter] || "").split(" ").includes(filter.value);
      });
      record.hidden = !matches;
      if (matches) shown += 1;
    });
    if (count) count.textContent = String(shown);
    if (empty) empty.hidden = shown !== 0;
  };

  filters.forEach((filter) => filter.addEventListener("change", applyFilters));
  clear?.addEventListener("click", () => {
    filters.forEach((filter) => { filter.value = ""; });
    applyFilters();
  });
  applyFilters();
})();
