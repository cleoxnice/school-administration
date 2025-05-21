const { postTeacherSchema } = require("./teacher.schema");
const { subjects } = require("../../utils/data");

describe("Teacher Schema", () => {
  describe("postTeacherSchema", () => {
    describe("Mandatory data", () => {
      it("should pass schema validation when correct required validation fields are passed in", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
        };
        const { error, value } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeUndefined();
        expect(value).toEqual(validTeacher);
      });
      it("should fail schema validation when name is missing", () => {
        const validTeacher = {
          subject: "Mathematics",
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"name" is required/);
      });
      it("should fail schema validation when subject is missing", () => {
        const validTeacher = {
          name: "Mary",
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"subject" is required/);
      });
      it("should fail schema validation when email is missing", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          contactNumber: "68129414",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"email" is required/);
      });
      it("should fail schema validation when contactNumber is missing", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: "teachermary@gmail.com",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"contactNumber" is required/);
      });
    });
    describe("Additonal data", () => {
      it("should fail schema validation when data is not a validation field", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
          class: "1234",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toMatch(/"class" is not allowed/);
      });
    });
    describe("Name validation field", () => {
      it("should pass validation when a string is passed in", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
        };
        const { error, value } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeUndefined();
        expect(value).toEqual(validTeacher);
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
          const validTeacher = {
            name,
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber: "68129414",
          };
          const { error } = postTeacherSchema.validate(validTeacher);
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
          const validTeacher = {
            name,
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber: "68129414",
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(errorMessage);
        },
      );
    });
    describe("Subject validation field", () => {
      const formattedSubjects = subjects.map((subject) => [subject]);
      it.each(formattedSubjects)(
        "should pass validation when %s is passed in",
        (subject) => {
          const validTeacher = {
            name: "Mary",
            subject,
            email: "teachermary@gmail.com",
            contactNumber: "68129414",
          };
          const { error, value } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeUndefined();
          expect(value).toEqual(validTeacher);
        },
      );
      const otherInvalidData = [
        ["an invalid string", "English language"],
        ["a number", 12231],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherInvalidData)(
        "should fail string validation when input is %s",
        (dataType, subject) => {
          const validTeacher = {
            name: "Mary",
            subject,
            email: "teachermary@gmail.com",
            contactNumber: "68129414",
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"subject" must be one of [English Language, Mother Tongue Language, Mathematics, Science, Art, Music, Physical Education, Social Studies, Character and Citizenship Education]`,
          );
        },
      );
      it("should fail required validation when input is undefined", () => {
        const validTeacher = {
          name: "Mary",
          subject: undefined,
          email: "teachermary@gmail.com",
          contactNumber: "68129414",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toEqual(`"subject" is required`);
      });
    });
    describe("Email validation field", () => {
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
        "should pass validation when email %s",
        (message, email) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email,
            contactNumber: "68129414",
          };
          const { error, value } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeUndefined();
          expect(value).toEqual(validTeacher);
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
        "should fail email validation when email %s",
        (message, email) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email,
            contactNumber: "68129414",
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"email" must be a valid email`,
          );
        },
      );
      const otherInvalidData = [
        ["a number", 12231],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherInvalidData)(
        "should fail string validation when input is %s",
        (dataType, email) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email,
            contactNumber: "68129414",
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(`"email" must be a string`);
        },
      );
      it("should fail required validation when input is undefined", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: undefined,
          contactNumber: "68129414",
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toEqual(`"email" is required`);
      });
    });
    describe("contactNumber validation field", () => {
      const validContactNumbers = [
        ["starts with 6", "61234567"],
        ["starts with 8", "81234567"],
        ["starts with 9", "91234567"],
        [
          "has white spaces in it, starts with the valid numbers",
          "6  1 23456   7",
          "61234567",
        ],
      ];
      it.each(validContactNumbers)(
        "should pass validation when contactNumber %s and has exactly 8 numbers",
        (message, contactNumber, expectedContactNumber = undefined) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber,
          };
          const expected = {
            name: "Mary",
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber: expectedContactNumber || contactNumber,
          };
          const { error, value } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeUndefined();
          expect(value).toEqual(expected);
        },
      );
      const invalidContactNumbers = [
        ["starts with 0", "01234567"],
        ["starts with 1", "11234567"],
        ["starts with 2", "21234567"],
        ["starts with 3", "31234567"],
        ["starts with 4", "41234567"],
        ["starts with 5", "51234567"],
        ["starts with 7", "71234567"],
        ["has less than 8 numbers", "6123 456"],
        ["has more than 8 numbers", "6123 4567 8"],
      ];
      it.each(invalidContactNumbers)(
        "should fail custom validation when contactNumber %s",
        (message, contactNumber) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber,
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"contactNumber" contains an invalid value`,
          );
        },
      );
      const otherInvalidData = [
        ["a number", 61234567],
        ["an array", []],
        ["an object", {}],
        ["a date", new Date()],
        ["a boolean", false],
        ["null", null],
      ];
      it.each(otherInvalidData)(
        "should fail custom string validation when input is %s",
        (dataType, contactNumber) => {
          const validTeacher = {
            name: "Mary",
            subject: "Mathematics",
            email: "teachermary@gmail.com",
            contactNumber,
          };
          const { error } = postTeacherSchema.validate(validTeacher);
          expect(error).toBeDefined();
          expect(error.details[0].message).toEqual(
            `"contactNumber" must be a string`,
          );
        },
      );
      it("should fail required validation when input is undefined", () => {
        const validTeacher = {
          name: "Mary",
          subject: "Mathematics",
          email: "teachermary@gmail.com",
          contactNumber: undefined,
        };
        const { error } = postTeacherSchema.validate(validTeacher);
        expect(error).toBeDefined();
        expect(error.details[0].message).toEqual(`"contactNumber" is required`);
      });
    });
  });
});
