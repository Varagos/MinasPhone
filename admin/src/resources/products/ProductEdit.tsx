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
        {/* <TextInput source="id" disabled /> */}
        <TextInput source="slug" disabled label={translate('resources.products.fields.slug')} />
        <BooleanInput source="active" label={translate('resources.products.fields.available')} />
        <TextInput source="name" label={translate('resources.products.fields.name')} />
        <RichTextInput source="description" label={translate('resources.products.fields.description')} />
        <NumberInput source="quantity" label={translate('resources.products.fields.quantity')} />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" label={translate('resources.products.fields.category')} />
        </ReferenceInput>
        <AttributesSubformEdit />
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
        <TextInput source="sku" />
        {/* <NumberInput source="price" /> */}
        <TextInput
          label={translate('resources.products.fields.price')}
          source="price"
          type="number"
          parse={convertStringToNumber}
        />
        ,
      </SimpleForm>
    </Edit>
  );
};
