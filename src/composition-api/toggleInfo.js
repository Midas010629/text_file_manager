import { useStore } from "vuex";
import {
  reactive,
  ref,
  nextTick,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "vue";

export const toggleInfo = (item, index) => {
  const store = useStore();
  // 目前點擊a標籤索引
  const idx = ref(null);

  //  新增目前點擊-檔案/樣式
  const toggleInfo = (item, index) => {
    idx.value = null;
    nextTick(() => {
      idx.value = index;
      store.dispatch("handInfoData", { data: item, isShow: true });
    });
  };

  return { toggleInfo, idx };
};
