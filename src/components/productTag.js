import React, { useState, useEffect } from "react";
import Axios from "axios";
import Token from "../../config/secure.json";
import { Card,CardTitle,CardText,Container,Row,Col,Badge } from 'reactstrap';

const ListProduct = () => {
    const [getProducts, setProducts] = useState([]);
    const [getCount, setCount] = useState(0);
    const [getPage, setPage] = useState(0);

useEffect(() => {
    product();
}, [ ]);
    
const product = () => {
    const endPoint = "https://api.halosis.app/minishop/product/128?category="+window.location.href.split("=")[1];
    Axios.get(endPoint, {
        headers: {
            "Authorization": `Bearer ${Token.bearer}`
        }
    }).then(result => {
        setProducts(result.data.data.products)
        setCount(getCount+result.data.data.pagination.count)
        setPage(result.data.data.pagination.from +1)
        }
    );
};

const load = () => {
    const endPoint = "https://api.halosis.app/minishop/product/128?category="+window.location.href.split("=")[1]+"&page="+getPage;
    Axios.get(endPoint, {
        headers: {
            "Authorization": `Bearer ${Token.bearer}`
        }
    }).then(result => {
        setProducts(getProducts.concat(result.data.data.products))
        setCount(getCount+result.data.data.pagination.count)
        console.log(getProducts)
        }
    );
  }

return (
    <div>
        <div style={{ marginLeft:"15px",position:"fixed",zIndex:"999"}}>
            <Badge color="primary" style={{ marginRight:"5px", height:"40px"}}>PRODUCT <br />{getCount}</Badge>
            <Badge color="warning" style={{ height:"40px"}}>CATEGORY <br />{window.location.href.split("=")[1]}</Badge>
        </div>
        <br />
        <br/>
        <Container>
            <Row style={{display:'flex', flexWrap:'warp'}}>
            {getProducts.map( (data, index) => {
                return(
                    <Col xs="6" sm="4">
                        <Card body style={{ border:"none" }}>
                            <img width="100%" src={data.image} alt="Card image cap" style={{ borderRadius: "10px", maxWidth: "100%", maxHeight: "100px"}}/>
                            <Badge color="success" style={{ marginTop:"-30px", width:"100px", marginLeft:"5px"}}>{data.status}</Badge>
                            <br />
                            <CardTitle style={{ fontSize:"12px"}}><b>{data.name}</b></CardTitle>
                            <CardText style={{ textOverflow: "ellipsis",overflow: "hidden", whiteSpace: "nowrap", fontSize: "12px"}}>{data.description}</CardText>
                        </Card>
                    </Col>         
                ) 
            })}
            <button onClick={() => load()}>as</button>
            </Row>
        </Container>
    </div>
  );
};

export default ListProduct;