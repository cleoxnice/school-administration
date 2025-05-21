import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const usePagesNavigationStore = createWithEqualityFn(
  (set, get) => ({
    previousPage: undefined,
    currentPage: undefined,
    actions: {
      setPreviousPage: (navigationPage) => {
        if (navigationPage) {
          set({ previousPage: navigationPage });
        }
      },
      setCurrentPage: (currentNavigationPage) => {
        if (currentNavigationPage) {
          set({
            previousPage: get().currentPage,
            currentPage: currentNavigationPage,
          });
        }
      },
    },
  }),
  shallow,
);

export const usePagesStore = () =>
  usePagesNavigationStore((state) => ({
    previousPage: state.previousPage,
    currentPage: state.currentPage,
  }));
export const usePagesActionsStore = () =>
  usePagesNavigationStore((state) => state.actions);
