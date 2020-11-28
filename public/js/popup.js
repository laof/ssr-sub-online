(() => {
  let qrcode = null;
  let service = window.data || []; // {name,value}

  const mainDom = $(".third-party-comp");

  function $dom(d) {
    return mainDom.find(d);
  }

  function update(index) {
    const date = new Date();
    const time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    $dom(".time").html(`[${service[index].name}] ${time}`);
    qrcode.clear();
    qrcode.makeCode(service[index].value);
  }

  function init() {
    service.forEach((item, i) => {
      $dom(".foot-btn").append(`<button>${item.name}</button>`);
    });

    $dom("button").on("click", function () {
      const i = $(this).index();
      update(i);
    });

    const code = $dom(".code")[0];
    code.innerHTML = "";
    qrcode = new QRCode(code, {
      correctLevel: QRCode.CorrectLevel.H,
      width: 340,
      height: 340
    });

    update(0);
  }

  if (service.length) {
    init();
  }

  // --end--
})();
