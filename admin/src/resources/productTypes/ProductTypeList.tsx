import * as React from 'react';
import { List, Datagrid, TextField, useTranslate, ChipField, ArrayField, SingleFieldList } from 'react-admin';

export const ProductTypeList = () => {
    const translate = useTranslate();
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="name" label={translate('resources.product_types.fields.name')} />
                <ArrayField source="attributes" label={translate('resources.product_types.fields.attributes')}>
                    <SingleFieldList linkType={false}>
                        <ChipField source="attributeName" size="small" />
                    </SingleFieldList>
                </ArrayField>
            </Datagrid>
        </List>
    );
};
