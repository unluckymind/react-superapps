import React, { useState, useEffect } from "react";
import Axios from "axios";
import Token from "../../config/secure.json";
import { Card,CardBody,CardTitle,CardImg,CardText,CardSubtitle,Badge,Row,Col } from 'reactstrap';

const ListProduct = () => {
    const [getCount, setCount] = useState([]);
    const [getDescription, setDescription] = useState([]);
//     const [animating, setAnimating] = useState(false);

useEffect(() => {
    product();
}, []);
    
const product = () => {
    const endPoint = "https://api.halosis.app/minishop/product/128?category="+window.location.href.split("=")[1]+"&page=1";
    Axios.get(endPoint, {
        headers: {
            "Authorization": `Bearer ${Token.bearer}`
        }
    }).then(result => 
        // console.log(result),
        // setCount(result.data.data.pagination.count)
        setDescription(result.data.data.products)
    );
};

return (
    <div>
        {/* {console.log(getDescription)} */}
        {getDescription.map( (data, index) => {
            return(
                <Row>
                    <Col>
                        <Card body>
                            <img width="100%" src={data.image} alt="Card image cap" />
                            <CardTitle>{data.name}</CardTitle>
                            <CardText>{data.description}</CardText>
                            <CardText></CardText>
                        </Card>
                    </Col>
                </Row>
            )
        })}
    </div>
  );
};

export default ListProduct;