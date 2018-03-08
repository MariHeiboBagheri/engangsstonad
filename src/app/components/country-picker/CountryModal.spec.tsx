import * as React from 'react';
import { shallow } from 'enzyme';
import { Periode } from 'app/types/domain/Utenlandsopphold';
import CountryModal from './CountryModal';
import { shallowWithIntl } from '../../../test/intl-helper';

describe('<CountryModal />', () => {
    it('should render', () => {
        const wrapper = shallowWithIntl(
            <CountryModal 
                language="nb" 
                utenlandsopphold={{} as Periode} 
                onSubmit={jest.fn()} 
                closeModal={jest.fn()}
            />
        );
        expect(wrapper.length).toBe(1);
    });
});
 