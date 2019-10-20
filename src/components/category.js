import React, { Component } from "react";
import { Badge } from 'reactstrap';
import axios from "axios";
import Token from "../../config/secure.json";
import RightIcon from 'react-ionicons/lib/IosArrowForward'
import { Link } from "react-router-dom";


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "https://stg.api.halosis.id/v1/categories",
      // url: "http://localhost:3000/v3/products/list/tag",
      headers: {
        "Authorization": `Bearer ${Token.bearer}`,
        "Acces-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }).then(result =>
      this.setState({ list: result.data.payload.data })
    );
  }

  render() {
    const ListCategory = this.state.list;
    return (
      <div style={categoryStyling.mainPage}>
        <div>
          <p style={categoryStyling.headerContent}>Kategori Unggulan</p>
          <span style={{ fontSize: 20, fontWeight: 500, float: "right", marginTop: -35, marginRight: 10 }}>
            <Link to={'/categories'}>
              <RightIcon color="#007BFF" beat={true} />
            </Link>
          </span>
        </div>
        <div>
          {ListCategory.filter(filters => {
            return filters.total_product > 4
          }).map((data, index) => {
            return (
              <Link key={data.id} to={'/product?tag=' + data.category_name}>
                <Badge color="secondary" pill style={categoryStyling.badgeContent}>{data.category_name}{" ("}{data.total_product}{")"}</Badge>
              </Link>
            )
          })
          }
        </div>
      </div>
    );
  };
};

const categoryStyling = {
  mainPage: {
    margin: "1px 0 15px 0",
  },
  headerContent: {
    fontSize: "1.1em",
    color: "#353535",
    fontWeight: "500",
    marginBottom: 5
  },
  badgeContent: {
    margin: "5px",
    padding: "10px 16px",
    border: "35px",
    fontSize: ".9em",
    fontWeight: "100",
    backgroundColor: "#e8d7ff",
    color: "#000",
    borderRadius: 10,
  }
}

export default Category;
