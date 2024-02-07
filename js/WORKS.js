// event listener that links to html code 
document.addEventListener('DOMContentLoaded', () => {
    // button and container elements from html code
    const generateBtn = document.getElementById('generateBtn');
    const resultContainer = document.getElementById('resultContainer');

    // event listener with function that is triggered when button is clicked
    generateBtn.addEventListener('click', () => {
        // promise.all = fx that fetches data from the 2 APIs (at random)
        Promise.all([getRandomEmoji(), getRandomGeekJoke()])
            .then(results => {
                // variables for the results when fetched
                const emojiResult = results[0];
                const jokeResult = results[1];

                // results of each API logged 
                console.log('Emoji API Response:', emojiResult);
                console.log('Joke API Response:', jokeResult);

                // Display both results in the result container
                // if the result is valid, it's displayed along with joke
                if (emojiResult && emojiResult.htmlCode && emojiResult.htmlCode.length > 0) {
                    resultContainer.innerHTML = emojiResult.htmlCode[0] + '<br>' + jokeResult;
                // if result not valid, error message is displayed 
                } else {
                    console.error('Emoji API Response is missing expected properties.');
                    resultContainer.textContent = '❓';
                }
            });
    });

    // fx to get random emoji 
    function getRandomEmoji() {
        // var with emojihub API
        const emojiHubApiEndpoint = 'https://emojihub.yurace.pro/api/random';

        // fetch request to the emoji API to return the 'promise'
        return fetch(emojiHubApiEndpoint)
            .then(response => response.json())
            // if there is an error, default ? emoji displays
            .catch(error => {
                console.error('Error fetching emoji:', error);
                return { htmlCode: ['❓'] };
            });
    }

    // fx to get random geek joke
    function getRandomGeekJoke() {
        // var with geek joke API
        const geekJokeApiEndpoint = 'https://geek-jokes.sameerkumar.website/api';

        // fetch request to the joke API to return the 'promise'
        return fetch(geekJokeApiEndpoint)
            .then(response => response.text())
            // if there is an error, error message appears
            .catch(error => {
                console.error('Error fetching geek joke:', error);
                return 'Sorry, could not fetch a geek joke at the moment';
            });
    }
});
