import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { useCreateTeacher } from "../../api/teacherApi";
import { subjects } from "../../constants/data";
import teacherSchema from "./AddTeaacherValidation";
import FormTextField from "../../components/Form/FormTextField/FormTextField";
import FormDropDown from "../../components/Form/FormDropDown/FormDropDown";
import "./_add-teacher.scss";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import SubmitButton from "../../components/Buttons/SubmitButton/SubmitButton";
import { isEqual } from "lodash";
import { Box, Typography, Paper } from "@mui/material";
import { usePagesActionsStore, usePagesStore } from "../../store/pages";

const AddTeacher = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: joiResolver(teacherSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { mutate: postTeacher, isLoading } = useCreateTeacher();
  const { previousPage } = usePagesStore();
  const { setPreviousPage } = usePagesActionsStore();

  const navigateToCorrectPage = () => {
    if (previousPage) {
      navigate(previousPage);
      setPreviousPage("/teachers/new");
    } else {
      navigate("/teachers");
    }
  };

  const onSubmit = (data) => {
    if (isEqual(errors, {})) {
      postTeacher(data);
      navigateToCorrectPage();
    }
  };

  const goBack = () => {
    navigateToCorrectPage();
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Add Teacher
        </Typography>
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={3} sx={{ p: 4 }} className="add-teacher__form">
            <FormTextField
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Name"
              registerName="name"
            />
            <FormDropDown
              label="Subject"
              error={!!errors.subject}
              options={subjects.map((subject) => ({
                key: subject,
                display: subject,
              }))}
              helperText={errors.subject?.message}
              placeholder="Select a subject"
              defaultValue="Select a subject"
              registerName="subject"
            />
            <FormTextField
              label="Email Address"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="Email address"
              registerName="email"
            />
            <FormTextField
              label="Work Contact Number"
              error={!!errors.contactNumber}
              helperText={errors.contactNumber?.message}
              placeholder="Work contact number"
              registerName="contactNumber"
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
            <BackButton disabled={isLoading} onClick={goBack} />
            <SubmitButton disabled={isLoading} buttonName="Add Teacher" />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddTeacher;
