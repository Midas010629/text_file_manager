<script>
import { onMounted, reactive } from "vue";
import Img from "./Img.vue";

export default {
  name: "Info",
  components: {
    Img,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const file = reactive({ data: {} });

    onMounted(() => {
      file.data = props.item;
    });
    return { file };
  },
};
</script>
<template>
  <div class="card">
    <div class="card-item">
      <div class="img">
        <Img :item="file.data.fileExtension" :size="100" />
        <h2 v-show="file.data.fileExtension != 'folder'">檔案詳細內容</h2>
        <h2 v-show="file.data.fileExtension === 'folder'">資料夾詳細內容</h2>
      </div>

      <div class="aaa">
        <p>名稱: {{ file.data.fileName }}</p>
        <p>路徑: {{ file.data.filePath }}</p>
        <p>大小: {{ file.data.fileSize }}</p>
        <p>產生日期: {{ file.data.createdDate }}</p>
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
    .img {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid gray;
    }

    .aaa {
      display: flex;
      flex-direction: column;
      p {
        padding: 0.5rem 0 0 1rem;
      }
    }
  }
  /* width: 90%;
  height: 100%; */
}
</style>
