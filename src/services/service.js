import api from '@/services/api';

export default {
    getItems() {
        return api().get('/')
    },
    getItemById(id) {
        return api().get(`/id/${id}`)
    },
    addItem(params) {
        return api().post('/', params)
    },
    updateItem(id, params) {
        return api().post(`/update/${id}`, params)
    },
    deleteItem(id) {
        return api().delete(`/${id}`)
    },
    uploadItem(imageFile) {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        let formData = new FormData();
        formData.append('file', imageFile, imageFile.name);

        return api().post('/upload', formData, headers)
    }
}