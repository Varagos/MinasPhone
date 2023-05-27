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
} from 'react-admin';

const Language: 'GR' | 'EN' = 'GR';
const labels = {
  GR: {
    slug: 'Κωδικός',
    name: 'Όνομα',
    description: 'Περιγραφή',
    price: 'Τιμή',
    quantity: 'Ποσότητα',
    image: 'Εικόνα',
    available: 'Διαθέσιμο',
    createdAt: 'Δημιουργήθηκε',
    updatedAt: 'Ενημερώθηκε',
    category: 'Κατηγορία',
  },
};

const convertStringToNumber = (value: string) => {
  const float = parseFloat(value);
  return isNaN(float) ? null : float;
};

/**
 * 
image*	[...]
 */
export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <BooleanInput source="active" defaultValue={true} />
      {/* <TextInput source="slug" /> */}
      <TextInput source="name" />
      <RichTextInput source="description" label={labels[Language].description} />
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" label={labels[Language].category} />
      </ReferenceInput>
      <NumberInput source="quantity" />
      <ImageInput source="media" label={labels[Language].image} accept="image/*" multiple={false}>
        <ImageField
          source="src"
          title="title"
          sx={{ '& img': { maxWidth: 400, maxHeight: 400, objectFit: 'contain' } }}
        />
      </ImageInput>
      <TextInput source="sku" />
      {/* <NumberInput source="price" /> */}
      <TextInput label={labels[Language].price} source="price" type="number" parse={convertStringToNumber} />,
    </SimpleForm>
  </Create>
);
