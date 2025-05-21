/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AutoMigration1747750586637 {
    name = 'AutoMigration1747750586637'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "TEACHER" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subject" character varying NOT NULL, "email" character varying NOT NULL, "contactNumber" character varying NOT NULL, "formClassId" uuid, CONSTRAINT "UQ_0616c0cdd83d583002536abcbf3" UNIQUE ("name"), CONSTRAINT "UQ_414abf2355eb9d89455de61ca3e" UNIQUE ("email"), CONSTRAINT "UQ_41a3851f3b6d21328ffa6788dd9" UNIQUE ("contactNumber"), CONSTRAINT "UQ_ae0d86a7b610c27268e85328492" UNIQUE ("formClassId"), CONSTRAINT "REL_ae0d86a7b610c27268e8532849" UNIQUE ("formClassId"), CONSTRAINT "PK_be811256ca65ff54733eeedd857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CLASS" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "level" character varying NOT NULL, "formTeacherId" uuid NOT NULL, CONSTRAINT "UQ_05cb8b8985f34dfd86c44fabe27" UNIQUE ("name"), CONSTRAINT "UQ_49f97c856bf4077a821ed56d133" UNIQUE ("formTeacherId"), CONSTRAINT "REL_49f97c856bf4077a821ed56d13" UNIQUE ("formTeacherId"), CONSTRAINT "PK_f7e171cf1a8b2d418f1fd182456" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "TEACHER" ADD CONSTRAINT "FK_ae0d86a7b610c27268e85328492" FOREIGN KEY ("formClassId") REFERENCES "CLASS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CLASS" ADD CONSTRAINT "FK_49f97c856bf4077a821ed56d133" FOREIGN KEY ("formTeacherId") REFERENCES "TEACHER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "CLASS" DROP CONSTRAINT "FK_49f97c856bf4077a821ed56d133"`);
        await queryRunner.query(`ALTER TABLE "TEACHER" DROP CONSTRAINT "FK_ae0d86a7b610c27268e85328492"`);
        await queryRunner.query(`DROP TABLE "CLASS"`);
        await queryRunner.query(`DROP TABLE "TEACHER"`);
    }
}
