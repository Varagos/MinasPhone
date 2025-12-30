import * as React from 'react';
import { useState } from 'react';
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
    Button,
    useNotify,
} from 'react-admin';
import { Box, Card, CardContent, Typography, Divider, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQueryClient } from 'react-query';
import { AttributeQuickCreateForm } from '../attributes/AttributeQuickCreateForm';

export const ProductTypeEdit = () => {
    const translate = useTranslate();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const [createAttributeModalOpen, setCreateAttributeModalOpen] = useState(false);

    const handleAttributeCreated = (newAttribute: any) => {
        setCreateAttributeModalOpen(false);
        // Invalidate and refetch attributes list
        queryClient.invalidateQueries(['attributes', 'getList']);
        notify(translate('resources.product_types.actions.attribute_created', 'Attribute created! You can now select it.'), {
            type: 'success'
        });
    };

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

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    label={translate('resources.product_types.actions.create_attribute', 'New Attribute')}
                                    onClick={() => setCreateAttributeModalOpen(true)}
                                    startIcon={<AddIcon />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Modal for creating new attribute */}
                <Dialog
                    open={createAttributeModalOpen}
                    onClose={() => setCreateAttributeModalOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        {translate('resources.attributes.quick_create.title', 'Create New Attribute')}
                    </DialogTitle>
                    <DialogContent>
                        <AttributeQuickCreateForm
                            onSuccess={handleAttributeCreated}
                            onCancel={() => setCreateAttributeModalOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </SimpleForm>
        </Edit>
    );
};
