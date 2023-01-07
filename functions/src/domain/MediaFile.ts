export class MediaFile {

    id: string

    order: number

    description: string

    name: string

    storage: string

    createdAt: Date

    constructor(id: string, order: number, description: string, name: string, storage: string, createdAt: Date) {
        this.id = id
        this.createdAt = createdAt
        this.storage = storage
        this.name = name
        this.description = description
        this.order = order
    }

}