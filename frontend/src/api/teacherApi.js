import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "./api";
import { SnackbarContext } from "../context/SnackBarContext";
import { useContext } from "react";

const teachersQueryKey = ["teachers"];

export const useTeachersRecordQuery = (option) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return useQuery({
    queryKey: teachersQueryKey,
    queryFn: async () => {
      const res = await api.get("/teachers");
      return res.data;
    },
    onError: (error) => {
      showSnackbar(
        `Error: ${error.response?.data?.message}` ||
          "Failed to retrieve teachers",
        "error",
      );
    },
    ...option,
  });
};

export const useUnassignedTeachersQuery = (option) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return useQuery({
    queryKey: teachersQueryKey,
    queryFn: async () => {
      const res = await api.get("/teachers/unassigned");
      return res.data;
    },
    onError: (error) => {
      showSnackbar(
        `Error: ${error.response?.data?.message}` ||
          "Failed to retrieve unassigned teachers",
        "error",
      );
    },
    ...option,
  });
};

export const useCreateTeacher = (option) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useContext(SnackbarContext);
  return useMutation({
    mutationFn: async (data) => {
      return api.post("/teachers", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(teachersQueryKey);
      showSnackbar("Teacher added successfully!", "success");
    },
    onError: (error) => {
      showSnackbar(
        `Error: ${error.response?.data?.message}` || "Failed to add teacher",
        "error",
      );
    },
    ...option,
  });
};
