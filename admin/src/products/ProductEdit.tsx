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
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

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

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      {/* <TextInput source="id" disabled /> */}
      <TextInput source="slug" disabled label={labels[Language].slug} />
      <BooleanInput source="active" label={labels[Language].available} />
      <TextInput source="name" label={labels[Language].name} />
      <RichTextInput source="description" label={labels[Language].description} />
      <NumberInput source="quantity" label={labels[Language].quantity} />
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="name" label={labels[Language].category} />
      </ReferenceInput>
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
  </Edit>
);
