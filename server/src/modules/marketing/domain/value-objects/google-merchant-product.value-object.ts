import { protos } from '@google-shopping/products';

export interface GoogleMerchantProductProps {
  offerId: string;
  contentLanguage: string;
  targetCountry: string;
  channel: 'online';
  title: string;
  description: string;
  link: string;
  imageLink: string;
  price: { value: string; currency: string };
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  brand?: string;
  gtin?: string;
  mpn?: string;
  condition?: 'new' | 'refurbished' | 'used';
}

export class GoogleMerchantProduct {
  constructor(public readonly props: GoogleMerchantProductProps) {}

  private mapAvailability():
    | protos.google.shopping.merchant.products.v1.Availability
    | keyof typeof protos.google.shopping.merchant.products.v1.Availability {
    switch (this.props.availability) {
      case 'in_stock':
        return 'IN_STOCK';
      case 'out_of_stock':
        return 'OUT_OF_STOCK';
      case 'preorder':
        return 'PREORDER';
    }
  }

  toGoogleFormat(): {
    channel: 'online';
    productAttributes: protos.google.shopping.merchant.products.v1.IProductAttributes;
  } {
    // Convert price to micros (price * 1,000,000)
    const priceValue = parseFloat(this.props.price.value);
    const priceMicros = Math.round(priceValue * 1_000_000);

    const productAttributes: any = {
      title: this.props.title,
      description: this.props.description,
      link: this.props.link,
      imageLink: this.props.imageLink,
      availability: this.mapAvailability(), // ✅ FIX

      price: {
        amountMicros: priceMicros.toString(),
        currencyCode: this.props.price.currency,
      },
    };

    // Add optional attributes
    if (this.props.brand) {
      productAttributes.brand = this.props.brand;
    }
    if (this.props.gtin) {
      productAttributes.gtins = [this.props.gtin];
    }
    if (this.props.mpn) {
      productAttributes.mpn = this.props.mpn;
    }
    if (this.props.condition) {
      productAttributes.condition = this.props.condition;
    }

    return {
      channel: this.props.channel,
      productAttributes,
    };
  }
}
