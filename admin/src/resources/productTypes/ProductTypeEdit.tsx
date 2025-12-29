import * as React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    ReferenceInput,
    SelectInput,
    BooleanInput,
    NumberInput,
    required,
    useTranslate,
} from 'react-admin';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';

export const ProductTypeEdit = () => {
    const translate = useTranslate();
    return (
        <Edit>
            <SimpleForm>
                <Box sx={{ maxWidth: 800 }}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {translate('resources.product_types.fields.name')}
                            </Typography>
                            <TextInput 
                                source="name" 
                                label={false}
                                validate={[required()]} 
                                fullWidth
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {translate('resources.product_types.fields.attributes')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Configure which attributes apply to this product type
                            </Typography>
                            
                            <ArrayInput source="attributes" label={false}>
                                <SimpleFormIterator
                                    sx={{
                                        '& .RaSimpleFormIterator-line': {
                                            borderLeft: '3px solid',
                                            borderColor: 'primary.main',
                                            pl: 2,
                                            mb: 2,
                                            pb: 2,
                                        }
                                    }}
                                >
                                    <ReferenceInput source="attributeId" reference="attributes" label={translate('resources.product_types.fields.attributeId')}>
                                        <SelectInput optionText="name" validate={[required()]} fullWidth />
                                    </ReferenceInput>
                                    <BooleanInput source="isRequired" label={translate('resources.product_types.fields.isRequired')} defaultValue={false} />
                                    <BooleanInput source="isFilterable" label={translate('resources.product_types.fields.isFilterable')} defaultValue={true} />
                                    <BooleanInput source="isSearchable" label={translate('resources.product_types.fields.isSearchable')} defaultValue={true} />
                                    <NumberInput source="displayOrder" label={translate('resources.product_types.fields.displayOrder')} defaultValue={0} />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </CardContent>
                    </Card>
                </Box>
            </SimpleForm>
        </Edit>
    );
};
