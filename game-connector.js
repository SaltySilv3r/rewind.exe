// Minimal integration for the Blockbuster challenge system
document.addEventListener("DOMContentLoaded", function () {
    // Initialize when the page loads
    PusherManager.init();
    PusherManager.connectToChannel();

    // Set up the verification button click handler
    const verifyButton = document.getElementById('verify-code-btn');
    if (verifyButton) {
        verifyButton.addEventListener('click', function () {
            const digitInputs = document.querySelectorAll('.digit-input');
            let code = '';
            digitInputs.forEach(input => {
                code += input.value;
            });

            if (code === GAME_ENTRY_CODE) {
                // Send completion message to Blockbuster system
                PusherManager.sendMessageToChannel({
                    msg: 'Game Finished!',
                    gameID: GAME_ID
                });

                // Show completion message
                const finalChallengePage = document.querySelector('.password-verification-page');
                finalChallengePage.innerHTML = '';

                const completionMessage = document.createElement('div');
                completionMessage.className = 'completion-message';
                completionMessage.innerHTML = `
                    <h2>Congratulations!</h2>
                    <p>You've successfully completed the Rewind.exe challenge.</p>
                    <p>Your progress has been saved and the next clue will be sent shortly.</p>
                `;

                finalChallengePage.appendChild(completionMessage);
            } else {
                // Wrong code
                const verificationMessage = document.getElementById('verification-message');
                verificationMessage.textContent = 'Invalid code. Access denied.';
                verificationMessage.style.color = 'red';

                // Clear inputs
                digitInputs.forEach(input => {
                    input.value = '';
                });
                digitInputs[0].focus();
            }
        });
    }
});

// Minimal Pusher implementation
var PusherManager = {
    pusher: null,
    presenceChannel: null,

    init: function () {
        this.pusher = new Pusher('34aeee625e438241557b', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: 'https://interactionfigure.nl/nhl/blockbusterauth/pusher_auth.php'
        });
    },

    connectToChannel: function () {
        this.presenceChannel = this.pusher.subscribe('presence-blockbuster');
        this.presenceChannel.bind('pusher:subscription_succeeded', function () {
            console.log("Connected to Pusher service");
        });
    },

    sendMessageToChannel: function (msg) {
        this.presenceChannel.trigger('client-messagetochannel', msg);
    }
};