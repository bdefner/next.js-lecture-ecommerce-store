import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LottieErrorAnimation from '../../components/LottieErrorAnimation';
import { productsDatabase } from '../../database/products';
import { getParsedCookies, setStringifiedCookie } from '../../util/cookies';
import { mainStyles } from '../../util/styles';

export default function Product(props) {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const AmountInCookie = getParsedCookies('cart');
    const foundAmount = AmountInCookie.find(
      (productObject) => productObject.id === props.product.id,
    );
    if (foundAmount) {
      setAmount(foundAmount.amount);
    }
  }, []);

  if (props.error) {
    return (
      <div className="error-page-wrap">
        <div id="error-message-wrap">
          <LottieErrorAnimation />
          <h1>Page not found...</h1>
          <div>
            <Link href="/products">
              <a className="main-button">See our products</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Product page</title>
        <meta name="description" content="Product page" />
      </Head>
      <section className="main-section">
        <container className="product-info-container">
          <div className="sticky-column">
            <img
              src={`/${props.product.id}-${props.product.name}.jpg`}
              alt={`product named ${props.product.name}`}
              data-test-id="product-image"
            />
          </div>
          <div className="info-text-column">
            <h2>{props.product.name}</h2>
            <p>
              This product says that cat lovers can't help but want a true vegan
              scarf that is full of natural and made with natural ingredients.
              The vegan scarf, which is made of organic vegetable material, does
              contain cruelty-free ingredients, so it's really important for you
              to know more about you cat. The scarf comes with a soft,
              comfortable soft satin base, perfect for using in your regular
              sweater tops. It will be one of the most versatile and versatile
              knitwear for your cat. This item is available only from this
              location.
            </p>
            <span id="product-price" data-test-id="product-price">
              9,99
            </span>
            <div id="add-to-cart-wrap">
              <div>
                <button
                  onClick={() => {
                    amount <= 1 ? setAmount(1) : setAmount(amount - 1);
                  }}
                >
                  -
                </button>
                <p>{amount}</p>
                <button onClick={() => setAmount(amount + 1)}>+</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    const currentCookieValue = getParsedCookies('cart');
                    console.log('currentCookieValue', currentCookieValue);

                    if (!currentCookieValue) {
                      setStringifiedCookie('cart', [
                        { id: props.product.id, amount: amount },
                      ]);
                    } else {
                      const foundAmountInCookie = currentCookieValue.find(
                        (productObject) =>
                          productObject.id === props.product.id,
                      );

                      if (!foundAmountInCookie) {
                        currentCookieValue.push({
                          id: props.product.id,
                          amount: amount,
                        });
                        setStringifiedCookie('cart', currentCookieValue);
                      }
                    }
                  }}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </container>
      </section>
    </div>
  );
}

export function getServerSideProps(context) {
  const productId = context.params.productId;
  const products = productsDatabase;

  const currentProduct = products.find((product) => {
    return product.id === productId;
  });

  if (typeof currentProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: currentProduct,
    },
  };
}