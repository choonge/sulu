// @flow
import React from 'react';
import {observable} from 'mobx';
import {shallow} from 'enzyme';
import Selection from '../../fields/Selection';
import FormInspector from '../../FormInspector';
import FormStore from '../../stores/FormStore';
import ResourceStore from '../../../../stores/ResourceStore';

jest.mock('../../FormInspector', () => jest.fn(function(formStore) {
    this.id = formStore.id;
    this.resourceKey = formStore.resourceKey;
    this.locale = formStore.locale;
}));
jest.mock('../../stores/FormStore', () => jest.fn(function(resourceStore) {
    this.id = resourceStore.id;
    this.resourceKey = resourceStore.resourceKey;
    this.locale = resourceStore.locale;
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function(resourceKey, id, options) {
    this.id = id;
    this.resourceKey = resourceKey;
    this.locale = options ? options.locale : undefined;
}));

jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn(function(key) {
        return key;
    }),
}));

test('Should pass props correctly to component', () => {
    const changeSpy = jest.fn();
    const value = [1, 6, 8];

    const fieldTypeOptions = {
        adapter: 'table',
        displayProperties: ['id', 'title'],
        icon: '',
        label: 'sulu_snippet.selection_label',
        overlayTitle: 'sulu_snippet.selection_overlay_title',
        resourceKey: 'snippets',
    };

    const locale = observable.box('en');

    const formInspector = new FormInspector(
        new FormStore(
            new ResourceStore('pages', 1, {locale})
        )
    );

    const selection = shallow(
        <Selection
            dataPath=""
            error={undefined}
            formInspector={formInspector}
            fieldTypeOptions={fieldTypeOptions}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={changeSpy}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={value}
        />
    );

    expect(selection.find('Selection').props()).toEqual(expect.objectContaining({
        adapter: 'table',
        displayProperties: ['id', 'title'],
        label: 'sulu_snippet.selection_label',
        locale,
        onChange: changeSpy,
        resourceKey: 'snippets',
        overlayTitle: 'sulu_snippet.selection_overlay_title',
        value,
    }));
});

test('Should pass id of form as disabledId to avoid assigning something to itself', () => {
    const fieldTypeOptions = {
        adapter: 'table',
        resourceKey: 'pages',
    };

    const formInspector = new FormInspector(new FormStore(new ResourceStore('pages', 4)));

    const selection = shallow(
        <Selection
            dataPath=""
            error={undefined}
            formInspector={formInspector}
            fieldTypeOptions={fieldTypeOptions}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={undefined}
        />
    );

    expect(selection.find('Selection').prop('disabledIds')).toEqual([4]);
});

test('Should pass empty array if value is not given', () => {
    const changeSpy = jest.fn();
    const fieldOptions = {
        adapter: 'column_list',
        resourceKey: 'pages',
    };
    const formInspector = new FormInspector(new FormStore(new ResourceStore('snippets')));

    const selection = shallow(
        <Selection
            dataPath=""
            error={undefined}
            formInspector={formInspector}
            fieldTypeOptions={fieldOptions}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={changeSpy}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={undefined}
        />
    );

    expect(selection.find('Selection').props()).toEqual(expect.objectContaining({
        adapter: 'column_list',
        onChange: changeSpy,
        resourceKey: 'pages',
        value: [],
    }));
});

test('Should throw an error if no resourceKey is passed in fieldOptions', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('snippets')));

    expect(() => shallow(
        <Selection
            dataPath=""
            error={undefined}
            formInspector={formInspector}
            fieldTypeOptions={{}}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={undefined}
        />
    )).toThrowError(/"resourceKey"/);
});

test('Should throw an error if no adapter is passed in fieldTypeOptions', () => {
    const formInspector = new FormInspector(new FormStore(new ResourceStore('snippets')));

    expect(() => shallow(
        <Selection
            dataPath=""
            error={undefined}
            formInspector={formInspector}
            maxOccurs={undefined}
            minOccurs={undefined}
            onChange={jest.fn()}
            onFinish={jest.fn()}
            fieldTypeOptions={{resourceKey: 'test'}}
            schemaPath=""
            showAllErrors={false}
            types={undefined}
            value={undefined}
        />
    )).toThrowError(/"adapter"/);
});
