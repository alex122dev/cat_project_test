import { instance } from "./api"


export type ImageType = {
    breeds: any[]
    height: number
    width: number
    id: string
    url: string
}


export const imagesAPI = {
    getRandomImage(limit = 1, breed_id = '', page = 0,) {
        return instance.get(`images/search?limit=${limit}&breed_id=${breed_id}&page=${page}`).then(res => res.data)
    },
    getImages(params: ImageRequestType) {

        let requestStr = 'images/search'

        if (Object.keys(params).length > 0) {
            const paramsStr = Object.keys(params).reduce((acc, key) =>
                acc += `${key}=${params[key as keyof ImageRequestType]}&`, '?').slice(0, -1)
            //console.log(paramsStr);
            requestStr += paramsStr
        }

        //console.log('requestSTR: ', requestStr);
        return instance.get<ImageType[]>(requestStr).then(res => res.data)
    },
    getImage(image_id: string) {
        return instance.get(`images/${image_id}`).then(res => res.data)
    }
}

export type SizeType = 'full' | 'med' | 'small' | 'thumb'
//export type mimeType = 'gif,jpg,png' | 'jpg,png' | 'gif,png' | 'gif,jpg' | 'gif' | 'jpg' | 'png'
export type MimeType = 'gif,jpg,png' | 'jpg,png' | 'gif'
export type OrderType = 'RANDOM' | 'ASC' | 'DESC'

export type ImageRequestType = {
    size?: SizeType
    mime_types?: MimeType
    order?: OrderType
    limit?: number
    page?: number
    breed_id?: string
}

//imagesAPI.getImages({ breed_id: 'abys', limit: 7, page: 2 })
//imagesAPI.getImages({})