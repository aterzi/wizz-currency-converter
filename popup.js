function convert() {
    chrome.tabs.executeScript({
        file: 'script.js'
    });
}

document.getElementById('convert').addEventListener('click', convert);




// Saves options to chrome.storage
function save_options() {
    var nok = document.getElementById('nok').value;
    var ron = document.getElementById('ron').value;

    chrome.storage.sync.set({
        nok: nok,
        ron: ron
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// stored in chrome.storage.
function restore_options() {

    chrome.storage.sync.get({
        nok: 9.2,
        ron: 4.5
    }, function(items) {
        document.getElementById('nok').value = items.nok;
        document.getElementById('ron').value = items.ron;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('getCurrency').addEventListener('click', getCurency);

function getCurency() {
    $.get( "https://api.fixer.io/latest?base=EUR", function(data){
        chrome.storage.sync.set({
            nok: data['rates']['NOK'],
            ron: data['rates']['RON'],
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Loading ...';
            setTimeout(function() {
                document.getElementById('nok').value = data['rates']['NOK'];
                document.getElementById('ron').value = data['rates']['RON'];
                status.textContent = '';
            }, 750);
        });
    });
}

