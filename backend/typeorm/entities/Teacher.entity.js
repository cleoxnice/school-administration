const { EntitySchema } = require("typeorm");
const { baseEntity } = require("./base.entity");

const TeacherEntity = new EntitySchema({
  name: "Teacher",
  tableName: "TEACHER",
  columns: {
    ...baseEntity,
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
      select: false,
    },
    name: {
      type: String,
      unique: true,
      nullable: false,
    },
    subject: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    contactNumber: {
      type: String,
      nullable: false,
      unique: true,
    },
    formClassId: {
      type: "uuid",
      nullable: true,
      unique: true,
    },
  },
  relations: {
    formClass: {
      type: "one-to-one",
      target: "Class",
      inverseSide: "formTeacher",
      joinColumn: {
        name: "formClassId",
        referencedColumnName: "id",
      },
    },
  },
});

module.exports = { TeacherEntity };
