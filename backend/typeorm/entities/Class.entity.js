const { EntitySchema } = require("typeorm");
const { baseEntity } = require("./base.entity");

const ClassEntity = new EntitySchema({
  name: "Class",
  tableName: "CLASS",
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
    level: {
      type: String,
      nullable: false,
    },
    formTeacherId: {
      type: String,
      nullable: false,
      unique: true,
    },
  },
  relations: {
    formTeacher: {
      type: "one-to-one",
      target: "Teacher",
      inverseSide: "formClass",
      joinColumn: {
        name: "formTeacherId",
        referencedColumnName: "id",
      },
    },
  },
});

module.exports = { ClassEntity };
