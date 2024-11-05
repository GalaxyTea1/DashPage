import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentsTable1730780931300 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "postId",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "isAnonymous",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "likesCount",
                        type: "integer",
                        default: 0,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
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
                columnNames: ["postId"],
                referencedColumnNames: ["id"],
                referencedTableName: "posts",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "comments",
            new TableForeignKey({
                columnNames: ["userId"],
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
                EXECUTE FUNCTION update_updated_at_column();
        `);

        // Insert sample data
        await queryRunner.query(`
            INSERT INTO comments (post_id, user_id, content, is_anonymous, likes_count) VALUES
            (1, 2, 'Great post!', false, 0),
            (1, 3, 'Thanks for sharing', true, 0),
            (2, 1, 'Interesting topic', false, 0);
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