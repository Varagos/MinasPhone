import {
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  ReferenceInput,
  SelectInput,
  useTranslate,
} from 'react-admin';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { RichTextInput } from 'ra-input-rich-text';
import { AttributesSubformEdit } from './components/AttributesSubformEdit';

const convertStringToNumber = (value: string) => {
  const float = parseFloat(value);
  return isNaN(float) ? null : float;
};

// Transform attribute values to match backend DTO structure
const transformProductData = (data: any) => {
  if (!data.attributeValues) {
    return data;
  }

  const transformedAttributeValues: Record<string, any[]> = {};

  Object.entries(data.attributeValues).forEach(([attributeId, value]) => {
    // Skip empty values
    if (value === null || value === undefined || value === '') {
      return;
    }

    // Determine the value type and create the appropriate structure
    let attributeValue: {
      valueId: string | null;
      textValue: string | null;
      numericValue: number | null;
      booleanValue: boolean | null;
    };

    if (typeof value === 'boolean') {
      attributeValue = {
        valueId: null,
        textValue: null,
        numericValue: null,
        booleanValue: value,
      };
    } else if (typeof value === 'number') {
      attributeValue = {
        valueId: null,
        textValue: null,
        numericValue: value,
        booleanValue: null,
      };
    } else if (Array.isArray(value)) {
      // For multiselect - multiple valueIds
      transformedAttributeValues[attributeId] = value.map(v => ({
        valueId: v,
        textValue: null,
        numericValue: null,
        booleanValue: null,
      }));
      return;
    } else {
      // For select/radio inputs, the value is the valueId
      // For text inputs, it's the textValue
      // We need to determine which one based on if it's a UUID-like string
      const isValueId = typeof value === 'string' && value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      attributeValue = {
        valueId: isValueId ? value : null,
        textValue: isValueId ? null : String(value),
        numericValue: null,
        booleanValue: null,
      };
    }

    transformedAttributeValues[attributeId] = [attributeValue];
  });

  return {
    ...data,
    attributeValues: transformedAttributeValues,
  };
};

export const ProductEdit = () => {
  const translate = useTranslate();
  return (
    <Edit transform={transformProductData}>
      <SimpleForm>
        <Box sx={{ width: '100%', maxWidth: 1200 }}>
          <Grid container spacing={2}>
            {/* Section 1: Basic Information */}
            <Grid item xs={12}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {translate('resources.products.sections.basicInfo')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {translate('resources.products.sections.basicInfoDesc')}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextInput source="name" label={translate('resources.products.fields.name')} />
                    <TextInput
                      label={translate('resources.products.fields.price')}
                      source="price"
                      type="number"
                      parse={convertStringToNumber}
                    />
                  </Box>
                  <RichTextInput source="description" label={translate('resources.products.fields.description')} />
                  <ImageInput
                    source="media"
                    label={translate('resources.products.fields.image')}
                    accept="image/*"
                    multiple={false}
                  >
                    <ImageField
                      source="src"
                      title="title"
                      sx={{ '& img': { maxWidth: 400, maxHeight: 400, objectFit: 'contain' } }}
                    />
                  </ImageInput>
                </CardContent>
              </Card>
            </Grid>

            {/* Section 2: Classification */}
            <Grid item xs={12}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {translate('resources.products.sections.categoryDesc')}
                  </Typography>
                  <ReferenceInput source="categoryId" reference="categories">
                    <SelectInput optionText="name" label={translate('resources.products.fields.category')} fullWidth />
                  </ReferenceInput>
                </CardContent>
              </Card>
              <AttributesSubformEdit />
            </Grid>

            {/* Section 3: Inventory */}
            <Grid item xs={12} md={6}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {translate('resources.products.sections.inventory')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {translate('resources.products.sections.inventoryDesc')}
                  </Typography>

                  <NumberInput source="quantity" label={translate('resources.products.fields.quantity')} fullWidth />
                  <TextInput source="sku" fullWidth />
                  <BooleanInput source="active" label={translate('resources.products.fields.available')} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  );
};
