import * as React from 'react';
import LanguageToggle from './LanguageToggle';
import { shallow } from 'enzyme';

describe('<LanguageToggle />', () => {
    it('should render', () => {
        const wrapper = shallow(<LanguageToggle language="nb" toggleLanguage={() => jest.fn()} />);
        expect(wrapper.length).toBe(1);
    });

    it('should trigger callback on click', () => {
        const toggleLanguageMock = jest.fn();
        const wrapper = shallow(<LanguageToggle language="nb" toggleLanguage={() => toggleLanguageMock()} />);
        wrapper.find('a.unactive').simulate('click');
        expect(toggleLanguageMock.mock.calls.length).toBe(1);
    });
});
