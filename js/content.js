
async function analyzeText(inputText) {
    params = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ "text": inputText }),
    }
    const response = await fetch("<Insert Remote URL>", params);
    if (!response.ok) {
        throw new Error('HTTP Error! status' + response.status + '' + response.text);
    }
    return await response.json();
}

function injectCoach() {
    console.log("Injecting BetterUp Coach Extension");
    const emailTextArea = document.querySelector('div[role="textbox"]');

    if (!emailTextArea) {
        // The email text area isn't available yet, so try again in a moment
        setTimeout(injectCoach, 500);
        return;
    }

    console.log(emailTextArea);

    const tbl = document.querySelector("table[role='group']")
    row = tbl.rows[0];
    cell = row.insertCell(0);
    const analyzeButton = document.createElement('button');
    analyzeButton.textContent = 'BU AI Assistant';
    analyzeButton.style = "padding: 5px; margin-right: 10px; min-height: 35px; border-radius: 20px; border-width: 0px; background-color: #C91459; color: white";
    cell.appendChild(analyzeButton);

    const feedbackParagraph = document.createElement('p');

    analyzeButton.addEventListener('click', function() {
        const messages = Array.from(document.querySelectorAll('[role="listitem"]'));
        const threadContent = messages.map((message) => {
	        return message.innerText;
        });
        console.log(threadContent);
        const emailText = threadContent.join('\n\n---\n\n');
        analyzeText(emailText)
        .then(data => {
            feedbackParagraph.textContent = data.prompt; 
        }).catch(err => {
            console.log(err);
        });
    });
    emailTextArea.parentElement.append(feedbackParagraph);
    console.log("done loading");
}

injectCoach();
  
