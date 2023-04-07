<script>
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import Image from "./Image.vue";
import { useStore } from "vuex";

export default {
  name: "InfoBar",
  components: {
    Image,
  },

  setup() {
    const store = useStore();

    const infoData = computed(() => {
      return store.getters.infoData.data;
    });

    const closeBar = () => {
      store.dispatch("handInfoData", { isShow: false });
    };

    onMounted(() => {});
    return { infoData, closeBar };
  },
};
</script>
<template>
  <aside class="d-flex ml-6">
    <div class="card">
      <button
        class="card__btn btn--secondary mt-2 ml-2"
        @click.prevent.stop="closeBar"
      >
        <i class="fa-regular fa-circle-xmark"></i>
      </button>

      <div class="card__title d-flex flex-column align-items-center">
        <Image :item="infoData.fileExtension" style="font-size: 150px" />
        <h3 class="h3 pt-4 pb-4" v-show="infoData.fileExtension != 'folder'">
          檔案詳細內容
        </h3>
        <h3 class="h3 pt-4 pb-4" v-show="infoData.fileExtension === 'folder'">
          資料夾詳細內容
        </h3>
      </div>
      <div class="card__content ml-4">
        <p>名稱: {{ infoData.fileName }}</p>
        <p>大小: {{ infoData.fileSize }}</p>
        <p>產生日期: {{ infoData.createdDate }}</p>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;

  &__btn {
    i {
      font-size: 25px;
    }
  }
  &__title {
    border-bottom: 1px solid gray;
  }
  &__content {
    p {
      line-height: 40px;
    }
  }
}
</style>
