const { postClassSchema } = require("./class.schema");
const { dataSource } = require("../../data-source");

const getAllClasses = async (req, res, next) => {
  try {
    const ClassRepo = dataSource.getRepository("Class");
    const Classes = await ClassRepo.find({
      select: {
        level: true,
        name: true,
        formTeacher: {
          name: true,
        },
      },
      order: { level: "ASC", name: "ASC" },
      relations: { formTeacher: true },
    });
    res.status(200).json(Classes);
  } catch (err) {
    next(err);
  }
};

const createClass = async (req, res, next) => {
  try {
    const { body } = req;
    const { name, teacherEmail, level } = body;
    const { error } = postClassSchema.validate(body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const TeacherRepo = dataSource.getRepository("Teacher");
    const teacherDetails = await TeacherRepo.findOne({
      where: { email: teacherEmail },
    });
    if (!teacherDetails) {
      return res
        .status(404)
        .json({ message: "Failed to find teacher's details." });
    }
    const ClassRepo = dataSource.getRepository("Class");
    const formattedData = { name, level, formTeacherId: teacherDetails.id };
    await ClassRepo.save(formattedData);
    const classDetails = await ClassRepo.findOne({ where: { name } });

    if (!classDetails) {
      return res.status(400).json({ message: "Failed to add class." });
    }
    await TeacherRepo.save({
      id: teacherDetails.id,
      formClassId: classDetails?.id,
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClasses,
  createClass,
};
