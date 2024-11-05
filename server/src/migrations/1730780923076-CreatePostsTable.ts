import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostsTable1730780923076 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "userId",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "tags",
                        type: "jsonb",
                        isNullable: true,
                        default: "[]",
                    },
                    {
                        name: "avatars",
                        type: "jsonb",
                        isNullable: true,
                        default: "[]",
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

        // Add foreign key constraint
        await queryRunner.createForeignKey(
            "posts",
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
            CREATE TRIGGER update_posts_updated_at
                BEFORE UPDATE ON posts
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        `);

        // Insert sample data
        await queryRunner.query(`
            INSERT INTO posts (user_id, title, content, tags, avatars, likes_count) VALUES
            (1, 'First Post', 'Content of first post', '["tag1", "tag2"]', '["avatar1.jpg"]', 0),
            (1, 'Second Post', 'Content of second post', '["tag3"]', '["avatar2.jpg"]', 0),
            (2, 'Hello World', 'Content of third post', '["tag1", "tag4"]', '[]', 0);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger first
        await queryRunner.query('DROP TRIGGER IF EXISTS update_posts_updated_at ON posts');
        await queryRunner.query('DROP FUNCTION IF EXISTS update_updated_at_column');
        
        // Drop table (this will automatically drop the foreign key constraint)
        await queryRunner.dropTable("posts", true);
    }
}