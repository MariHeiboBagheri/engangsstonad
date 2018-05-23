import * as React from 'react';
import './attachment.less';

import Attachment from 'components/attachment/Attachment';

interface Props {
    vedlegg: File[];
    vedleggURL: URL;
    visFilstørrelse?: boolean;
    onDelete?: (file: File) => void;
    onSave?: (file: File) => void;
}

const AttachmentList: React.StatelessComponent<Props> = props => {
    const {vedlegg, vedleggURL, visFilstørrelse, onDelete, onSave} = props;
    return (
        <ul className="attachmentList">
            {vedlegg.map((vedleggFile, index) => (
                <li key={index}>
                    <Attachment
                        vedlegg={vedleggFile}
                        onDelete={onDelete}
                        onSave={onSave}
                        visFilstørrelse={visFilstørrelse}
                        vedleggURL={vedleggURL}
                    />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;
