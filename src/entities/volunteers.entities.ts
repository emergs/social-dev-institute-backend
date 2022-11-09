import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer"
import VolunteerCampaigns from "./volunteerCampaigns.entities";

@Entity()
class Volunteers {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 50 })
  name: string

  @Column({ length: 11 })
  cpf: string

  @Column({ length: 60 })
  email: string

  @Column({ length: 3 })
  age: string

  @Column({ length: 11 })
  telephone: string

  @Column({ length: 60 })
  @Exclude()
  password: string

  @OneToMany(() => VolunteerCampaigns, voCam => voCam.volunteer_id)
  volunteerCampaigns: VolunteerCampaigns[]
}

export default Volunteers