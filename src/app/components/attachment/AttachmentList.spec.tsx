import * as React from 'react';
import AttachmentList from './AttachmentList';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

describe('<AttachmentList />', () => {
    it('should render an empty list', () => {
        const vedlegg = [] as File[];
        const wrapper = shallow(
            <AttachmentList
                vedlegg={vedlegg}
                onDeleteClick={(file: File) => sinon.stub()}
            />
        );
        expect(wrapper).to.have.length(1);
        expect(wrapper.children()).to.have.length(0);
    });
    
    it('should render all attachments recived in props', () => {
        const vedlegg = [new File([''], 'mockFile1.pdf'), new File([''], 'mockFile2.pdf')] as File[];
        const wrapper = shallow(
            <AttachmentList
                vedlegg={vedlegg}
                onDeleteClick={(file: File) => sinon.stub()}
            />
        );
        const listElements = wrapper.find('li');
        expect(listElements.length).to.be.eq(2);
    });

    it('should trigger onDeleteCLick callback when delete button is clicked', () => {
        const vedlegg = [new File([''], 'mockFile1.pdf'), new File([''], 'mockFile2.pdf')] as File[];
        const onDeleteCLickMock = jest.fn();
        const wrapper = mount(
            <AttachmentList
                vedlegg={vedlegg}
                onDeleteClick={(file: File) => onDeleteCLickMock(file)}
            />
        );
        const deleteButton = wrapper.find('ul').childAt(0).find('button');
        deleteButton.simulate('click');
        expect(onDeleteCLickMock.mock.calls[0][0]).to.be.a('File');
    });
});
