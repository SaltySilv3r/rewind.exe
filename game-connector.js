// Game connector functionality for the Rewind.exe game
// This integrates with the blockbuster challenge system

document.addEventListener("DOMContentLoaded", function () {
    GameConnector.init();
});

var GameConnector = {
    GAME_ENTRY_CODE: '0710', // The secret code users must find in the game
    GAME_ID: "rewindExeGame", // Unique identifier for this game

    init: function () {
        // Initialize Pusher connection
        PusherManager.init();
        PusherManager.connectToChannel();

        // Set up listeners for the final challenge input
        const finalChallengeInput = document.createElement('input');
        finalChallengeInput.type = 'text';
        finalChallengeInput.id = 'final-challenge-input';
        finalChallengeInput.placeholder = 'Enter the code';

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.id = 'final-challenge-submit';
        submitButton.onclick = this.onFinalCodeSubmit.bind(this);

        const finalChallengePage = document.querySelector('.final-challenge-page');
        if (finalChallengePage) {
            finalChallengePage.appendChild(finalChallengeInput);
            finalChallengePage.appendChild(submitButton);
        }
    },

    onPusherConnected: function () {
        console.log("Connected to the Pusher service!");
    },

    onFinalCodeSubmit: function () {
        const codeInput = document.getElementById('final-challenge-input');
        if (codeInput.value === this.GAME_ENTRY_CODE) {
            this.onGameComplete();
        } else {
            alert('Incorrect code. Try again.');
            codeInput.value = '';
        }
    },

    onGameComplete: function () {
        // Send message to server that the user completed the game
        PusherManager.sendMessageToChannel({
            msg: 'Game Finished!',
            gameID: this.GAME_ID
        });

        // Show completion message
        const finalChallengePage = document.querySelector('.final-challenge-page');
        finalChallengePage.innerHTML = '';

        const completionMessage = document.createElement('div');
        completionMessage.className = 'completion-message';
        completionMessage.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You've successfully completed the Rewind.exe challenge.</p>
            <p>Your progress has been saved and the next clue will be sent shortly.</p>
        `;

        finalChallengePage.appendChild(completionMessage);
    }
};

var PusherManager = {
    CHANNEL_ID: "blockbuster",

    pusher: null,
    presenceChannel: null,
    sUserID: "",
    bIsConnected: false,

    init: function () {
        Pusher.logToConsole = true;

        this.pusher = new Pusher('34aeee625e438241557b', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: 'https://interactionfigure.nl/nhl/blockbusterauth/pusher_auth.php'
        });
    },

    connectToChannel: function () {
        this.presenceChannel = this.pusher.subscribe('presence-' + this.CHANNEL_ID);
        this.presenceChannel.bind('pusher:subscription_succeeded', this.onSubscriptionSucceeded.bind(this));
    },

    onSubscriptionSucceeded: function (_data) {
        this.sUserID = _data.myID + "";
        this.bIsConnected = true;

        GameConnector.onPusherConnected();

        this.presenceChannel.bind('pusher:member_added', this.onMemberAdded.bind(this));
        this.presenceChannel.bind('pusher:member_removed', this.onMemberRemoved.bind(this));
        this.presenceChannel.bind('client-messagetochannel', this.onMessageFromOtherPlayer.bind(this));
    },

    onMemberAdded: function (_data) {
        console.log('onMemberAdded', _data);
    },

    onMemberRemoved: function (_data) {
        console.log('onMemberRemoved', _data);
    },

    sendMessageToChannel: function (_msg) {
        this.presenceChannel.trigger('client-messagetochannel', _msg);
    },

    onMessageFromOtherPlayer: function (_msg) {
        console.log('Message received:', _msg);
    }
};