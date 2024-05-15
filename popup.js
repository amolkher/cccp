async function analyzeText(inputText) {
    params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "text": inputText }),
    }
    const response = await fetch("https://coach-summary-inj2j2ieuq-uc.a.run.app", params);
    if (!response.ok) {
        throw new Error('HTTP Error! status' + response.status + '' + response.text);
    }
    return await response.json();
}

document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyze-button');
    const emailTextarea = document.getElementById('email-textarea');
    const feedbackParagraph = document.getElementById('coaching-feedback');

    analyzeButton.addEventListener('click', function() {
        const emailText = emailTextarea.value;
        console.log(emailText);
        const spinner = document.getElementById('loading');
        spinner.style.display = "block";
        analyzeText(emailText)
        .then(data => {
            feedbackParagraph.textContent = data.prompt; 
            spinner.style.display = "none";
        }).catch(err => {
            console.log(err);
            spinner.style.display = "none";
        });
    });
});
