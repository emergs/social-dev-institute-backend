import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Address } from './address.entities'

@Entity("campaigns")
export class Campaigns {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @OneToMany(() => Address, address => address.campaigns)
    address: Address[]
}