import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { User } from './User'

import { v4 as uuid } from 'uuid'

@Entity('connections')
class Connection {
    @PrimaryColumn()
    id: string

    @Column()
    admin_id: string

    @Column()
    user_id: string

    @Column()
    socket_id: string

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor () {
      if (!this.id) {
        this.id = uuid()
      }
    }
}
export { Connection }
