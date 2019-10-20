import React, { Component } from "react";
import { Badge } from 'reactstrap';
import axios from "axios";
import Token from "../../config/secure.json";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.ProductTag = this.ProductTag.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "https://dev.api.halosis.id/v1/categories",
      // url: "http://localhost:3000/v3/products/list/tag",
      headers: {
        "Authorization" : `Bearer ${Token.bearer}`,
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }).then(result =>
      this.setState({ list: result.data.payload.data })
    );
  }

  ProductTag(event) {
    window.location = '/product?tag='+ event + ''
  }

  render() {
    const ListCategory = this.state.list;
    return (
      <div>
        <div>KATEGORI</div>
        <div>
          {ListCategory.filter(filters => {
            return filters.total_product > 4}).map((data, index) => {
              return (
                <a key={data.id}>
                  <Badge onClick={() => this.ProductTag(data.category_name)} color="secondary" pill style={Margin}>{data.category_name}{" ("}{data.total_product}{")"}</Badge>
                </a>
              )
            })
          }
        </div>
      </div>
    );
  };
};

const Margin = {
  margin: "3px",
  padding: "10px 16px",
  border: "35px"
}

export default Category;
