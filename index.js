(() => {
  const overlayStyle = document.createElement("style");

  overlayStyle.innerHTML = `
  .PRINT-OVERLAY {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
  }

  .PRINT-OVERLAY-CONTENT {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    background: white;
    height: 200px;
    margin-left: -250px;
    margin-top: -100px;
    padding: 20px;
    box-shadow: 3px 3px 10px #000;
    text-align: center;
  }

  .PRINT-OVERLAY select{
    padding: 2px;
    font-size: 16px;
    width: 130px;
    font-weight: 600;
  }

  .PRINT-TITLE {
    display: none;
    break-after: page;

    text-align: center;

    margin-top: 2cm;
  }

  .PRINT-TITLE img {
    height: 4cm;
  }

  .PRINT-TITLE h1 {
    font-size: 32px;
    margin: 1.5cm;
  }

  .PRINT-TITLE svg {
    height: 10cm;
  }

  .PRINT-TITLE h2 {
    margin-top: -1.5cm;
    font-size: 24px;
  }

  @media print {
    .PRINT-TITLE {
      display: block;
      text-shadow: 2px 2px 5px white;
    }
  }

  .PRINT-OVERLAY button {
    cursor: pointer;
    margin-top: 10px;
    display: inline-block;
    border-radius: 3px;
    text-decoration: none;
    min-width: 117px;
    height: 35px;
    padding: 8px 17px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 35%);
    border: 1px solid var(--blue-darken-62);
    background-color: var(--blue-base-65);
    color: var(--silver-base-97);
  }
`;

  document.head.appendChild(overlayStyle);

  const overlay = document.createElement("div");
  overlay.classList.add("PRINT-OVERLAY");

  overlay.innerHTML = `
  <div class="PRINT-OVERLAY-CONTENT">
    <p>Please select the page size you want to print:</p>
    <select id="PRINT_SIZE">
      <option value="A4">A4</option>
      <option value="A3">A3</option>
      <option value="letter">Letter</option>
      <option value="legal">Legal</option>
    </select>
    <select id="PRINT_ORIENTATION">
      <option value="portrait">Portrait</option>
      <option value="landscape">Landscape</option>
    </select>
    <br />
    <br />
    <button>Print</button>
  </div>
`;

  document.body.appendChild(overlay);

  const title = document.createElement("div");
  title.classList.add("PRINT-TITLE");

  title.innerHTML = `
  <div class="PRINT-TITLE">
    <img src="https://camunda.com/wp-content/uploads/2020/06/camunda-logo-dark.svg" id="PRINT_LOGO" />
    <h1>${
      document.querySelector(".DashboardView .EntityName .name").textContent
    }</h1>
    <svg id="uuid-02afef1a-6f06-4d60-a287-7f5adb575a34" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
      <defs>
        <style>
          .uuid-f5953e61-beda-4dbf-9d9c-3e2cdf58d051 {
            fill: #fc5d0d;
            filter: url(#uuid-95b5c9e8-de36-469c-a95e-32164a0818f2);
          }
        </style>
        <filter id="uuid-95b5c9e8-de36-469c-a95e-32164a0818f2" data-name="drop-shadow-2" filterUnits="userSpaceOnUse">
          <feOffset dx="0" dy="9.6604"/>
          <feGaussianBlur result="uuid-bd5aa32e-6bd8-4d9d-8895-6eca181596fa" stdDeviation="9.6604"/>
          <feFlood flood-color="#020202" flood-opacity=".25"/>
          <feComposite in2="uuid-bd5aa32e-6bd8-4d9d-8895-6eca181596fa" operator="in"/>
          <feComposite in="SourceGraphic"/>
        </filter>
      </defs>
      <polygon points="414.3457 121.5514 294.6209 131.2065 317.8073 164.9172 263.2415 206.0335 255.5172 212.3101 256 220.0346 266.2726 343.3059 199.9997 335.8979 198.0686 335.8979 196.6205 336.3792 97.6543 390.4486 198.8249 347.1586 274.8277 362.9316 285.4486 365.346 285.4486 353.276 288.1463 228.2768 339.6937 196.738 362.6905 230.173 414.3457 121.5514" style="fill: #fc5d0d; filter: url(#uuid-95b5c9e8-de36-469c-a95e-32164a0818f2);"/>
    </svg>
    <h2>Camunda Optimize Report</h2>
  </div>
`;

  document.body.prepend(title);

  overlay.querySelector("button").addEventListener("click", () => {
    const size = document.querySelector("#PRINT_SIZE").value;
    const orient = document.querySelector("#PRINT_ORIENTATION").value;

    let width;
    if (size === "A4" && orient === "portrait") {
      width = 210;
    } else if (size === "A4" && orient === "landscape") {
      width = 297;
    } else if (size === "A3" && orient === "portrait") {
      width = 297;
    } else if (size === "A3" && orient === "landscape") {
      width = 420;
    } else if (size === "letter" && orient === "portrait") {
      width = 216;
    } else if (size === "letter" && orient === "landscape") {
      width = 279;
    } else if (size === "legal" && orient === "portrait") {
      width = 216;
    } else if (size === "legal" && orient === "landscape") {
      width = 356;
    }

    const tag = document.createElement("style");

    tag.innerHTML = `
      @page {size: ${size} ${orient};}

      .Header,
      footer,
      .header .tools,
      .DashboardView .header,
      .Popover, .InstanceCount {
        display: none !important;
      }
  
      .Dashboard {
        padding: 0;
      }
  
      .EntityName .name-container .name {
        max-width: calc(100%) !important;
      }
  
      .DashboardView > .content {
        height: initial;
        overflow-y: hidden !important;
        overflow-x: hidden !important;
  
        padding: 0 !important;
        transform-origin: top left;
      }
  
      main {
        height: initial;
        overflow-y: initial;
      }
  
      .Number {
        overflow: hidden;
      }
  
      .grid-entry {
        break-inside: avoid;
      }

      .OptimizeReport .Select .Button {
        border: none;
        background: none;
        padding: 0;
      }
      .OptimizeReport .Select .Button .downIcon {
        display: none;
      }
  `;

    document.body.removeChild(overlay);
    document.head.appendChild(tag);

    addEventListener("afterprint", (e) => {
      document.head.removeChild(tag);
      document.body.removeChild(title);
      document.querySelector(".content").style.width = "initial";
      window.dispatchEvent(new Event("resize"));
    });

    document.querySelector(".content").style.width = width + "mm";
    window.dispatchEvent(new Event("resize"));

    setTimeout(print, 200);
  });
})();
