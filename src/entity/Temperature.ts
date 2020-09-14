import {Entity, PrimaryGeneratedColumn, Column,} from 'typeorm'
@Entity()
export class Temperature {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    staffId:string;
    @Column()
    name: string;//姓名
    @Column()
    date: string;//日期
    @Column()
    temperature: number;//体温
    @Column()
    department: string;//部门
    @Column()
    area: string;//地区
    @Column()
    IsUpload: boolean;//是否上传
}