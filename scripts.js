const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

// Initial state
result.innerText = "No calculation performed";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Check for missing inputs
    if (dividend.trim() === "" || divider.trim() === "") {
      result.innerText =
        "Division not performed. Both values are required in inputs. Try again.";
      return;
    }

    const dividendNum = Number(dividend);
    const dividerNum = Number(divider);

    // Check for non-number inputs
    if (isNaN(dividendNum) || isNaN(dividerNum)) {
      throw new Error("Non-numeric input provided.");
    }

    // Check for division by zero
    if (dividerNum === 0) {
      console.error("Cannot divide by zero.");
      result.innerText =
        "Division not performed. Invalid number provided. Try again.";
      return;
    }

    // Truncate result to whole number
    const quotient = Math.floor(dividendNum / dividerNum);
    result.innerText = quotient;
  } catch (error) {
    console.error(error);
    document.body.innerHTML =
      "<h1>Something critical went wrong. Please reload the page</h1>";
  }
});
