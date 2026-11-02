/** Load the HTML template at the existing WeeklySummary.html entry point. */
async function loadReportTemplate() {
  try {
    const response = await fetch("template.html");
    if (!response.ok) {
      throw new Error(`Cannot load template.html (HTTP ${response.status})`);
    }

    const templateHtml = await response.text();
    const templateDocument = new DOMParser().parseFromString(
      templateHtml,
      "text/html",
    );
    document.documentElement.replaceWith(templateDocument.documentElement);

    // DOMParser scripts are inert. Recreate them in order: React, ReactDOM,
    // Babel, html2canvas, and then the JSX sources consumed by Babel.
    for (const templateScript of Array.from(document.scripts)) {
      const executableScript = document.createElement("script");
      for (const attribute of templateScript.attributes) {
        executableScript.setAttribute(attribute.name, attribute.value);
      }
      executableScript.textContent = templateScript.textContent;
      const isJsx = ["text/babel", "text/jsx"].includes(executableScript.type);
      if (isJsx && executableScript.src) {
        const scriptResponse = await fetch(executableScript.src);
        if (!scriptResponse.ok) {
          throw new Error(
            `Cannot load ${executableScript.getAttribute("src")} (HTTP ${scriptResponse.status})`,
          );
        }
        executableScript.textContent = await scriptResponse.text();
        executableScript.removeAttribute("src");
      }
      const scriptLoaded = executableScript.src
        ? new Promise((resolve, reject) => {
            executableScript.onload = resolve;
            executableScript.onerror = () =>
              reject(new Error(`Cannot load ${executableScript.src}`));
          })
        : null;
      templateScript.replaceWith(executableScript);
      if (scriptLoaded) await scriptLoaded;
    }
    window.Babel.transformScriptTags();
  } catch (error) {
    console.error("Weekly summary failed to load:", error);
    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("role", "alert");
    errorMessage.textContent =
      "לא ניתן לטעון את הדוח. יש להפעיל דרך שרת HTTP ולנסות שוב.";
    document.body.appendChild(errorMessage);
  }
}

loadReportTemplate();
