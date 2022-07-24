import { instance } from "./api"


export const imagesAPI = {
    getRandomImage(limit = 1, breed_id = '', page = 0) {
        return instance.get(`images/search?limit=${limit}&breed_id=${breed_id}&page=${page}`).then(res => res.data)
    },
    getImage(image_id: string) {
        return instance.get(`images/${image_id}`).then(res => res.data)
    }
}