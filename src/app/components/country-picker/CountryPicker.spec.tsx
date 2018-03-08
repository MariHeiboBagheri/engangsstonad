import * as React from 'react';
import CountryPicker from './CountryPicker';
import CountryModal from './CountryModal';
import { shallow } from 'enzyme';

describe('<CountryPicker />', () => {
    it('should render', () => {
        const wrapper = shallow(
            <CountryPicker 
                label="countryPicker"
                language="nb"
                utenlandsoppholdListe={[]}
                addVisit={jest.fn()}
                editVisit={jest.fn()()}
                deleteVisit={jest.fn()}
            />
        );
        expect(wrapper.length).toBe(1);
    });

    it('should display country modal on add button click', () => {
        const wrapper = shallow(
            <CountryPicker 
                label="countryPicker"
                language="nb" 
                utenlandsoppholdListe={[]}
                addVisit={() => jest.fn()}
                editVisit={() => jest.fn()}
                deleteVisit={() => jest.fn()}
            />
        );
        wrapper.find('.countryPicker__addButton').simulate('click');
        expect(wrapper.find(CountryModal).length).toBe(1);
    });

    it('should be possible to edit a visit', () => {
        const wrapper = shallow(
            <CountryPicker 
                label="countryPicker"
                language="nb" 
                utenlandsoppholdListe={[]}
                addVisit={() => jest.fn()}
                editVisit={() => jest.fn()}
                deleteVisit={() => jest.fn()}
            />
        );
        wrapper.find('.countryPicker__addButton').simulate('click');
    });
});
