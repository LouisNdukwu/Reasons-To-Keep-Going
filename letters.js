
document.addEventListener("DOMContentLoaded", function () {
    const filter = document.querySelector("#letter-filter");
    const letterCards = document.querySelectorAll(".letter-card");
    const filterFeedback = document.querySelector("#filter-feedback");

    const form = document.querySelector("#letter-form");
    const titleInput = document.querySelector("#letter-title");
    const themeInput = document.querySelector("#letter-theme");
    const messageInput = document.querySelector("#letter-message");

    const preview = document.querySelector("#letter-preview");
    const previewTheme = document.querySelector("#preview-theme");
    const previewTitle = document.querySelector("#preview-title");
    const previewMessage = document.querySelector("#preview-message");
    const draftFeedback = document.querySelector("#draft-feedback");

    // Filter the example letters by theme.
    filter.addEventListener("change", function () {
        let visibleCount = 0;

        letterCards.forEach(function (card) {
            if (filter.value === "all" ||
                card.dataset.theme === filter.value) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        filterFeedback.textContent =
            visibleCount + " letter(s) shown.";
    });

    // Preview the visitor's draft without publishing it.
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const theme = themeInput.value;

    if (title.length < 3 || message.length < 20 || !theme) {
        preview.hidden = false;
        draftFeedback.textContent =
            "Please enter a valid title, choose a theme, and write at least 20 characters.";
        return;
    }

    if (/https?:\/\//i.test(message)) {
        preview.hidden = false;
        draftFeedback.textContent =
            "Please remove website links from your letter.";
        return;
    }

    draftFeedback.textContent = "Submitting your letter for review...";
    preview.hidden = false;

    try {
        const response = await fetch(
            `${SUPABASE_URL}/functions/v1/submit-letter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_PUBLISHABLE_KEY
                },
                body: JSON.stringify({ title, message, theme })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Submission failed.");
        }

        previewTheme.textContent =
            theme.charAt(0).toUpperCase() + theme.slice(1);
        previewTitle.textContent = title;
        previewMessage.textContent = message;

        draftFeedback.textContent =
            "Your letter was received for review. It is not public and will appear only if approved.";

    } catch (error) {
        console.error("Letter submission error:", error);
        draftFeedback.textContent =
            "We couldn't submit your letter. Please try again later.";
    }
});
    // Clear the preview when the draft is cleared.
    form.addEventListener("reset", function () {
        preview.hidden = true;
        draftFeedback.textContent = "";
    });
});
