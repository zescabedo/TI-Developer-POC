import React, { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { Text, Field, ImageField, RichText, Image } from '@sitecore-content-sdk/nextjs';

export type TIPromoProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    SKU: Field<string>;
  };
};

type ProductData = {
  name: string;
  description: string;
  price: string;
};

async function getProductData(sku: string): Promise<ProductData | null> {
  try {
    const res = await fetch(`https://api.example.com/products/${sku}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return {
      name: data.name,
      description: data.description,
      price: data.price,
    };
  } catch {
    return null;
  }
}

export const TIPromo = (props: TIPromoProps): JSX.Element => {
  console.log(props);
  const sku = props.fields.SKU.value;

  const product = getProductData(sku);
  return (
    <section className="ti_p-page-responsive u-padding-vertical-16">
      <div className="ti_p-row mod-add-gutter-space ti_p-layout-space-large">
        <div className="ti_p-col-4 ti_p-col-phone-12">
          <div className="u-fullHeight u-flex mod-align-center">
            <div className="u-centered-minHeight" data-lid="blog">
              <div className="u-font-label u-margin-bottom-6">23 MAR 2026 | <a id="news_blog" className="u-color-grey7" href="https://news.ti.com/" data-di-id="#news_blog">COMPANY BLOG</a></div>
              <div className="u-header-3 u-header-underline"><a className="u-color-grey8" href="https://www.ti.com/about-ti/newsroom/company-blog/why-packaging-is-the-next-frontier-in-power-design-innovation.html" data-di-id="di-id-7fe5c324-aea6163e"><Text field={props.fields.Title} /></a></div>
              <div className="u-paragraph-medium u-margin-bottom-8"><RichText field={props.fields.Description} /></div>
            </div>
          </div>
        </div>
        <div className="ti_p-col-8 ti_p-col-phone-12 u-flex-item mod-reorder-phone ti_p-layout-space-small-only-on-phone">
          <Image field={props.fields.Image} />
        </div>
      </div>
      <div className="ti_h-blog-divider u-show-only-on-phone"></div>
    </section>
  );
};

export const TIPromoTextOnly = (props: TIPromoProps): JSX.Element => {

  return (
    <section className="ti_p-page-responsive u-padding-vertical-16">
      <div className="ti_p-row mod-add-gutter-space ti_p-layout-space-large">
        <div className="ti_p-col-4 ti_p-col-phone-12">
          <div className="u-fullHeight u-flex mod-align-center">
            <div className="u-centered-minHeight" data-lid="blog">
              <div className="u-font-label u-margin-bottom-6">23 MAR 2026 | <a id="news_blog" className="u-color-grey7" href="https://news.ti.com/" data-di-id="#news_blog">COMPANY BLOG</a></div>
              <div className="u-header-3 u-header-underline"><a className="u-color-grey8" href="https://www.ti.com/about-ti/newsroom/company-blog/why-packaging-is-the-next-frontier-in-power-design-innovation.html" data-di-id="di-id-7fe5c324-aea6163e"><Text field={props.fields.Title} /></a></div>
              <div className="u-paragraph-medium u-margin-bottom-8"><RichText field={props.fields.Description} /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ti_h-blog-divider u-show-only-on-phone"></div>
    </section>
  );
};

export const Default = TIPromo;
export const TextOnly = TIPromoTextOnly;