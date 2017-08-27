    window.setTimeout(function(){
	    var exchangeValues = getExchangeRate(currencies);

        replaceLocalCurrency(exchangeValues['rate'],exchangeValues['abr']);
	}, 0);
	
	function replaceLocalCurrency(rate, abr){
        var flightsDivs = document.getElementsByClassName( 'rf-fare__price__current' );
        var calendarDivs = document.getElementsByClassName( 'booking-flow__flight-select__chart__day__price' );

        replaceOneCurrency(flightsDivs, rate, abr);
        replaceOneCurrency(calendarDivs, rate, abr);
	}

	function replaceOneCurrency(divs, rate, abr) {
        [].slice.call( divs ).forEach(function ( div ) {
            var currency = div.innerHTML.match(new RegExp(abr, 'i'));

            if(currency && currency[0].length>0) {
                div.innerHTML = div.innerHTML.replace(abr, '').replace(',', '').replace(' ', '');
                var amount = div.innerHTML.match(/[\d]{1,9}/g);
                div.innerHTML = "€" + parseInt(amount[0] / rate)
            }
        });
    }

	function getExchangeRate(currencies) {
        var divs = document.getElementsByClassName( 'booking-flow__flight-select__chart__day__price' );
        var price = divs[0].innerHTML;
        var currency = [];
        var exchangeCurrency = [];

        $.each(currencies, function (abr , value) {
            currency = price.match(new RegExp(value[1], 'i'));
            if(currency){
                exchangeCurrency['rate'] = value[2];
                exchangeCurrency['abr'] = value[1];
            }
        });

        return exchangeCurrency;
    }

    var currencies = [
        ['NOK','kr', 9.2],
        ['RON','lei', 4.5]
    ]

    chrome.storage.sync.get({
        nok: 9.2,
        ron: 4.5
    }, function(items) {
        window.currencies = [
            ['NOK','kr', items.nok],
            ['RON','lei', items.ron]
        ]

    });