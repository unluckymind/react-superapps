import React, { Component } from 'react';
import { Swiper } from '../../node_modules/swiper/js/swiper.esm';
import {
    Row, Col
} from 'reactstrap'
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Axios from 'axios'
import Shuffle from 'shuffle-array'
import Skeleton from 'react-skeleton-loader';
import RightIcon from 'react-ionicons/lib/IosArrowForward'
import { Link } from "react-router-dom";

class Product extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            products: [],
            isLoading: true,
            params: {
                Swiper,
                shouldSwiperUpdate: true,
                freeMode: true,
                speed: 10,
                setWrapperSize: true,
                spaceBetween: 15,
                width: 135,
                updateOnImagesReady: false,
            }
        }
    }

    Ghosting() {
        const items = []
        for (var i = 0; i < 5; i++) {
            items.push(<div key={i}><Skeleton width="145px" height="100px" /></div>);
        }
        return <ReactIdSwiper {...this.state.params}>
            {items}
        </ReactIdSwiper>
    }

    componentDidMount() {
        const endPoint = "https://api.halosis.app/v1/vendor/product/list?per_page=15"
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo4NDQ2LCJ2ZW5kb3JfaWQiOjEyOCwidmVuZG9yX25hbWUiOiJTYWhhYmF0IEhhbG9zaXMiLCJ2ZW5kb3JfZW1haWwiOiJzYWhhYmF0QGhhbG9zaXMuY28uaWQiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNTY2NDU2Mjg3LCJleHAiOjE1OTgwNzg3NTZ9.VP8sVAMft9uSBE0bDFPll8GpRUCAOLWrt8145Xmm_hzqVZRRywa0R_EbIuAbOLU4AN6kRzNwCgFtJdy1K_reow"
        Axios.get(endPoint, {
            headers: {
                "token": token,
                "Content-Type": "application/json",
                "x-localization": "id"
            }
        }).then(result => this.setState({ products: Shuffle(result.data.data.products), isLoading: false }));
    }

    render() {
        let { products, isLoading, params } = this.state
        return (
            <div style={productStyling.productPage}>
                <div>
                    <p style={productStyling.headerContent}>Menarik Untuk Dijual</p>
                    <span style={{ fontSize: 20, fontWeight: 500, float: "right", marginTop: -35, marginRight: 10 }}><Link to={'/products'}>
                        <RightIcon color="#007BFF" beat={true} />
                    </Link>
                    </span>
                </div>
                {isLoading ? this.Ghosting() :
                    <ReactIdSwiper {...params}>
                        {products.slice(0, 8).map((product, index) => {
                            return (
                                <Link to={('/products/detail?id=' + product.id + '&code=' + product.product_code)} key={index} style={productStyling.hrefElement}>
                                    <div style={{
                                        width: 125,
                                        height: 80,
                                        border: "1px solid #999999",
                                        borderRadius: 5,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${product.images[0]})`,
                                        backgroundRepeat: "no-repeat"
                                    }}>
                                    </div>
                                </Link>
                            )
                        })}
                    </ReactIdSwiper>
                }
            </div>
        )
    }
}

const productStyling = {
    productPage: {
        margin: "15px 0 15px 0",
    },
    productImage: {
        width: 125,
        height: 100,
        borderRadius: 5,
    },
    headerContent: {
        fontSize: "1.1em",
        color: "#353535",
        fontWeight: "500",
        marginBottom: 5
    },
    hrefElement: {
        textDecoration: 'none',
        backgroundColor: 'transparent'
    }
}

export default Product;