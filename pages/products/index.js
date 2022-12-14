import 'animate.css';
// import { css } from '@emotion/react';
// import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../database/products';
import { mainStyles } from '../../util/styles';

export default function DisplayProducts(props) {
  return (
    <div style={mainStyles(props.darkModeOn)}>
      <section className="main-section">
        <container>
          <h1 className="animate__animated animated__fadeIn">
            all the <br />
            <span>hats</span>
          </h1>
          <div className="product-showroom-wrap">
            {props.products.map((product) => {
              return (
                <div
                  key={`Product: ${product.name}`}
                  className="showroom-item animate__animated animated__fadeIn"
                >
                  <div className="showroom-image-wrap">
                    <Image
                      className="showroom-image"
                      src={`/${product.id}-${product.name}.jpg`}
                      alt={`product with name: ${product.name}`}
                      width="300"
                      height="300"
                    />
                    <Link href={`/products/${product.id}`}>
                      <a>{product.name}</a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </container>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
