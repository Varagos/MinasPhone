import * as React from 'react';
import { useState } from 'react';
import {
    TextInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    NumberInput,
    required,
    useTranslate,
    useDataProvider,
    useNotify,
    Form,
    Button,
} from 'react-admin';
import { Box } from '@mui/material';

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

interface AttributeQuickCreateFormProps {
    onSuccess: (newAttribute: any) => void;
    onCancel?: () => void;
}

export const AttributeQuickCreateForm: React.FC<AttributeQuickCreateFormProps> = ({
    onSuccess,
    onCancel,
}) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const translate = useTranslate();
    const [valueType, setValueType] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values: any) => {
        setIsSubmitting(true);
        try {
            const { data } = await dataProvider.create('attributes', { data: values });
            notify(translate('resources.attributes.quick_create.success', 'Attribute created successfully'), {
                type: 'success'
            });
            onSuccess(data);
        } catch (error: any) {
            notify(error?.message || translate('ra.notification.http_error', 'Error creating attribute'), {
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextInput
                source="name"
                label={translate('resources.attributes.fields.name')}
                validate={[required()]}
                fullWidth
            />
            <SelectInput
                source="valueType"
                label={translate('resources.attributes.fields.valueType')}
                choices={valueTypeChoices}
                validate={[required()]}
                fullWidth
                onChange={(e: any) => setValueType(e.target.value)}
            />
            <SelectInput
                source="inputType"
                label={translate('resources.attributes.fields.inputType')}
                choices={inputTypeChoices}
                validate={[required()]}
                fullWidth
            />
            <TextInput
                source="unit"
                label={translate('resources.attributes.fields.unit')}
                fullWidth
            />

            {/* Conditional: only show for enum/multiselect */}
            {(valueType === 'enum' || valueType === 'multiselect') && (
                <ArrayInput
                    source="attributeValues"
                    label={translate('resources.attributes.fields.attributeValues')}
                >
                    <SimpleFormIterator>
                        <TextInput source="value" label="Value" validate={[required()]} />
                        <NumberInput source="displayOrder" label="Order" defaultValue={0} />
                    </SimpleFormIterator>
                </ArrayInput>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                {onCancel && (
                    <Button
                        label={translate('ra.action.cancel', 'Cancel')}
                        onClick={onCancel}
                        disabled={isSubmitting}
                    />
                )}
                <Button
                    label={translate('ra.action.create', 'Create')}
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                />
            </Box>
        </Form>
    );
};
