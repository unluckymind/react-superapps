import React, { Component } from 'react';
import { Swiper } from '../../node_modules/swiper/js/swiper.esm';
import {
    Row, Col
} from 'reactstrap'
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Axios from 'axios'
import Shuffle from 'shuffle-array'
import Skeleton from 'react-skeleton-loader';

class Product extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            isLoading: true
        }
    }

    Ghosting() {
        return (
            <div>
            <div>
                <Skeleton width="175px" height="100px" style={productStyling.sejajar}/>
            </div>
            <div>
                <Skeleton width="175px" height="100px" style={productStyling.sejajar}/>
            </div>
            </div>
        );
    }

    componentWillMount() {
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
        let { products, isLoading } = this.state
        const params = {
            Swiper,
            shouldSwiperUpdate: true,
            freeMode: true,
            speed: 10,
            setWrapperSize: true,
            spaceBetween: 15,
            width: 135,
            updateOnImagesReady: false,
        }

        return (
            <div style={productStyling.productPage}>
                <div>
                    <h6>Produk Unggulan</h6>
                    <a href="#" style={{ float: "right", marginTop: -35, marginRight: 10 }}>
                        <span style={{ fontSize: 20, fontWeight: 500 }}>{" > "}</span>
                    </a>
                </div>
                    <ReactIdSwiper {...params}>
                    {isLoading ? this.Ghosting() :
                        products.slice(0, 8).map((product, index) => {
                            return (
                                <a href="#" key={index} style={productStyling.hrefElement}>
                                    <div style={{
                                        width: 135,
                                        height: 100,
                                        border: "1px solid #777",
                                        borderRadius: 5,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundImage: `url(${product.images[0]})`,
                                        backgroundRepeat: "no-repeat"
                                    }}>
                                    </div>
                                </a>
                            )
                                })}
                    </ReactIdSwiper>
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
    hrefElement: {
        textDecoration: 'none',
        backgroundColor: 'transparent'
    },
    sejajar: {
        width: "200px",
        height: "200px",
        display: "inline-block",
        marginLeft: "10px"
    }
}

export default Product;