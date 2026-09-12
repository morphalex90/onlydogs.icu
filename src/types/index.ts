export interface Cat {
    id: string
    url: string
    name: string
    height: number
    width: number
}

export interface DogImage {
    id: string
    url: string
    width: number
    height: number
    breeds?: BreedType[]
}

export interface Category {
    id: number
    name: string
}

export interface BreedType {
    id: string | number
    name: string
    temperament?: string
    life_span?: string
    bred_for?: string
    breed_group?: string
    origin?: string
    weight?: { imperial?: string; metric?: string }
    height?: { imperial?: string; metric?: string }
    reference_image_id?: string
}
