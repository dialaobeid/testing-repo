document.addEventListener('DOMContentLoaded', function () {
    var generateBtn = document.getElementById('generateBtn');
    var resultContainer = document.getElementById('resultContainer');

    generateBtn.addEventListener('click', function () {
        // Fetch data from both APIs using Promise.all
        Promise.all([getUserJoke(), getUserEmoji()])
            .then(function (results) {
                // results[0] is the jokeResult, and results[1] is the emojiResult
                var jokeResult = results[0];
                var emojiResult = results[1];

                // Display results in the result container
                displayResult(emojiResult.htmlCode[0] + '<br>' + jokeResult);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
                displayResult('❓');
            });
    });

    var getUserJoke = function () {
        var apiUrl = 'https://geek-jokes.sameerkumar.website/api';

        return fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    console.error('Error fetching geek joke:', response.statusText);
                    return 'Sorry, couldn\'t fetch a geek joke at the moment.';
                }
            });
    };

    var getUserEmoji = function () {
        var apiUrl = 'https://emojihub.yurace.pro/api/random';

        return fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Error fetching emoji:', response.statusText);
                    return { htmlCode: ['❓'] };
                }
            })
            .catch(function (error) {
                console.error('Unable to connect to the emoji API', error);
                return { htmlCode: ['❓'] };
            });
    };

    var displayResult = function (result) {
        // Clear previous content in the result container
        resultContainer.innerHTML = '';

        // Display the result in the result container
        resultContainer.innerHTML = result;
    };
});
