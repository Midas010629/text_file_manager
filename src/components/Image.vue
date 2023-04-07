<script>
import { reactive, onMounted, nextTick, watch } from "vue";

export default {
  name: "Image",
  props: {
    item: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const img = reactive({ type: "" });
    watch(
      () => props.item,
      () => {
        //
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
        //
      }
    );
    //
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
    //
    return { img };
  },
};
</script>
<template>
  <i :class="img.type"></i>
</template>

<style lang="scss" scoped></style>
