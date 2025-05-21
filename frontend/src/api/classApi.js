import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "./api";
import { useContext } from "react";
import { SnackbarContext } from "../context/SnackBarContext";

const classesQueryKey = ["classes"];

export const useClassesRecordQuery = (option) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return useQuery({
    queryKey: classesQueryKey,
    queryFn: async () => {
      const res = await api.get("/classes");
      return res.data;
    },
    onError: (error) => {
      showSnackbar(
        `Error: ${error.response?.data?.message}` ||
          "Failed to retrieve classes",
        "error",
      );
    },
    ...option,
  });
};

export const useCreateClass = (option) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useContext(SnackbarContext);
  return useMutation({
    mutationFn: async (data) => {
      return api.post("/classes", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(classesQueryKey);
      showSnackbar("Class added successfully!", "success");
    },
    onError: (error) => {
      showSnackbar(
        `Error: ${error.response?.data?.message}` || "Failed to add class",
        "error",
      );
    },
    ...option,
  });
};
