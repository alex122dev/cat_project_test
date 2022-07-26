import { instance } from "./api"


export type ImageType = {
    breeds: any[]
    height: number
    width: number
    id: string
    url: string
}


export const imagesAPI = {
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
    getSpecificImage(image_id: string) {
        return instance.get(`images/${image_id}`).then(res => res.data)
    },
    uploadImage(file: File, subId = '') {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('sub_id', subId)
        return instance.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
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