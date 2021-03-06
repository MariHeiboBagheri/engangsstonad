export interface Attachment {
    id: Skjemanummer;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    error?: any;
}

export enum AttachmentType {
    TERMINBEKREFTELSE = 'terminbekreftelse'
}

export enum Skjemanummer {
    TERMINBEKREFTELSE = 'I000062'
}
