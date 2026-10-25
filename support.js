
document.addEventListener("DOMContentLoaded", function () {
    const supportChoice = document.querySelector("#support-choice");
    const checkinButton = document.querySelector("#support-checkin-button");
    const feedback = document.querySelector("#support-feedback");

    checkinButton.addEventListener("click", function () {
        const choice = supportChoice.value;

        // Decide what guidance to display based on the user's choice.
        if (choice === "urgent") {
            feedback.innerHTML =
                'If you are in the United States, call or text ' +
                '<strong>988</strong> to reach the Suicide & Crisis Lifeline. ' +
                '<a href="https://988lifeline.org/get-help/">Visit the official 988 website</a>. ' +
                'If you are in immediate danger, call 911 or go to the nearest emergency department.';
        } else if (choice === "overwhelmed") {
            feedback.textContent =
                "Take one small step at a time. Consider reaching out to someone you trust, " +
                "or explore the support resources on this page.";
        } else if (choice === "talk") {
            feedback.textContent =
                "Think of someone you feel safe talking to, such as a trusted friend, " +
                "family member, school counselor, or mental-health professional.";
        } else if (choice === "unsure") {
            feedback.textContent =
                "That's okay. You don't need to have all the answers. Start by exploring " +
                "the support options above or writing down what has been on your mind.";
        } else {
            feedback.textContent =
                "Please choose an option above so we can suggest a helpful next step.";
        }
    });
});
