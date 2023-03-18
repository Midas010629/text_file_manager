<script>
export default {
  name: "Img",
  props: {
    item: {
      type: String,
    },
    size: {
      type: Number,
      default: 12,
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
    v-if="props.item === 'folder'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-sharp fa-regular fa-file-powerpoint"
    v-if="props.item === 'pptx'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-regular fa-file-image"
    v-if="props.item === 'jpg'"
  ></i>
  <i
    :style="{ fontSize: props.size + 'px' }"
    class="fa-regular fa-file"
    v-if="props.item === 'docx'"
  ></i>
</template>

<style scoped>
i {
  padding: 1rem;
}
</style>
