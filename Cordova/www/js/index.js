var App = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        document.addEventListener('click', () => {
            StatusBar.hide();
        });

        StatusBar.hide();

        this.CheckStatus();
    },

    // deviceready Event Handler

    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        window.FirebasePlugin.getToken(function (token) {

            // alert(token);

        }, function (error) {

            console.error(error);

        });

        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    CheckStatus: function () {
        var URL = "https://acaofilosofica.web.app/";
        var XHTTP = new XMLHttpRequest();
        var IFRAME = document.getElementById('iframe');

        XHTTP.open("GET", URL, true);
        XHTTP.onload = (e) => {
            if (XHTTP.readyState === 4) {
                if (XHTTP.status === 200) {
                    this.Online();
                    IFRAME.setAttribute('src', URL);
                } else {
                    this.Offline();
                }
            }
        };
        XHTTP.onerror = (e) => {
            this.Offline();
        };
        XHTTP.send(null);
    },

    Online: function () {
        document.querySelector('.loading').setAttribute('style', 'display: none;');
        document.querySelector('.app').setAttribute('style', 'display: block;');
    },

    Offline: function () {
        document.querySelector('.loading').setAttribute('style', 'display: flex;');
        document.querySelector('.app').setAttribute('style', 'display: none;');
    }
};

App.initialize();