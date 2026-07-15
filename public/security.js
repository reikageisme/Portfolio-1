(function () {
  const showNotification = (message) => {
    console.clear();
    console.log("%cTiduVN", "font-size: 40px; color: red; font-weight: bold;");
    new Notify({
      status: "error",
      title: "Blocked",
      text: message,
      effect: "slide",
      speed: 300,
      customClass: "",
      showIcon: true,
      closeButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 10,
    });
  };

  const blockDevTools = () => {
    showNotification("Developer Tools access is not allowed !");
    debugger;
  };

  const detectDevTools = () => {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: () => {
        blockDevTools();
        throw new Error("DevTools Blocked");
      },
    });
    console.log(element);
  };

  const preventElementAccess = () => {
    const keyMap = [
      {
        ctrl: false,
        shift: false,
        key: "F12",
        message: "F12 is disabled ! Developer Tools cannot be opened",
      },
      {
        ctrl: true,
        shift: true,
        key: "I",
        message:
          "Ctrl + Shift + I is disabled ! Developer Tools cannot be opened",
      },
      {
        ctrl: true,
        shift: true,
        key: "J",
        message:
          "Ctrl + Shift + J is disabled ! Developer Console cannot be opened",
      },
      {
        ctrl: true,
        shift: true,
        key: "C",
        message: "Ctrl + Shift + C is disabled ! Inspect element is blocked",
      },
      {
        ctrl: true,
        shift: false,
        key: "U",
        message: "Ctrl + U is disabled ! Viewing page source is blocked",
      },
      {
        ctrl: true,
        shift: false,
        key: "S",
        message: "Ctrl + S is disabled ! Saving this page is blocked",
      },
    ];

    const isMatch = (e, combo) => {
      return (
        (combo.ctrl ? e.ctrlKey : true) &&
        (combo.shift ? e.shiftKey : true) &&
        e.key.toUpperCase() === combo.key
      );
    };

    const handler = (e) => {
      for (const combo of keyMap) {
        if (isMatch(e, combo)) {
          e.preventDefault();
          showNotification(combo.message);
          break;
        }
      }
    };

    ["keydown", "keypress"].forEach((event) =>
      document.addEventListener(event, handler)
    );

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      showNotification("Right - click is disabled !");
    });
  };

  detectDevTools();
  preventElementAccess();
})();
