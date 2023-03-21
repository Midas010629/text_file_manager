import { useStore } from "vuex";
import { reactive, ref, nextTick } from "vue";

export const toggleInfo = (item, index) => {
  const store = useStore();
  // 目前點擊a標籤索引
  const idx = ref(null);

  //  新增目前點擊-檔案/樣式
  const toggleInfo = (item, index) => {
    idx.value = null;
    store.dispatch("handInfoData", { isShow: false });
    nextTick(() => {
      idx.value = index;
      // 檔案到info用
      store.dispatch("handInfoData", { data: item, isShow: true });
    });
  };
  //  置待檔案樣式
  addEventListener("click", (e) => {
    let arrActive = document.querySelectorAll(".active");
    arrActive.forEach((item) => {
      item.classList.add("actived");
      item.classList.remove("active");
    });
  });
  return { toggleInfo, idx };
};
