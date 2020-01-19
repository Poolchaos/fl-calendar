
class FlaapCalendar extends HTMLElement {

  constructor() {
    super();
    this.initContent();

    let year = (new Date()).getFullYear();
    let month = (new Date()).getMonth();
    this.initInitialState(year, month);
  }

  initContent() {
    try {
      this.shadowDom = this.attachShadow({mode: 'open'});
      var style = document.createElement('style');
      style.textContent = globals.styles;

      this.shadowDom.appendChild(style);
      let calendarTemplate = document.querySelector('#flaap-calendar');
      this.shadowDom.appendChild(calendarTemplate.content.cloneNode(true));
    } catch (error) {
      console.error('initContent | an error ocurred ', error);
    }
  }

  initInitialState(year, month) {
    try {
      this.tbl = this.shadowDom.querySelector('.cal-table tbody');
      this.tbl.innerHtml = '';

      this.generateHeader(globals.months[month], () => this.openSelectMonth());
      this.generateHeader(year, () => this.openSelectYear());
      this.generateRows(year, month);
    } catch (error) {
      console.error('initInitialState | an error ocurred ', error);
    }
  }

  generateHeader(value, callback) {
    try {
      let wrapper = this.shadowDom.querySelector('.calendar-wrap');
      let div = document.createElement('div');
      div.addEventListener('click', () => callback(value));
      div.className = 'header';
      let headerText = document.createTextNode(value);
      div.appendChild(headerText);
      wrapper.prepend(div);
    } catch (error) {
      console.error('generateHeader | an error ocurred ', error);
    }
  }

  generateRows(year, month) {
    try {
      let firstDay = (new Date(year, month)).getDay();
      let date = 1;

      for (let rowCount = 0; rowCount < 6; rowCount++) {
        let row = document.createElement('tr');
    
        for (let weekDayCount = 0; weekDayCount < 7; weekDayCount++) {
          let cell = document.createElement('td');

          if (rowCount === 0 && weekDayCount < firstDay) {
            this.insertCell(row, cell, '');
          } else if (date <= this.daysInMonth(month, year)) {
            if (date === new Date().getDate()) {
              cell.className += ' current'
            }
            this.insertCell(row, cell, date);
            date++;
          }
        }
        this.tbl.appendChild(row);
      }
    } catch (error) {
      console.error('generateRows | an error ocurred ', error);
    }
  }

  insertCell(row, cell, date) {
    try {
      let cellText = document.createTextNode(date);
      cell.appendChild(cellText);
      if (date) {
        cell.addEventListener('click', () =>  {
          this.setSelected(cell);
          this.selectDay(date);
        });
      }
      row.appendChild(cell);
    } catch (error) {
      console.error('insertCell | an error ocurred ', error);
    }
  }

  selectDay(day) {
    console.log(' ::>> day selected >>> ', day);
  }

  selectMonth(month) {
    console.log(' ::>> month selected >>> ', month);
  }

  selectYear(year) {
    console.log(' ::>> year selected >>> ', year);
  }

  openSelectMonth() {
    let selectionBox = this.shadowDom.querySelector('.selection');
    console.log(' ::>> select month selected >>> ', selectionBox);
    if (selectionBox) {
      selectionBox.className += ' active';
    }
  }

  openSelectYear() {
    console.log(' ::>> select year selected >>> ');
  }

  setSelected(cell) {
    let selectedElement = this.tbl.querySelector('.selected');
    if (selectedElement) {
      selectedElement.className = selectedElement.className.replace(' selected', '');
    }
    cell.className += ' selected';
  }
  
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}

if (window.customElements) {
  customElements.define('flaap-calendar', FlaapCalendar);
} else {
  document.registerElement('flaap-calendar', FlaapCalendar);
}


function init() {

}

(function() {

  // display yearly
  // display monthly
  // display dayly
  // 
  init();
  // get.date();
})();


