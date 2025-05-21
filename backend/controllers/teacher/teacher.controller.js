const { dataSource } = require("../../data-source");
const { postTeacherSchema } = require("./teacher.schema");
const { IsNull } = require("typeorm");

const getAllTeachers = async (req, res, next) => {
  try {
    const teacherRepo = dataSource.getRepository("Teacher");
    const teachers = await teacherRepo.find({
      select: {
        name: true,
        subject: true,
        email: true,
        contactNumber: true,
      },
      order: { name: "ASC" },
    });
    res.status(200).json(teachers);
  } catch (err) {
    next(err);
  }
};

const getUnassignedTeachers = async (req, res, next) => {
  try {
    const teacherRepo = dataSource.getRepository("Teacher");
    const teachers = await teacherRepo.find({
      where: { formClassId: IsNull() },
      relation: { formClass: true },
      order: { name: "ASC" },
    });
    res.status(200).json(teachers);
  } catch (err) {
    next(err);
  }
};

const createTeacher = async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = postTeacherSchema.validate(body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const teacherRepo = dataSource.getRepository("Teacher");
    await teacherRepo.save({
      ...body,
      contactNumber: body.contactNumber.trim(),
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTeachers,
  createTeacher,
  getUnassignedTeachers,
};
