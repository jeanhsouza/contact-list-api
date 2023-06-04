import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity("contacts")
export class Contact {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 45 })
	name: string;

	@Column({ type: "varchar", length: 45})
	email: string;

    @Column({ type: "varchar", length: 45})
	fone: string;

	@ManyToOne(() => User)
	user: User;
}
