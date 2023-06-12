
  // 樂透機及Modal視窗
  const btn = document.querySelector(".btn"); // 按鈕
  const ball = document.querySelector(".ball"); // 樂透彩球
  const modal = document.getElementById("modal"); // modal 視窗
  const closeBtn = document.querySelector(".close"); // 結束 modal 視窗

  // 開啟 modal
  const openModal = () => {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("fade-in");
    }, 300);
  };

  // 結束
  const closeModal = () => {
    modal.classList.remove("fade-in");
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fade-out");
    }, 300);
  };

  const closeModalIfClicked = (event) => {
    if (event.target === modal) {
      closeModal();
      ball.classList.remove("down");
    }
  };

  const handleButtonClick = () => {
    btn.disabled = true;
    btn.classList.add("animate");
    setTimeout(() => {
      btn.classList.remove("animate");
      btn.classList.remove("ball");
      btn.disabled = false;

      ball.classList.add("down");

      setTimeout(() => {
        openModal();
      }, 0);  // 開啟 Modal
    }, 500); // 按鈕轉動一秒
  };

  btn.addEventListener("click", handleButtonClick);
  closeBtn.addEventListener("click", () => {
    closeModal();
    ball.classList.remove("down");
  });
  modal.addEventListener("click", closeModalIfClicked);


  // AJAX
  function ajaxContent(file, target) {
    const fileExtension = file.split('.').pop().toLowerCase();
    const ajaxTarget = document.querySelector(target);
    const ajaxLoading = document.querySelector('.loading');

    ajaxTarget.style.display = 'block';
    // 淡出效果
    ajaxTarget.classList.add('fade-out');
    ajaxLoading.style.display = 'block';

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // 未載入內容
      if (xhr.readyState === 4) {
        ajaxLoading.style.display = 'none';
        // 成功載入內容
        if (xhr.status === 200) {
          // 預設使用JSON
          var data = JSON.parse(xhr.responseText);
          ajaxTarget.innerHTML = '<img src="assets/images/popup/' + data.giftPicPath + '"><br>恭喜您抽到<br>' + data.giftName;
          // 如果是 .json 的格式
          // if (fileExtension === 'json') {
          //   var data = JSON.parse(xhr.responseText);
          //   ajaxTarget.innerHTML = '<img src="' + data.giftPicPath + '"><br>恭喜您抽到' + data.giftName;
            // 如果是 .htm、.html、.php 的格式
          // } else if (fileExtension === 'htm' || fileExtension === 'html' || fileExtension === 'php') {
          //   ajaxTarget.innerHTML = xhr.responseText;
          // }

          // 淡入效果
          ajaxTarget.classList.remove('fade-out');
          ajaxTarget.classList.add('fade-in');
        }
      }
    };

    xhr.open('GET', file, true);
    xhr.send();
  }

  // 更新抽獎券數量
  fetch('data.json') // 讀取 json
  .then(response => response.json())
  .then(data => {
    // 獲得抽獎券張數
    const ticketDiv = document.getElementById("ticketData"); // 獲得 #ticketData
    const userTicket = data.uesrTicket; // 將 json 的 uesrTicket 載入到 userTicket
    ticketDiv.textContent = + userTicket; // 更新網頁上抽獎券的數量
    // 獲得PS5剩餘數量
    const ps5NumEm = document.getElementById("ps5Num"); // 獲得 #ps5Num
    const userPs5 = data.ps5amount; 
    ps5NumEm.textContent = + userPs5;

  })
  .catch(error => {
    console.error('錯誤:', error);
  });


  // 粒子效果

  loadConfettiPreset(tsParticles);
  let confettiContainer;
  const paperFlowerBtn = document.getElementById("paper-flower-btn");

  tsParticles.load("tsparticles", {
    particles: {
      shape: {
        type: "character",
        character: {
          value: ["▂", "★"] // 紙片使用的符號
        },
      },
      color: {
        value: ["#ffea4a", "#bb5dff"], // 顏色
      }
    },
    preset: "confetti",
    emitters: []
  })
    .then((container) => (confettiContainer = container));

  paperFlowerBtn.addEventListener("click", () => {
    confettiContainer.addEmitter({
      size: { // 噴發的範圍，越小越集中，越大越發散
        width: 5,
        height: 5
      },
      startCount: 2, // 起始數量
      rate: {
        delay: 0,
        quantity: 10 // 粒子組數量，startCount 為一組
      },
      life: {
        duration: 0.1, // 噴發的時間長度
        count: 7 // 發射器的數量
      }
      // 發射器位置設定
      // position: { 
      //   x: 100,
      //   y: 30,
      // },
    });
  });
