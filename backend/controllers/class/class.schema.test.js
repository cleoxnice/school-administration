const { postClassSchema } = require("./class.schema");
const { levels } = require("../../utils/data");
const { postTeacherSchema } = require("../teacher/teacher.schema");

describe("Class Schema", () => {
  describe("postClassSchema", () => {
    describe("Mandatory data", () => {
      it("should pass schema validation when correct required validation fields are passed in", () => {
        const validClass = {
          name: "1A",
          level: "Primary 1",
          teacherEmail: "teachermary@gmail.com",
        };
        const { error, value } = postClassSchema.validate(validClass);
        expect(error).toBeUndefined();
        expect(value).toEqual(validClass);
      });
      it("should fail schema validation when name is missing", () => {
        const validClass = {
          level: "Primary 1",
          teacherEmail: "teachermary@gmail.com",
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"name" is required/);
      });
      it("should fail schema validation when level is missing", () => {
        const validClass = {
          name: "1A",
          teacherEmail: "teachermary@gmail.com",
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"level" is required/);
      });
      it("should fail schema validation when teacherEmail is missing", () => {
        const validClass = {
          name: "1A",
          level: "Primary 1",
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"teacherEmail" is required/);
      });
    });
    describe("Additonal data", () => {
      it("should fail schema validation when data is not a validation field", () => {
        const validClass = {
          name: "1A",
          level: "Primary 1",
          teacherEmail: "teachermary@gmail.com",
          subject: "Mathematics",
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"subject" is not allowed/);
      });
    });
    describe("Level validation field", () => {
      const formattedLevels = levels.map((level) => [level]);
      it.each(formattedLevels)(
        "should pass validation when %s is passed in",
        (level) => {
          const validClass = {
            name: "1A",
            level,
            teacherEmail: "teachermary@gmail.com",
          };
          const { error, value } = postClassSchema.validate(validClass);
          expect(error).toBeUndefined();
          expect(value).toEqual(validClass);
        },
      );
      const otherInvalidData = [
        ["an invalid string", "primary 1"],
        ["a number", 12231],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherInvalidData)(
        "should fail string validation when input is %s",
        (dataType, level) => {
          const validClass = {
            name: "1A",
            level,
            teacherEmail: "teachermary@gmail.com",
          };
          const { error } = postClassSchema.validate(validClass);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"level" must be one of [Primary 1, Primary 2, Primary 3, Primary 4, Primary 5, Primary 6]`,
          );
        },
      );
      it("should fail required validation when input is undefined", () => {
        const validClass = {
          name: "1A",
          level: undefined,
          teacherEmail: "teachermary@gmail.com",
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toEqual(`"level" is required`);
      });
    });
    describe("Name validation field", () => {
      it("should pass validation when a string is passed in", () => {
        const validClass = {
          name: "1A",
          level: "Primary 1",
          teacherEmail: "teachermary@gmail.com",
        };
        const { error, value } = postClassSchema.validate(validClass);
        expect(error).toBeUndefined();
        expect(value).toEqual(validClass);
      });
      const otherDataTypes = [
        ["a number", 12231],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherDataTypes)(
        "should fail string validation when input is %s",
        (dataType, name) => {
          const validClass = {
            name,
            level: "Primary 1",
            teacherEmail: "teachermary@gmail.com",
          };
          const { error } = postClassSchema.validate(validClass);
          expect(error).toBeDefined();
          expect(error.details[0].message).toMatch(/"name" must be a string/);
        },
      );
      const requiredString = [
        ["", `"name" is not allowed to be empty`],
        [undefined, `"name" is required`],
      ];
      it.each(requiredString)(
        "should fail required validation when input is %s",
        (name, errorMessage) => {
          const validClass = {
            name,
            level: "Primary 1",
            teacherEmail: "teachermary@gmail.com",
          };
          const { error } = postClassSchema.validate(validClass);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(errorMessage);
        },
      );
    });
    describe("TeacherEmail validation field", () => {
      const validEmails = [
        [
          "has at least one char before and after @, followed by a ., then another char",
          "a@b.c",
        ],
        [
          "has numbers or specific special characters in it",
          "a_%&!#^{}|'/?~`@xyz.c",
        ],
        [
          "has more than 1 word before and after @",
          "abc_def_ghi_jkl@mno.pqr.c",
        ],
      ];
      it.each(validEmails)(
        "should pass validation when teacherEmail %s",
        (message, teacherEmail) => {
          const validClass = {
            name: "Mary",
            level: "Primary 1",
            teacherEmail,
          };
          const { error, value } = postClassSchema.validate(validClass);
          expect(error).toBeUndefined();
          expect(value).toEqual(validClass);
        },
      );
      const invalidEmails = [
        ["has no . then char after @ then char", "a@b"],
        ["has no char after .", "a@b."],
        ["has no @", "ab.cd.ef"],
        ["has more than 1 @", "a@b@cd.ef"],
        ["contains a white space", "a c@b.com"],
        ["contains (", "a(c@b.com"],
        ["contains )", "a)c@b.com"],
        [`contains "`, `a"c@b.com`],
        ["contains [", "a[c@b.com"],
        ["contains ]", "a]c@b.com"],
        [`contains \\`, "a\\c@b.com"],
        ["contains ;", "a;c@b.com"],
        ["contains >", "a>c@b.com"],
        ["contains <", "a<c@b.com"],
        ["contains ,", "a,c@b.com"],
      ];
      it.each(invalidEmails)(
        "should fail teacherEmail validation when email %s",
        (message, teacherEmail) => {
          const validClass = {
            name: "Mary",
            level: "Primary 1",
            teacherEmail,
          };
          const { error } = postClassSchema.validate(validClass);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"teacherEmail" must be a valid email`,
          );
        },
      );
      const otherDataTypes = [
        ["a number", 12231],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherDataTypes)(
        "should fail string validation when input is %s",
        (dataType, teacherEmail) => {
          const validClass = {
            name: "Mary",
            level: "Primary 1",
            teacherEmail,
          };
          const { error } = postClassSchema.validate(validClass);
          expect(error).toBeDefined();
          expect(error.details[0].message).toMatch(
            /"teacherEmail" must be a string/,
          );
        },
      );
      it("should fail required validation when input is undefined", () => {
        const validClass = {
          name: "1A",
          level: "Primary 1",
          teacherEmail: undefined,
        };
        const { error } = postClassSchema.validate(validClass);
        expect(error).toBeDefined();
        expect(error.details[0].message).toEqual(`"teacherEmail" is required`);
      });
    });
  });
});
