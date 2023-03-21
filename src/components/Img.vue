<script>
export default {
  name: "Img",
  props: {
    item: {
      type: String,
    },
    size: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>
<template>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-sharp fa-regular fa-folder"
    v-show="props.item === 'folder'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-sharp fa-regular fa-file-powerpoint"
    v-show="props.item === 'pptx'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-regular fa-file-image"
    v-show="props.item === 'jpg'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-regular fa-file"
    v-show="props.item === 'docx'"
  ></i>
</template>

<style lang="scss" scoped></style>
