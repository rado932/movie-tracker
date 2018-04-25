import React from 'react';
import { shallow } from 'enzyme';
import MyInput from "../../src/form/MyInput";
import {removeGaps} from "../../src/utils";

test('render MyInput', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "Long String";
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
});

test('render MyInput with empty properties', () => {
    // GIVEN
    const name = "";
    const value = "";
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
});

test('render MyInput with type number', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "1234";
    const type = "number";
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, [], onChange, type);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value, "number");
});

test('render MyInput with readonly opts', () => {
    // GIVEN
    const name = "My Test Input";
    const value = "Long String";
    const inputOpts = [];
    inputOpts['readOnly'] = 'readOnly';
    const onChange = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(name, value, inputOpts, onChange);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value, "text", true);
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
    wrapper.find("input").simulate('change', event);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, value);
    // AND event is called once
    expect(onChange).toHaveBeenCalledTimes(1);
});

const getWrapper = (name, value, opts, onChange, type) => {
    return shallow(
        <MyInput name={name}
                 type={type}
                 value={value}
                 opts={opts}
                 onChange={onChange}/>
    );
};

function inspectObjectWrapper(wrapper, name, value, type, isReadOnly) {
    expect(wrapper.html()).not.toHaveLength(0);

    const label = wrapper.find("label");
    expect(label).toHaveLength(1);
    expect(label.text()).toContain(name);
    expect(label.props().className).toContain(removeGaps(name));

    const input = wrapper.find("input");
    expect(input).toHaveLength(1);
    expect(input.props().value).toBe(value);

    if (typeof type === "undefined") {
        expect(input.props().type).toBe("text");
    } else {
        expect(input.props().type).toBe(type);
    }
    if (typeof isReadOnly !== "undefined") {
        expect(input.props().readOnly).toBe("readOnly");
    } else {
        expect(input.props().readOnly).toBeUndefined();
    }
}