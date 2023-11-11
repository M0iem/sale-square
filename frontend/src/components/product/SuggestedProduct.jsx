import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard";


const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productData,setProductData] = useState();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Product you may like as well
          </h2>
          <div className="flex flex-grow flex-wrap justify-center gap-5">
            {productData && productData.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
