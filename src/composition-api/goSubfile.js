import { useStore } from "vuex";
import { useRouter } from "vue-router";
export const goSubfile = (file) => {
  const router = useRouter();
  const store = useStore();

  const Subfile = (file) => {
    if (file.fileExtension === "folder") {
      store.dispatch("handChildren", file.children);
      router.push({ path: `${file.filePath}` });
    }
  };

  return { Subfile };
};
