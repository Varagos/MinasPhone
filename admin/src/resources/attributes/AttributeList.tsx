import * as React from 'react';
import { List, Datagrid, TextField, ChipField, useTranslate, ArrayField, SingleFieldList } from 'react-admin';

export const AttributeList = () => {
    const translate = useTranslate();
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="name" label={translate('resources.attributes.fields.name')} />
                <ChipField source="valueType" label={translate('resources.attributes.fields.valueType')} />
                <ChipField source="inputType" label={translate('resources.attributes.fields.inputType')} />
                <TextField source="unit" label={translate('resources.attributes.fields.unit')} />
                <ArrayField source="attributeValues" label={translate('resources.attributes.fields.attributeValues')}>
                    <SingleFieldList linkType={false}>
                        <ChipField source="value" size="small" />
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
};
