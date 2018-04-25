import React from 'react';
import {shallow} from 'enzyme';
import MyTextArea from "../../src/form/MyTextArea";
import {removeGaps} from "../../src/utils";

test('render MyTextArea', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "Long String";
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
});

test('render MyTextArea with empty properties', () => {
    // GIVEN
    const name = "";
    const value = "";
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
});

test('render MyTextArea with readonly opts', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "Long String";
    const inputOpts = [];
    inputOpts['readOnly'] = 'readOnly';
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, inputOpts, onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value, true);
});

test('render MyInout and simulate a change', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "Long String";
    const onChange = jest.fn();
    const event = {target: {name: `movie-${removeGaps(name)}`, value: "test"}};

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange);
    // AND simulated a change event
    wrapper.find("textarea").simulate('change', event);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
    // AND event is called once
    expect(onChange).toHaveBeenCalledTimes(1);
});

const getWrapper = (name, value, opts, onChange) => {
    return shallow(
        <MyTextArea name={name}
                    value={value}
                    opts={opts}
                    onChange={onChange}/>
    );
};

function inspectObjectWrapper(wrapper, name, value, isReadOnly) {
    expect(wrapper.html()).not.toHaveLength(0);

    const label = wrapper.find("label");
    expect(label).toHaveLength(1);
    expect(label.text()).toContain(name);
    expect(label.props().className).toContain(removeGaps(name));

    const input = wrapper.find("textarea");
    expect(input).toHaveLength(1);
    expect(input.props().value).toBe(value);

    if (typeof isReadOnly !== "undefined") {
        expect(input.props().readOnly).toBe("readOnly");
    } else {
        expect(input.props().readOnly).toBeUndefined();
    }
}