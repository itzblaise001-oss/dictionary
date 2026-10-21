
window.alert ("welcome to Ebube's dictionary site")
window.alert ("you are free to search anything for free")


async function search() {
            let word = document.getElementById("word").value.trim();
            let result = document.getElementById("result");

            if (word === "") {
                result.innerHTML = "<p>Please enter a word.</p>";
                return;
            }

            result.innerHTML = "<p>Searching...</p>";

            try {
                const response = await fetch(
                    `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(word)}`
                );

                if (!response.ok) {
                    throw new Error("Word not found");
                }

                const data = await response.json();

                
                const entries = data.entries || [];

                if (entries.length === 0) {
                    throw new Error("No meaning found for this word.");
                }

                let output = `<h3>${word}</h3>`;

                entries.forEach(entry => {
                    entry.senses.forEach(sense => {
                        output += `
                            <p>
                                <strong>${entry.partOfSpeech || "Meaning"}:</strong>
                                ${sense.definition}
                            </p>
                        `;
                    });
                });

                
                result.innerHTML = output;

            } catch (error) {
                result.innerHTML = `<p>${error.message === "Failed to fetch"
                    ? "no internet"
                    : "Word not found. try another word."}</p>`;
            }
        }