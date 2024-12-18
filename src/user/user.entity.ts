import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column()
  user_id: string;
  @Column()
  language: string;
  @Column()
  current_language: string;
  @Column()
  ip: string;
  @Column()
  ip_country_code: string;
  @Column()
  register_time: number;
  @Column({ type: 'text', array: true })
  user_category_ids: string[];
  @Column()
  is_deleted: boolean;
  @Column()
  create_time: number;
  @Column()
  recent_view_time: number;
  @Column()
  delete_time: number;
  @Column()
  device_id: string;
  @Column()
  bind_type: string;
  @Column()
  bind_id: string;
  @Column({ type: 'jsonb' })
  bind_info: any;
  @Column()
  nickname: string;
  @Column()
  avatar: string;
  @Column()
  device_brand: string;
  @Column()
  device_model: string;
  @Column()
  os: string;
  @Column()
  os_version: string;
  @Column()
  client_version: string;
  @Column()
  carrier: string;
  @Column()
  mac: string;
  @Column()
  imei: string;
  @Column()
  time_zone: string;
  @Column()
  app_id: string;
  @Column()
  install_time: number;
  @Column()
  origin_language: string;
  @Column()
  android_id: string;
  @Column()
  ga_id: string;
  @Column()
  simulator: boolean;
  @Column()
  firebase_token: string;
  @Column()
  gender: string;
  @Column()
  height: number;
  @Column()
  weight: number;
  @Column()
  dob: string;
  @Column()
  workout_amount: string;
  @Column()
  is_metric: boolean;
  @Column()
  goal_offset: number;
  @Column()
  goal_rate: number;
  @Column()
  calories: number;
  @Column()
  carbs: number;
  @Column()
  fats: number;
  @Column()
  protein: number;
  @Column()
  health_score: number;
}
