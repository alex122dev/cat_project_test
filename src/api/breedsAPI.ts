import { instance } from "./api"

export type BreedType = {
    id: string
    name: string
    description: string
    temperament: string
    origin: string
    weight: {
        imperial: string
        metric: string
    }
    life_span: string
    image: {
        id: string
        url: string
        height: number
        width: number
    },
}

export type SearchNameBreedType = {
    id: string
    name: string
    description: string
    temperament: string
    origin: string
    weight: {
        imperial: string
        metric: string
    }
    life_span: string
}


export const breedsAPI = {
    getAllBreeds() {
        return instance.get<BreedType[]>('breeds').then(res => res.data)
    },
    getBreedsByName(breedName: string) { //* don't use in search becouse server response breeds without image
        return instance.get<SearchNameBreedType[]>(`breeds/search?q=${breedName}`).then(res => res.data)
    }
}