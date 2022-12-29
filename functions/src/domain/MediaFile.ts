
export class MediaFile {

    order: Number

    description: String

    name: String

    storage: String

    createdAt: Date

    constructor(order: Number, description: String, name: String, storage: String, createdAt: Date) {
        this.createdAt = createdAt
        this.storage = storage
        this.name = name
        this.description = description
        this.order = order
    }

}