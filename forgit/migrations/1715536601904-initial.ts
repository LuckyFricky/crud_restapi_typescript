import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1715536601904 implements MigrationInterface {
    name = 'Initial1715536601904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, "camera" character varying NOT NULL, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adms" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_b2ba7d68ad6915398a8d98d618a" UNIQUE ("fullname"), CONSTRAINT "PK_d44a274a5cc87c565f3d4de3b79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_photo" ("photo_id" integer NOT NULL, "client_id" integer NOT NULL, CONSTRAINT "PK_da4a79111fb9b02e8dbb109506d" PRIMARY KEY ("photo_id", "client_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d55cabc2f0172e7828ad414764" ON "client_photo" ("photo_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b477c5feca225aa955f39d18bb" ON "client_photo" ("client_id") `);
        await queryRunner.query(`CREATE TABLE "clients_photo" ("client_id" integer NOT NULL, "photo_id" integer NOT NULL, CONSTRAINT "PK_d2d5491e2639cc49cd20da95c7e" PRIMARY KEY ("client_id", "photo_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b2bdaa69401c3d2493dad2005" ON "clients_photo" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bb83bb786c07152e1cf084076" ON "clients_photo" ("photo_id") `);
        await queryRunner.query(`CREATE TABLE "client_adm" ("client_id" integer NOT NULL, "adm_id" integer NOT NULL, CONSTRAINT "PK_29fe81808259a4b4836aa22c428" PRIMARY KEY ("client_id", "adm_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b568519708a6e0974b09976ac7" ON "client_adm" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e80078fd1cc9aaa8d29630d216" ON "client_adm" ("adm_id") `);
        await queryRunner.query(`ALTER TABLE "client_photo" ADD CONSTRAINT "FK_d55cabc2f0172e7828ad4147642" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_photo" ADD CONSTRAINT "FK_b477c5feca225aa955f39d18bb5" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients_photo" ADD CONSTRAINT "FK_7b2bdaa69401c3d2493dad20058" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients_photo" ADD CONSTRAINT "FK_2bb83bb786c07152e1cf0840768" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_adm" ADD CONSTRAINT "FK_b568519708a6e0974b09976ac7d" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_adm" ADD CONSTRAINT "FK_e80078fd1cc9aaa8d29630d2168" FOREIGN KEY ("adm_id") REFERENCES "adms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_adm" ADD CONSTRAINT "FK_e80078fd1cc9aaa8d29630d2168" FOREIGN KEY ("adm_id") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_adm" DROP CONSTRAINT "FK_e80078fd1cc9aaa8d29630d2168"`);
        await queryRunner.query(`ALTER TABLE "client_adm" DROP CONSTRAINT "FK_e80078fd1cc9aaa8d29630d2168"`);
        await queryRunner.query(`ALTER TABLE "client_adm" DROP CONSTRAINT "FK_b568519708a6e0974b09976ac7d"`);
        await queryRunner.query(`ALTER TABLE "clients_photo" DROP CONSTRAINT "FK_2bb83bb786c07152e1cf0840768"`);
        await queryRunner.query(`ALTER TABLE "clients_photo" DROP CONSTRAINT "FK_7b2bdaa69401c3d2493dad20058"`);
        await queryRunner.query(`ALTER TABLE "client_photo" DROP CONSTRAINT "FK_b477c5feca225aa955f39d18bb5"`);
        await queryRunner.query(`ALTER TABLE "client_photo" DROP CONSTRAINT "FK_d55cabc2f0172e7828ad4147642"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e80078fd1cc9aaa8d29630d216"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b568519708a6e0974b09976ac7"`);
        await queryRunner.query(`DROP TABLE "client_adm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bb83bb786c07152e1cf084076"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b2bdaa69401c3d2493dad2005"`);
        await queryRunner.query(`DROP TABLE "clients_photo"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b477c5feca225aa955f39d18bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d55cabc2f0172e7828ad414764"`);
        await queryRunner.query(`DROP TABLE "client_photo"`);
        await queryRunner.query(`DROP TABLE "adms"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
