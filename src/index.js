(function() {
  if (window.customElements) {
    customElements.define('flaap-calendar', FlaapCalendar);
  } else {
    document.registerElement('flaap-calendar', FlaapCalendar);
  }
})();
