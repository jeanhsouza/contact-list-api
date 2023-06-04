import { getRounds, hashSync } from "bcryptjs";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Contact } from "./contacts.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 45 })
	name: string;

	@Column({ type: "varchar", length: 45, unique: true })
	email: string;

	@Column({ type: "varchar", length: 120 })
	password: string;

	@CreateDateColumn({ type: "date" })
	createdAt: string;

	@UpdateDateColumn({ type: "date" })
	updatedAt: string;

	@DeleteDateColumn({ type: "date" })
	deletedAt: string;

	@OneToMany(
		() => Contact,
		(Contact) => Contact.user
	)
	contacts: Contact[];

	@BeforeInsert()
	@BeforeUpdate()
	passwordHash() {
		const isEncrypted = getRounds(this.password);
		if (!isEncrypted) {
			this.password = hashSync(this.password, 10);
		}
	}
}
