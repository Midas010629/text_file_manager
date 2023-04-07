import { useStore } from "vuex";
import { useRouter } from "vue-router";
export const goSubfile = (file) => {
  const router = useRouter();
  const store = useStore();

  const Subfile = (file) => {
    if (file.fileExtension === "folder") {
      router.push({ path: `${file.filePath}` });
      store.dispatch("handSearchData", { isShow: false });
    }
  };

  return { Subfile };
};
