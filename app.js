import "raf/polyfill";
import React from "react";
import { render } from "react-dom";
import Main from "./src/main";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-id-swiper/lib/styles/css/swiper.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faEye);


render(<Main />, document.getElementById("root"));
