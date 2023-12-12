import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ReportsEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    price: number

}