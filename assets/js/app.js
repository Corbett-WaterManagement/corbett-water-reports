async function loadAccountReport() {
  const nameElement = document.querySelector("#report-name");
  const periodElement = document.querySelector("#report-period");
  const statusElement = document.querySelector("#report-status");
  const monthElement = document.querySelector("#month-name");
  const usageElement = document.querySelector("#month-usage");
  const errorElement = document.querySelector("#report-error");

  if (!nameElement) {
    return;
  }

  try {
    const response = await fetch("./data.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(
        `Unable to load account data (${response.status})`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data.months) || data.months.length === 0) {
      throw new Error("No monthly reporting data found.");
    }

    const firstMonth = data.months[0];

    nameElement.textContent =
      data.reportDisplayName;

    periodElement.textContent =
      `${data.reportingQuarter} ${data.reportingYear}`;

    statusElement.textContent =
      data.status;

    monthElement.textContent =
      firstMonth.month;

    usageElement.textContent =
      `${Number(firstMonth.irrigationUsageGal)
        .toLocaleString("en-US")} gal`;

  } catch (error) {
    console.error(error);

    errorElement.hidden = false;

    errorElement.textContent =
      "The account report could not be loaded.";
  }
}

loadAccountReport();
