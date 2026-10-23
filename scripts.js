document.addEventListener("DOMContentLoaded", function () {
    const promptButtons = document.querySelectorAll(".prompt-button");
    const reflection = document.querySelector("#reflection");
    const clearButton = document.querySelector("#clear-button");
    const statusMessage = document.querySelector("#reflection-status");

    // Insert a selected prompt into the text box.
    promptButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            reflection.value = button.dataset.prompt;
            reflection.focus();

            statusMessage.textContent =
                "Prompt selected. Add your own thoughts below.";
        });
    });

    // Clear the text box.
    clearButton.addEventListener("click", function () {
        reflection.value = "";
        statusMessage.textContent = "Your writing has been cleared.";
        reflection.focus();
    });
});