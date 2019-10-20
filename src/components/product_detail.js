import React, { Component } from 'react';
import { Swiper } from '../../node_modules/swiper/js/swiper.esm';
import {
    Row, Col
} from 'reactstrap'
import Axios from 'axios';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
import Skeleton from 'react-skeleton-loader';

class ProductDetail extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            isLoading: true,
            img: []
        }
    }

    componentDidMount() {
        let parameters = new URLSearchParams(document.location.search.substring(1));
        const endPoint = "https://api.halosis.app/minishop/product/128/detail/"+parameters.get("id")
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo4NDQ2LCJ2ZW5kb3JfaWQiOjEyOCwidmVuZG9yX25hbWUiOiJTYWhhYmF0IEhhbG9zaXMiLCJ2ZW5kb3JfZW1haWwiOiJzYWhhYmF0QGhhbG9zaXMuY28uaWQiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNTY2NDU2Mjg3LCJleHAiOjE1OTgwNzg3NTZ9.VP8sVAMft9uSBE0bDFPll8GpRUCAOLWrt8145Xmm_hzqVZRRywa0R_EbIuAbOLU4AN6kRzNwCgFtJdy1K_reow"
        Axios.get(endPoint, {
            headers: {
                "token": token,
                "Content-Type": "application/json",
                "x-localization": "id"
            }
        }).then(result => this.setState({ products: result.data.data, img: result.data.data.images }));
    }
    
    render() {
        let { products, isLoading, img } = this.state;
        return (
            <div>
                {img.map((p, index) => {
                    return(
                    <div key={index}>
                        <img src={p}/>
                    </div>
                    )
                })}
        </div>
        )
    }
}

export default ProductDetail;