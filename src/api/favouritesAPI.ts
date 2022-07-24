import { instance } from "./api"

export type SaveFavouritesType = {
    image_id: string
    sub_id?: string
}

type SaveFavouritesRequestType = {
    message: string,
    id: string | number
}

export type FavouritesType = {
    id: number | string,
    user_id: string,
    image_id: string,
    sub_id: string,
    created_at: Date,
    image: {
        id: string,
        url: string
    }
}


export const favouritesAPI = {
    getFavourites() {
        return instance.get<FavouritesType[]>('favourites').then(res => res.data)
    },
    saveToFavourites(data: SaveFavouritesType) {
        return instance.post<SaveFavouritesRequestType>('favourites', data).then(res => res.data)
    },
    deleteFromFavourites(id: string | number) {
        return instance.delete(`favourites/${id}`).then(res => res.data)
    }
}