export class MediaFile {

    id: String

    order: Number

    description: String

    name: String

    storage: String

    createdAt: Date

    constructor(id: String, order: Number, description: String, name: String, storage: String, createdAt: Date) {
        this.id = id
        this.createdAt = createdAt
        this.storage = storage
        this.name = name
        this.description = description
        this.order = order
    }

}