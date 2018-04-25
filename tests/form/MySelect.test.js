import React from 'react';
import { shallow } from 'enzyme';
import MySelect from "../../src/form/MySelect";
import { humanName, removeGaps, formatOptions } from '../../src/utils'

test('render MySelect', () => {
    // GIVEN
    const name = "My Test Select";
    const options = ["Short String", "Long String"];
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, options, onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, options);
});

test('render MySelect with empty properties', () => {
    // GIVEN
    const name = "";
    const options = [];
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, options, onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, options);
});

test('render MySelect and simulate a change', () => {
    // GIVEN
    const name = "My Test Select";
    const options = ["Short String", "Long String"];
    const onChange = jest.fn();
    const event = {target: {name: `select-${removeGaps(name)}`, value: "Long String"}};

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, options, onChange);
    // AND simulated a change event
    wrapper.find("Select").simulate('change', event);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, options);
    // AND event is called once
    expect(onChange).toHaveBeenCalledTimes(1);
});

const getWrapper = (name, options, onChange) => {
    return shallow(
        <MySelect name={name}
                  options={options}
                  onChange={onChange}/>
    );
};

function inspectObjectWrapper(wrapper, name, options) {
    expect(wrapper.html()).not.toHaveLength(0);

    const label = wrapper.find("label");
    expect(label).toHaveLength(1);
    expect(label.find(".select-label").text()).toBe(humanName(name));

    const select = wrapper.find("Select");
    expect(select).toHaveLength(1);
    expect(select.props().options).toEqual(formatOptions(options));
    expect(select.props().name).toBe(`select-${removeGaps(name)}`);
}