import { Column, CreateDateColumn, PrimaryColumn, Entity } from "typeorm"
import {v4 as uuuidV4} from "uuid"


@Entity("cars_image")
class CarImage {

@PrimaryColumn()
 id: string

 @Column()
 car_id: string

 @Column()
 image_name: string

 @CreateDateColumn()
 created_at: Date

 constructor() {
  if (!this.id) {
    this.id = uuuidV4()
  }
 }

}


export {CarImage}