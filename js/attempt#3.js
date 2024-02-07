document.addEventListener('DOMContentLoaded', function () {
    var generateBtn = document.getElementById('generateBtn');
    var resultContainer = document.getElementById('resultContainer');

    generateBtn.addEventListener('click', function () {
        // Fetch data from both APIs
        getUserJoke();
        getUserEmoji();
    });

    var getUserJoke = function () {
        var apiUrl = 'https://geek-jokes.sameerkumar.website/api';

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error('Error fetching geek joke:', response.statusText);
                    return 'Sorry, couldn\'t fetch a geek joke at the moment.';
                }
            })
            .then(function (jokeResult) {
                displayResult(jokeResult);
            })
            .catch(function (error) {
                console.error('Unable to connect to the joke API', error);
                displayResult('❓');
            });
    };

    var getUserEmoji = function () {
        var apiUrl = 'https://emojihub.yurace.pro/api/random';

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Error fetching emoji:', response.statusText);
                    return { htmlCode: ['❓'] };
                }
            })
            .then(function (emojiResult) {
                if (emojiResult && emojiResult.htmlCode && emojiResult.htmlCode.length > 0) {
                    displayResult(emojiResult.htmlCode[0]);
                } else {
                    console.error('Emoji API Response is missing expected properties.');
                    displayResult('❓');
                }
            })
            .catch(function (error) {
                console.error('Unable to connect to the emoji API', error);
                displayResult('❓');
            });
    };

    var displayResult = function (result) {
        // Clear previous content in the result container
        resultContainer.innerHTML = '';

        // Display the result in the result container
        resultContainer.innerHTML = result;
    };
});
