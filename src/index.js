
class FlaapCalendar extends HTMLElement {

  selectedYear;
  selectedMonth;

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
    console.log(' ::>> initInitialState >>>>> ', year, month);
    this.selectedYear = year;
    this.selectedMonth = month;

    try {
      let table = this.shadowDom.querySelector('.cal-table tbody');
      while (table.firstChild) table.removeChild(table.firstChild);

      this.generateHeader(globals.months[this.selectedMonth], () => this.openSelectMonth());
      this.generateHeader(this.selectedYear, () => this.openSelectYear());
      this.generateRows();
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

  generateRows() {
    try {
      let firstDay = (new Date(this.selectedYear, this.selectedMonth)).getDay();
      let date = 1;

      for (let rowCount = 0; rowCount < 6; rowCount++) {
        let row = document.createElement('tr');
    
        for (let weekDayCount = 0; weekDayCount < 7; weekDayCount++) {
          let cell = document.createElement('td');

          if (rowCount === 0 && weekDayCount < firstDay) {
            this.insertCell(row, cell, '');
          } else if (date <= this.daysInMonth()) {
            if (
                date === new Date().getDate() &&
                this.selectedMonth == new Date().getMonth()
              ) {
              cell.className += ' current'
            }
            this.insertCell(row, cell, date);
            date++;
          }
        }
        let table = this.shadowDom.querySelector('.cal-table tbody');
        table.appendChild(row);
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
    this.resetState();

    this.initInitialState(this.selectedYear, month);
    let selectionBox = this.shadowDom.querySelector('.selection');
    selectionBox.className = selectionBox.className.replace(' active', '');
    
  }

  resetState() {
    let headers = this.shadowDom.querySelectorAll('div.header');
    if(headers && headers.length > 0) {
      headers.forEach(header => {
        header.parentElement.removeChild(header);
      });
    }
  }

  selectYear(year) {
    console.log(' ::>> year selected >>> ', year);
  }

  openSelectMonth() {
    let selectionBox = this.shadowDom.querySelector('.selection');

    if (selectionBox) {
      selectionBox.className += ' active';
    }
    let content = this.shadowDom.querySelector('#selection_content');
    while (content.firstChild) content.removeChild(content.firstChild);

    for(var i = 0; i < globals.months.length - 1; i++) {
      let month = globals.months[i];
      let div = document.createElement('div');
      div.dataset.index = i;
      div.className = 'month-selector';
      let cellText = document.createTextNode(month);
      div.appendChild(cellText);
      content.appendChild(div);
      
      div.addEventListener('click', (event) => {
        let monthIndex = event.path[0].dataset.index;
        console.log(' ::>> button clicked >>>>> ', monthIndex);
        this.selectMonth(monthIndex);
      });
    }
  }

  openSelectYear() {
    console.log(' ::>> select year selected >>> ');
  }

  setSelected(cell) {
    let selectedElement = this.shadowDom.querySelector('.cal-table tbody .selected');
    if (selectedElement) {
      selectedElement.className = selectedElement.className.replace(' selected', '');
    }
    cell.className += ' selected';
  }
  
  daysInMonth() {
    return new Date(this.selectedYear, this.selectedMonth, 0).getDate();
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


