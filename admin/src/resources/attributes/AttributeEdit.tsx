import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    FormDataConsumer,
    NumberInput,
    required,
    useTranslate,
} from 'react-admin';

const valueTypeChoices = [
    { id: 'string', name: 'String' },
    { id: 'number', name: 'Number' },
    { id: 'boolean', name: 'Boolean' },
    { id: 'enum', name: 'Enum' },
    { id: 'multiselect', name: 'Multi Select' },
];

const inputTypeChoices = [
    { id: 'text', name: 'Text' },
    { id: 'number', name: 'Number' },
    { id: 'select', name: 'Select' },
    { id: 'multiselect', name: 'Multi Select' },
    { id: 'checkbox', name: 'Checkbox' },
    { id: 'radio', name: 'Radio' },
];

export const AttributeEdit = () => {
    const translate = useTranslate();
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="name" label={translate('resources.attributes.fields.name')} validate={[required()]} />
                <SelectInput source="valueType" label={translate('resources.attributes.fields.valueType')} choices={valueTypeChoices} validate={[required()]} />
                <SelectInput source="inputType" label={translate('resources.attributes.fields.inputType')} choices={inputTypeChoices} validate={[required()]} />
                <TextInput source="unit" label={translate('resources.attributes.fields.unit')} />
                
                <FormDataConsumer>
                    {({ formData, ...rest }) => 
                        (formData.valueType === 'enum' || formData.valueType === 'multiselect') &&
                        <ArrayInput source="attributeValues" label={translate('resources.attributes.fields.attributeValues')}>
                            <SimpleFormIterator>
                                <TextInput source="value" label="Value" validate={[required()]} />
                                <NumberInput source="displayOrder" label="Order" defaultValue={0} />
                            </SimpleFormIterator>
                        </ArrayInput>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    );
};
