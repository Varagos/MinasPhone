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

const convertStringToNumber = (value: string) => {
  const float = parseFloat(value);
  return isNaN(float) ? null : float;
};

export const ProductEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
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
