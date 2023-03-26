<script>
import { reactive, onMounted, nextTick } from "vue";

export default {
  name: "Img",
  props: {
    item: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const img = reactive({ type: "", size: "" });
    onMounted(() => {
      img.size = props.size;
      if (props.item === "folder") {
        img.type = "fa-sharp fa-regular fa-folder";
      }
      if (props.item === "pptx") {
        img.type = "fa-sharp fa-regular fa-file-powerpoint";
      }
      if (props.item === "jpg") {
        img.type = "fa-regular fa-file-image";
      }
      if (props.item === "docx") {
        img.type = "fa-regular fa-file";
      }
    });
    return { img };
  },
};
</script>
<template>
  <i :style="{ fontSize: img.size + 'px' }" :class="img.type"></i>
</template>

<style lang="scss" scoped></style>
