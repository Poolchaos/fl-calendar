

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}


const get = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  date: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    console.log(' ::>> date = ', date);
    console.log(' ::>> date = ', year);
    console.log(' ::>> date = ', month);
    console.log(' ::>> date = ', day);
  }
};

let myCustomElementTemplate = document.querySelector('#flaap-calendar');
console.log(' ::>> myCustomElementTemplate >>>> ', myCustomElementTemplate);

class FlaapCalendar extends HTMLElement {

  shadow;

  constructor() {
    super();
    console.log(' ::>> calendar initialised ');
    this.initContent();

    let year = (new Date()).getFullYear();
    let month = (new Date()).getMonth();
    this.initCurrentMonth(year, month);
  }

  initContent() {
    
    this.shadow = this.attachShadow({mode: 'open'});
    var style = document.createElement('style');

    style.textContent = `
      .calendar-wrap {
        background: #83d0fc;
        display: inline-block;
      }

      td {
        text-align: center;
        width: 50px;
        height: 50px;
        cursor: pointer;
      }

      td.current {
        background: #38a3e0;
        border-radius: 20px;
        color: #fff;
      }
    `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(myCustomElementTemplate.content.cloneNode(true));
  }

  initCurrentMonth(year, month) {
    this.tbl = this.shadow.querySelector('.cal-table tbody');
    this.tbl.innerHtml = '';

    this.generateRows(year, month);
  }

  generateRows(year, month) {
    let firstDay = (new Date(year, month)).getDay();
    let date = 1;

    for (let rowCount = 0; rowCount < 6; rowCount++) {
      let row = document.createElement('tr');
  
      for (let weekDayCount = 0; weekDayCount < 7; weekDayCount++) {
        let cell = document.createElement('td');

        if (rowCount === 0 && weekDayCount < firstDay) {
          this.insertCell(row, cell, '');
        } else if (date <= daysInMonth(month, year)) {
          if (date === new Date().getDate()) {
            cell.className += ' current'
          }
          this.insertCell(row, cell, date);
          date++;
        }
      }
      this.tbl.appendChild(row);
    }
  }

  insertCell(row, cell, date) {
    let cellText = document.createTextNode(date);
    cell.appendChild(cellText);
    cell.addEventListener();
    row.appendChild(cell);
  }
}

customElements.whenDefined('flaap-calendar').then(_ => {
  console.log('flaap-calendar is defined');
});

customElements.define('flaap-calendar', FlaapCalendar);

function init() {

}

(function() {

  // display yearly
  // display monthly
  // display dayly
  // 
  init();
  get.date();
})();