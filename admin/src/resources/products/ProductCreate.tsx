import { RichTextInput } from 'ra-input-rich-text';
import {
  BooleanInput,
  NumberInput,
  SimpleForm,
  TextInput,
  Create,
  ImageInput,
  ImageField,
  ReferenceInput,
  SelectInput,
  useTranslate,
} from 'react-admin';

const convertStringToNumber = (value: string) => {
  const float = parseFloat(value);
  return isNaN(float) ? null : float;
};

/**
 * 
image*	[...]
 */
export const ProductCreate = () => {
  const translate = useTranslate();
  return (
    <Create>
      <SimpleForm>
        <BooleanInput source="active" defaultValue={true} />
        {/* <TextInput source="slug" /> */}
        <TextInput source="name" label={translate('resources.products.fields.name')} />
        <RichTextInput source="description" label={translate('resources.products.fields.description')} />
        <ReferenceInput source="categoryId" reference="categories">
          <SelectInput optionText="name" label={translate('resources.products.fields.category')} />
        </ReferenceInput>
        <NumberInput source="quantity" label={translate('resources.products.fields.quantity')} defaultValue={1} />
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
        {/* <TextInput source="sku" /> */}
        {/* <NumberInput source="price" /> */}
        <TextInput
          label={translate('resources.products.fields.price')}
          source="price"
          type="number"
          parse={convertStringToNumber}
        />
      </SimpleForm>
    </Create>
  );
};
