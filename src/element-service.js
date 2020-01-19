class ElementService {

  static TAGS = {
    DIV: 'div',
    TABLE: 'table',
    TBODY: 'tbody',
    TD: 'td'
  };

  createTemplate(id) {
    let template = document.createElement('template');
    template.id = id;
    return template;
  }

  createTextNode(value) {
    return document.createTextNode(value);
  }

  createTable(id, className) {
    let table = document.createElement(ElementService.TAGS.TABLE);
    table.id = id || '';
    table.className = className || '';

    let body = document.createElement(ElementService.TAGS.TBODY);
    this.add([ body ]).to(table);
    return table;
  }

  createCell(value) {
    let cell = document.createElement(ElementService.TAGS.TD);
    cell.innerHTML = value || '';
    return cell;
  }

  createDiv(id, className) {
    let div = document.createElement(ElementService.TAGS.DIV);
    div.id = id || '';
    div.className = className || '';
    return div;
  }

  add(data) {
    return {
      to: (parent) => {
        if (Array.isArray(data)) {
          data.forEach(child => {
            parent.appendChild(child);
          });
        } else if(data) {
          parent.appendChild(data);
        }
      }
    };
  }
}

const elementService = new ElementService();