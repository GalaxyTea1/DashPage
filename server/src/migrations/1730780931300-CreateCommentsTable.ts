import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentsTable1730780931300 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "post_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "is_anonymous",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "likes_count",
                        type: "integer",
                        default: 0,
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
                    },
                ],
            }),
            true
        );

        // Add foreign key constraints
        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["post_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "posts",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        // Create trigger for automatic updatedAt timestamp
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_comments_updated_at
                BEFORE UPDATE ON comments
                FOR EACH ROW
                EXECUTE PROCEDURE update_updated_at_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger first
        await queryRunner.query('DROP TRIGGER IF EXISTS update_comments_updated_at ON comments');
        
        // Don't drop the function here as it might be used by other tables
        // Only drop it if this is the last table using it
        
        // Drop table (this will automatically drop the foreign key constraints)
        await queryRunner.dropTable("comments", true);
    }
}