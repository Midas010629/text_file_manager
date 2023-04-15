export const clickActive = (file) => {
  const clickActive = (file) => {
    //  取消點擊後的檔案樣式
    addEventListener("click", (e) => {
      let arrActive = document.querySelectorAll(".jsActive");
      arrActive.forEach((item) => {
        item.classList.add("jsActived");
        item.classList.remove("jsActive");
      });
    });
  };

  return { clickActive };
};
