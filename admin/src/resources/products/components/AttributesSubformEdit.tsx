import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    TextInput,
    NumberInput,
    BooleanInput,
    SelectInput,
    SelectArrayInput,
    RadioButtonGroupInput,
    ReferenceInput,
    useDataProvider,
    useTranslate,
    required,
    useRecordContext,
} from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Divider,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import type {
    ProductTypeResponseDto,
    ProductTypeAttributeConfigDto,
} from '../../../api/server/api';

const AttributeInput: React.FC<{
    attribute: ProductTypeAttributeConfigDto;
    source: string;
    isDefined: boolean;
}> = ({ attribute, source, isDefined }) => {
    const translate = useTranslate();
    const { setValue } = useFormContext();
    const validation = attribute.isRequired ? [required()] : [];

    const handleClear = () => {
        setValue(source, null, { shouldDirty: true, shouldTouch: true });
    };

    const label = (
        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {attribute.unit
                ? `${attribute.attributeName} (${attribute.unit})`
                : attribute.attributeName}
            {isDefined && (
                <Chip
                    label={translate('resources.products.attributes.defined', 'Defined')}
                    size="small"
                    color="success"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                />
            )}
        </Box>
    );

    const renderInput = () => {

        switch (attribute.inputType) {
            case 'text':
                return (
                    <TextInput
                        source={source}
                        label={label}
                        validate={validation}
                        fullWidth
                    />
                );

            case 'number':
                return (
                    <NumberInput
                        source={source}
                        label={label}
                        validate={validation}
                        fullWidth
                    />
                );

            case 'checkbox':
                return (
                    <BooleanInput
                        source={source}
                        label={label}
                        defaultValue={false}
                    />
                );

            case 'select':
            case 'radio':
                const choices = attribute.attributeValues
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map(val => ({
                        id: val.id,
                        name: val.value,
                    }));

                if (attribute.inputType === 'radio') {
                    return (
                        <RadioButtonGroupInput
                            source={source}
                            label={label}
                            choices={choices}
                            validate={validation}
                        />
                    );
                }

                return (
                    <SelectInput
                        source={source}
                        label={label}
                        choices={choices}
                        validate={validation}
                        fullWidth
                    />
                );

            case 'multiselect':
                const multiselectChoices = attribute.attributeValues
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map(val => ({
                        id: val.id,
                        name: val.value,
                    }));

                return (
                    <SelectArrayInput
                        source={source}
                        label={label}
                        choices={multiselectChoices}
                        validate={validation}
                        fullWidth
                    />
                );

            default:
                return (
                    <TextInput
                        source={source}
                        label={label}
                        validate={validation}
                        fullWidth
                    />
                );
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
                {renderInput()}
            </Box>
            {!attribute.isRequired && isDefined && (
                <Tooltip title={translate('ra.action.clear', 'Clear')}>
                    <IconButton
                        onClick={handleClear}
                        size="small"
                        sx={{ mt: 1 }}
                        aria-label={translate('ra.action.clear', 'Clear')}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export const AttributesSubformEdit: React.FC = () => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const record = useRecordContext();
    const productTypeId = useWatch({ name: 'productTypeId' });
    const currentAttributeValues = useWatch({ name: 'attributeValues' });
    const [productType, setProductType] = useState<ProductTypeResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productTypeId) {
            setProductType(null);
            setError(null);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        dataProvider
            .getOne<ProductTypeResponseDto>('product-types', { id: productTypeId })
            .then(({ data }) => {
                if (!cancelled) {
                    setProductType(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err.message || 'Failed to load product type');
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [productTypeId, dataProvider]);

    const sortedAttributes = productType?.attributes
        ? [...productType.attributes].sort((a, b) => {
            const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
            const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
            return orderA - orderB;
        })
        : [];

    // Check which attributes are already defined (have non-null values)
    const definedAttributeIds = new Set(
        currentAttributeValues
            ? Object.entries(currentAttributeValues)
                .filter(([_, value]) => value !== null && value !== undefined && value !== '')
                .map(([key, _]) => key)
            : []
    );

    // Separate defined and undefined attributes
    const definedAttributes = sortedAttributes.filter(attr =>
        definedAttributeIds.has(attr.attributeId)
    );
    const undefinedAttributes = sortedAttributes.filter(attr =>
        !definedAttributeIds.has(attr.attributeId)
    );

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {translate('resources.products.fields.productType', 'Product Type')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Select the product type and configure its attributes
                </Typography>

                <ReferenceInput source="productTypeId" reference="product-types">
                    <SelectInput
                        optionText="name"
                        label={translate('resources.products.fields.productType', 'Product Type')}
                        fullWidth
                    />
                </ReferenceInput>

                {productTypeId && (
                    <>
                        <Divider sx={{ my: 3 }} />

                        {loading && (
                            <Box display="flex" justifyContent="center" p={3}>
                                <CircularProgress size={24} />
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {!loading && !error && productType && (
                            <>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                                    {productType.name} {translate('resources.products.fields.attributes', 'Attributes')}
                                </Typography>

                                {sortedAttributes.length === 0 && (
                                    <Alert severity="info">
                                        {translate('resources.products.attributes.none', 'This product type has no attributes configured')}
                                    </Alert>
                                )}

                                {/* Defined Attributes */}
                                {definedAttributes.length > 0 && (
                                    <Box sx={{ mb: undefinedAttributes.length > 0 ? 3 : 0 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {translate('resources.products.attributes.existing', 'Existing attributes')}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {definedAttributes.map((attribute) => (
                                                <AttributeInput
                                                    key={attribute.attributeId}
                                                    attribute={attribute}
                                                    source={`attributeValues.${attribute.attributeId}`}
                                                    isDefined={true}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Undefined Attributes */}
                                {undefinedAttributes.length > 0 && (
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {translate('resources.products.attributes.available', 'Available attributes to add')}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            {undefinedAttributes.map((attribute) => (
                                                <AttributeInput
                                                    key={attribute.attributeId}
                                                    attribute={attribute}
                                                    source={`attributeValues.${attribute.attributeId}`}
                                                    isDefined={false}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};
