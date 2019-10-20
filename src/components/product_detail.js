import React, { Component } from 'react';
import { Swiper } from '../../node_modules/swiper/js/swiper.esm';
import {
    Row, Col
} from 'reactstrap'
import ReactIdSwiper from 'react-id-swiper/lib/ReactIdSwiper.custom';
import Axios from 'axios'
import Shuffle from 'shuffle-array'
import Skeleton from 'react-skeleton-loader';

class ProductDetail extends Component {
    constructor() {
        super()
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

    render() {
        let { products, isLoading, params } = this.state
        console.log('ini adalah parameter '+match.params.id)
        return (
            <div>
                ini adalah product detail
            </div>
        )
    }
}

export default ProductDetail;