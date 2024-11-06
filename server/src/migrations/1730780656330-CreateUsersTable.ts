import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1730780656330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "display_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "avatar_url",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "reset_password_token",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "reset_password_expires",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
