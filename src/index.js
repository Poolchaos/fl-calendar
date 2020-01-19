
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
      let closeButton = this.shadowDom.querySelector('.close');
      closeButton.addEventListener('click', () => this.closeSelectionWindow());
    } catch (error) {
      console.error('initContent | an error ocurred ', error);
    }
  }

  initInitialState(year, month) {
    this.selectedYear = typeof year === 'string' ? JSON.parse(year) : year;
    this.selectedMonth = typeof month === 'string' ? JSON.parse(month) : month;

    try {
      let table = this.shadowDom.querySelector('.cal-table tbody');
      while (table.firstChild) table.removeChild(table.firstChild);

      let headers = this.shadowDom.querySelectorAll('div.header');
      if(!headers || headers.length === 0) {
        this.generateHeader(globals.months[this.selectedMonth], 'fl-month', () => this.openSelectMonth());
        this.generateHeader(this.selectedYear, 'fl-year', () => this.openSelectYear());
      }

      this.generateRows();
    } catch (error) {
      console.error('initInitialState | an error ocurred ', error);
    }
  }

  generateHeader(value, id, callback) {
    try {
      let wrapper = this.shadowDom.querySelector('.calendar-wrap');
      let div = document.createElement('div');
      div.addEventListener('click', (event) => callback(event));
      div.className = 'header';
      div.id = id;
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
                this.selectedMonth == new Date().getMonth() &&
                this.selectedYear == new Date().getFullYear()
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
    this.shadowDom.querySelector('#fl-month').innerHTML = globals.months[month];
    this.closeSelectionWindow();
    this.initInitialState(this.selectedYear, month);
  }

  openSelectMonth() {
    this.resetSelectionBox();

    for(let i = 0; i < globals.months.length - 1; i++) {
      let month = globals.months[i];
      this.createListSelector('month-selector', month, i, (event) => {
        let monthIndex = event.path[0].dataset.index;
        this.selectMonth(monthIndex);
      });
      
    }
  }

  resetSelectionBox() {
    let content = this.shadowDom.querySelector('#selection_content');
    while (content.firstChild) content.removeChild(content.firstChild);

    let selectionBox = this.shadowDom.querySelector('.selection');
    if (selectionBox) {
      selectionBox.className += ' active';
    }
  }

  closeSelectionWindow() {
    let selectionBox = this.shadowDom.querySelector('.selection');
    selectionBox.className = selectionBox.className.replace(/ active/g, '');
  }

  createListSelector(className, value, dataIndex, callback) {
    let content = this.shadowDom.querySelector('#selection_content');
    let div = document.createElement('div');
    div.dataset.index = dataIndex;
    div.className = className;
    let cellText = document.createTextNode(value);
    div.appendChild(cellText);
    content.appendChild(div);
    
    div.addEventListener('click', (event) => callback(event));
  }

  openSelectYear() {
    this.resetSelectionBox();

    let startIndex = this.selectedYear - 50;
    let endIndex = this.selectedYear + 50;

    for(let index = startIndex; index < endIndex; index++) {
      this.createListSelector('month-selector', index, index, (event) => {
        let yearIndex = event.path[0].dataset.index;
        this.selectYear(yearIndex);
      });
    }
    setTimeout(() => {
      let selectionBox = this.shadowDom.querySelector('#selection_content');
      selectionBox.scrollTo(400, 400);
    }, 1000);
  }

  selectYear(year) {
    this.shadowDom.querySelector('#fl-year').innerHTML = year;
    this.closeSelectionWindow();
    this.initInitialState(year, this.selectedMonth);
  }

  setSelected(cell) {
    let selectedElement = this.shadowDom.querySelector('.cal-table tbody .selected');
    if (selectedElement) {
      selectedElement.className = selectedElement.className.replace(/ selected/g, '');
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
