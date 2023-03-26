<script>
import { computed, onMounted, reactive, watch } from "vue";
import Img from "./Img.vue";
import { useStore } from "vuex";

export default {
  name: "InfoBar",
  components: {
    Img,
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
  <div class="card">
    <div class="card-item">
      <a href="javascript:;" @click.prevent.stop="closeBar">
        <i class="fa-regular fa-circle-xmark"></i>
      </a>
      <div class="img">
        <Img :item="infoData.fileExtension" :size="150" />
        <h2 v-show="infoData.fileExtension != 'folder'">檔案詳細內容</h2>
        <h2 v-show="infoData.fileExtension === 'folder'">資料夾詳細內容</h2>
      </div>
      <div class="content">
        <p>名稱: {{ infoData.fileName }}</p>
        <p>路徑: {{ infoData.filePath }}</p>
        <p>大小: {{ infoData.fileSize }}</p>
        <p>產生日期: {{ infoData.createdDate }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: end;
  height: 100%;
  padding: 1rem;
  .card-item {
    width: 90%;
    border-radius: 10px;
    background-color: #e5e5e5;
    a {
      display: block;
      margin: 1rem 0 0 1rem;
      i {
        font-size: 25px;
      }
    }

    .img {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid gray;

      h2 {
        padding: 1rem 0;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      p {
        padding: 0.5rem 0 0 1rem;
      }
    }
  }
}
</style>
