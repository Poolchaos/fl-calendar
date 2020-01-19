const globals = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  styles: `
    .calendar-wrap {
      position: relative;
      background: #83d0fc;
      display: inline-block;
      overflow: hidden;
    }

    div.header {
      text-align: center;
      padding: 15px 0;
      cursor: pointer;
    }

    .selection {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      top: -100%;
      overflow-y: auto;
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 15px;
      background: #a3605b;
      border-radius: 5px;
      cursor: pointer;
      z-index: 10;
    }

    .selection.active {
      -webkit-animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      animation: slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @-webkit-keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(100%);
                transform: translateY(100%);
      }
    }
    @keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(100%);
                transform: translateY(100%);
      }
    }

    .month-selector {
      background: #61c5ff;
      text-align: center;
      padding: 10px;
      cursor: pointer;
    }

    .month-selector:hover {
      background: #45bbff;
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

    td.selected {
      background: #64a1c4;
      border-radius: 20px;
      color: #fff;
    }
  `,
  events: {

  }
};