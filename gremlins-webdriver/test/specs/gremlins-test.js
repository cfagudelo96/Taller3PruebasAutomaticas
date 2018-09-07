function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

//  formFillerGremlin.canFillElement(function(element) { return true }); // to limit where the gremlin can fill


function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde()
    .gremlin(gremlins.species.formFiller().canFillElement(function(element) {
      return element.offsetParent !== null && !element.disabled;
    }))
    .gremlin(gremlins.species.clicker().canClick(function(element) {
      return element.offsetParent !== null && element.tagName === 'BUTTON' || element.tagName === 'A';
    }))
    .gremlin(gremlins.species.toucher())
    .gremlin(gremlins.species.scroller());
  horde.seed(1234);
  horde.strategy(gremlins.strategies.distribution()
    .distribution([0.1, 0.8, 0.05, 0.05])
  );

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});