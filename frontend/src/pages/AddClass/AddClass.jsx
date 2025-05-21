import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUnassignedTeachersQuery } from "../../api/teacherApi";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useCreateClass } from "../../api/classApi";
import { joiResolver } from "@hookform/resolvers/joi";
import { levels } from "../../constants/data";
import React from "react";
import classSchema from "./AddClassValidation";
import { useFormData } from "../../context/FormContext";
import { isEqual } from "lodash";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import FormDropDown from "../../components/Form/FormDropDown/FormDropDown";
import FormTextField from "../../components/Form/FormTextField/FormTextField";
import { usePagesActionsStore } from "../../store/pages";
import "./_add-class.scss";

const AddClass = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { setPreviousPage } = usePagesActionsStore();
  const methods = useForm({
    defaultValues: formData || {},
    resolver: joiResolver(classSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = methods;
  const { data: unassignedTeachers, isLoading } = useUnassignedTeachersQuery({
    select: (data) => {
      return data.map((teacher) => ({
        teacherEmail: teacher.email,
        name: teacher.name,
      }));
    },
  });
  const { mutate: postClass } = useCreateClass();
  const onSubmit = (data) => {
    if (isEqual(errors, {})) {
      postClass(data);
      setFormData({});
      navigate("/classes");
    }
  };

  if (isLoading) return <CircularProgress />;

  const backToRecords = () => {
    setFormData({});
    navigate("/classes");
  };

  const emptyListDropDown = (
    <MenuItem
      key="empty"
      value="empty"
      className="add-class__empty-teacher-list"
    >
      <Box>
        <Typography>No existing teachers.</Typography>
        <Button
          className="add-class__add-teacher-button"
          onClick={() => {
            setFormData(getValues());
            setPreviousPage("/classes/new");
            navigate("/teachers/new");
          }}
        >
          Add a teacher
        </Button>
      </Box>
    </MenuItem>
  );

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Add Class
        </Typography>
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} sx={{ p: 4 }} className="add-class__form">
            <FormDropDown
              label="Class Level"
              error={!!errors.level}
              options={levels.map((level) => ({
                key: level,
                display: level,
              }))}
              helperText={errors.level?.message}
              defaultValue={formData?.level ?? "Select a level"}
              registerName="level"
              setValue={setValue}
              placeholder="Select a level"
            />
            <FormTextField
              label="Class Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Class Name"
              registerName="name"
            />
            <FormDropDown
              label="Form Teacher"
              error={!!errors.teacherEmail}
              options={unassignedTeachers.map(({ teacherEmail, name }) => ({
                key: teacherEmail,
                display: name,
              }))}
              helperText={errors.teacherEmail?.message}
              placeholder="Assign a form teacher"
              registerName="teacherEmail"
              customEmptyList={emptyListDropDown}
              defaultValue="Assign a form teacher"
            />
          </Paper>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
              gap: "16px",
            }}
          >
            <BackButton disabled={isLoading} onClick={backToRecords} />
            <SubmitButton disabled={isLoading} buttonName="Add Class" />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddClass;
