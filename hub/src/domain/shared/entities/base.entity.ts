import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Abstract entity with generic fields
 */
export abstract class ApplicationEntity extends BaseEntity {
	@CreateDateColumn({ name: "created_at", comment: "Created date" })
	createdAt!: Date;

	@UpdateDateColumn({ name: "updated_at", comment: "Updated date" })
	updatedAt!: Date;
}
