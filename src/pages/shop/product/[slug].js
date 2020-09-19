import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import { getProductBySlug } from "../../../common/productSelect";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutFour";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";
import { getProductBySlugApi,searchProductsApi } from '../../../lib/services' 

export default function ({ product }) {
  console.log("$%^&*(*&^%$#%^&*(")
  console.log(product)
  console.log("#$%^&*&^%$%^&*(")
  const foundProduct = product;
  const onReviewSubmit = (data) => {
    console.log(data);
  };
  return (
    !!foundProduct  && (
      <LayoutFour title={foundProduct.name}>
        <Breadcrumb title="Product Detail">
          <BreadcrumbItem name="Home" />
          <BreadcrumbItem name="Shop" />
          <BreadcrumbItem name={foundProduct.name} current />
        </Breadcrumb>
        <ProductDetail data={foundProduct} onReviewSubmit={onReviewSubmit} />
        <ProductSlideTwo data={[foundProduct]} />
        <InstagramTwo />
      </LayoutFour>
    )
  );
}


export const getStaticPaths = async (context) => {
  const search = await searchProductsApi({
    pageSize: 10,
    pageIndex: 0,
    isActive: { value: true },
  });
  const { result } = search;
  const slugs = result.map((item) => `/shop/product/${item.slug}`);
  return {
    paths: [...slugs],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const product = await getProductBySlugApi(slug);

  return {
    props: { product }
  };
};

