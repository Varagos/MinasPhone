import { useState } from 'react';
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
  useNotify,
  Button,
  fetchUtils,
} from 'react-admin';
import { Box, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { apiBaseUrl } from '../../config';

interface SearchEngineImageResult {
  id: string;
  link: string;
  mime: string;
  fileFormat: string;
}

const ImageSearch = ({ onSelectImage }: { onSelectImage: (url: string) => void }) => {
  const { watch } = useFormContext();
  const productName = watch('name', ''); // '' is the default value

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<SearchEngineImageResult[]>([]);
  const notify = useNotify();
  const translate = useTranslate();

  const handleSearch = async () => {
    if (!productName?.trim()) return;

    setIsLoading(true);
    try {
      const apiUrl = `${apiBaseUrl}/api/v1`;
      const httpClient = fetchUtils.fetchJson;

      const resourceUrl = `products-images/search-engine-images?searchText=${productName}`;

      const url = `${apiUrl}/${resourceUrl}`;
      const { data } = await httpClient(url).then<{ data: SearchEngineImageResult[] }>(({ json }) => {
        return {
          data: json.data,
        };
      });

      console.log('images', data);
      setImages(data);
    } catch (error) {
      notify('Error fetching images', { type: 'error' });
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={2} mb={2}>
      <Box display="flex" gap={2} mb={2}>
        <Button
          label={`Φωτογραφίες για ${productName}`}
          onClick={handleSearch}
          style={{
            border: '2px solid #ccc',
          }}
          disabled={isLoading || !productName?.trim()}
        />
      </Box>

      {isLoading && <p>{translate('ra.action.loading')}...</p>}

      {!isLoading && images.length > 0 && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    // cursor: 'pointer',
                    border: '2px solid transparent',
                    '&:hover': { borderColor: 'primary.main' },
                    borderRadius: 1,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <img
                    src={image.link}
                    alt={image.link}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

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

  const handleSelectImage = async (imageUrl: string) => {
    console.log('Selected image URL:', imageUrl);
  };

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

        {/* <ImageSearch onSelectImage={handleSelectImage} /> */}
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
