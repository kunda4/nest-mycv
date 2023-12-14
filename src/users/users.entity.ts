import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string

    @AfterInsert()
    logInsert(){
        console.log('the user is inserted with id', this.id)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('the user is updated with id', this.id)
    }
    @AfterRemove()
    logDelete(){
        console.log('the user is deleted with id', this.id)
    }

}