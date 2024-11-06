import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostsTable1730780923076 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
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
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "avatars",
                        type: "json",
                        isNullable: true,
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

        // Add foreign key constraint
        await queryRunner.createForeignKey(
            "posts",
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
            CREATE TRIGGER update_posts_updated_at
            BEFORE UPDATE ON posts
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();  
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