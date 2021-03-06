// @flow
import React from 'react';
import {shallow} from 'enzyme';
import ResourceStore from '../../../../stores/ResourceStore';
import FormInspector from '../../FormInspector';
import FormStore from '../../stores/FormStore';
import Number from '../../fields/Number';
import NumberComponent from '../../../../components/Number';

jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/FormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());

test('Pass error correctly to component', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('test')));
    const error = {keyword: 'minLength', parameters: {}};

    const field = shallow(
        <Number
            dataPath=""
            error={error}
            fieldTypeOptions={{}}
            formInspector={formInspector}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={50.2}
        />
    );

    expect(field.find(NumberComponent).prop('valid')).toBe(false);
});

test('Pass props correctly to component', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('test')));
    const field = shallow(
        <Number
            dataPath=""
            error={undefined}
            fieldTypeOptions={{}}
            formInspector={formInspector}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={50.2}
        />
    );

    expect(field.find(NumberComponent).prop('valid')).toBe(true);
});

test('Pass props correctly to component inclusive schemaOptions', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('test')));
    const schemaOptions = {
        min: {
            value: 50,
        },
        max: {
            value: 100,
        },
        step: {
            value: 10,
        },
    };

    const field = shallow(
        <Number
            dataPath=""
            error={undefined}
            fieldTypeOptions={{}}
            formInspector={formInspector}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            schemaOptions={schemaOptions}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={50.2}
        />
    );

    expect(field.find(NumberComponent).prop('valid')).toBe(true);
    expect(field.find(NumberComponent).prop('min')).toBe(50);
    expect(field.find(NumberComponent).prop('max')).toBe(100);
    expect(field.find(NumberComponent).prop('step')).toBe(10);
});

test('Should not pass any arguments to onFinish callback', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('test')));
    const finishSpy = jest.fn();

    const input = shallow(
        <Number
            dataPath=""
            error={undefined}
            fieldTypeOptions={{}}
            formInspector={formInspector}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={finishSpy}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={60.2}
        />
    );

    input.find('Number').prop('onBlur')('Test');

    expect(finishSpy).toBeCalledWith();
});
