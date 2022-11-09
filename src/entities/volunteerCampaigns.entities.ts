import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Campaigns } from "./campaign.entities";
import Volunteers from "./volunteers.entities";

@Entity()
class VolunteerCampaigns {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createAt: Date

  @ManyToOne(() => Volunteers, { eager: true })
  @JoinColumn()
  volunteer_id: Volunteers

  @ManyToOne(() => Campaigns, { eager: true })
  @JoinColumn()
  campaigns_id: Campaigns
}

export default VolunteerCampaigns