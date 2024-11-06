import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserCommentLikesTable1730780942541 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_comment_likes",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "comment_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                indices: [
                    {
                        name: "PRIMARY",
                        columnNames: ["user_id", "comment_id"],
                        isUnique: true,
                    },
                ],
            }),
            true
        );

        // Add foreign keys
        await queryRunner.createForeignKey(
            "user_comment_likes",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "user_comment_likes",
            new TableForeignKey({
                columnNames: ["comment_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "comments",
                onDelete: "CASCADE",
            })
        );

        // Update likes count in comments table
        // await queryRunner.query(`
        //     UPDATE comments c 
        //     SET likes_count = (
        //         SELECT COUNT(*) 
        //         FROM user_comment_likes 
        //         WHERE comment_id = c.id
        //     )
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first
        const table = await queryRunner.getTable("user_comment_likes");
        const foreignKeys = table?.foreignKeys || [];
        
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey("user_comment_likes", foreignKey);
        }

        // Drop table
        await queryRunner.dropTable("user_comment_likes", true);
    }
}