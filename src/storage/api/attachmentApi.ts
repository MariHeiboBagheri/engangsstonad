import { Attachment } from '../attachment/types/Attachment';
import axios from 'axios';

function saveAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const formData = new FormData();
    formData.set('id', attachment.id);
    formData.append('vedlegg', attachment.file, attachment.filename);

    const url = `${(window as any).REST_API_URL}/storage/vedlegg`;
    return axios.post(url, formData, config);
}

function deleteAttachment(attachment: Attachment) {
    const config = {
        withCredentials: true
    };
    const url = `${(window as any).REST_API_URL}/storage/vedlegg/${attachment.url}`;
    return axios.delete(url, config);
}

const AttachmentApi = { saveAttachment, deleteAttachment };

export default AttachmentApi;