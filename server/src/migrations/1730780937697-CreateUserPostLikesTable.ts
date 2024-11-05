import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserPostLikesTable1730780937697 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_post_likes",
                columns: [
                    {
                        name: "userId",
                        type: "integer",
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "postId",
                        type: "integer",
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
                indices: [
                    {
                        name: "idx_user_post_likes_post_id",
                        columnNames: ["postId"]
                    }
                ]
            }),
            true
        );

        // Add foreign key constraints
        await queryRunner.createForeignKey(
            "user_post_likes",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "user_post_likes",
            new TableForeignKey({
                columnNames: ["postId"],
                referencedColumnNames: ["id"],
                referencedTableName: "posts",
                onDelete: "CASCADE",
            })
        );

        // Create trigger to automatically update posts.likesCount
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_post_likes_count()
            RETURNS TRIGGER AS $$
            BEGIN
                IF (TG_OP = 'INSERT') THEN
                    UPDATE posts 
                    SET likes_count = likes_count + 1
                    WHERE id = NEW.post_id;
                    RETURN NEW;
                ELSIF (TG_OP = 'DELETE') THEN
                    UPDATE posts 
                    SET likes_count = likes_count - 1
                    WHERE id = OLD.post_id;
                    RETURN OLD;
                END IF;
                RETURN NULL;
            END;
            $$ language 'plpgsql';
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_post_likes_count_trigger
            AFTER INSERT OR DELETE ON user_post_likes
            FOR EACH ROW
            EXECUTE FUNCTION update_post_likes_count();
        `);

        // Insert sample data
        await queryRunner.query(`
            INSERT INTO user_post_likes (user_id, post_id) VALUES
            (2, 1),
            (3, 1),
            (1, 2);
        `);

        // Update initial likesCount in posts table
        await queryRunner.query(`
            UPDATE posts p 
            SET likes_count = (
                SELECT COUNT(*) 
                FROM user_post_likes 
                WHERE post_id = p.id
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger first
        await queryRunner.query('DROP TRIGGER IF EXISTS update_post_likes_count_trigger ON user_post_likes');
        await queryRunner.query('DROP FUNCTION IF EXISTS update_post_likes_count');
        
        // Drop table (this will automatically drop foreign keys)
        await queryRunner.dropTable("user_post_likes", true);
    }
}