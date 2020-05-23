import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// item - functional component
const Item = (props) => (
  <div class="card-deck col-md-4 my-3">
    <div class="card h-100">
      <img
        class="card-img-top"
        src={`/items/${props.item._id}/itemPhoto`}
        alt=""
      />
      <div class="card-body">
        <div class="text-center">
          <Link to={`/items/${props.item._id}`} class="text-decoration-none">
            view item
          </Link>
        </div>
        <h5 class="card-title">{props.item.itemName}</h5>
        {(props.item.discountedPrice < props.item.totalPrice && (
          <div class="float-right">
            <del class="card-text text-dark">Rs.{props.item.totalPrice}.00</del>
            <h5 class="card-text text-primary">
              Rs.{props.item.discountedPrice}
            </h5>
          </div>
        )) || (
            <div class="float-right">
              <br />
              <h5 class="card-text text-primary">
                Rs.{props.item.discountedPrice}.00
            </h5>
            </div>
          )}
      </div>
      <div class="card-footer">
        <div class="inline">
          <div class="float-right">
            <Link to={`/cartCheckout`}>
                <button class="btn ThemeBackground">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Category = (props) => (
  <button class="ThemeBackground dropdown-item" onClick={props.sort}>
    {props.category.categoryName}
  </button>
);


export default class Shop extends Component {
  //constructor
  constructor(props) {
    super(props);

    // declaring this state
    this.state = {
      items: [],
      categories: [],
      itemPhoto: null,
      itemName: '',
      totalPrice : '',
      loading: false
    };
  }

  //list all categories
  componentDidMount() {

    // set state
    this.setState({
      loading: true,
    });

    // get items from server
    axios
      .get("/items/")
      .then((response) => {
        this.setState({
          items: response.data,
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // get categories from server
    axios
      .get("/itemCategories")
      .then((response) => {
        this.setState({
          categories: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  //map to list items
  ItemList() {
    return this.state.items.map((currentItem) => {
      return <Item item={currentItem} key={currentItem.id} />;
    });
  }

  // map to list category
  CategoryList() {
    return this.state.categories.map((currentCategory) => {
      return (
        <Category
          key={currentCategory._id}
          category={currentCategory}
          sort={() => {
            // set state
            this.setState({
              loading: true,
            });

            // send request to server and get items back
            axios.get("/items/").then((response) => {
              // modifying set state
              this.setState({
                // filter items each onclick
                items: response.data.filter((item) => {
                  return (
                    currentCategory.categoryName === item.category.categoryName
                  );
                }),
                loading: false
              });
            });
          }}
        />
      );
    });
  }

  loading() {
    return (
      <div class="text-center my-5">
        <div class="spinner-border" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  render() {

    if (this.state.loading) {
      return (
        this.loading()
      )
    } else {

      return (
        <div className="container margin-top">
          <ul className="nav justify-content-end">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle ThemeText"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                filter by category
            </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="/shop">
                  All
              </a>
                {this.CategoryList()}
              </div>
            </li>
          </ul>

          <div className="my-5 row">{this.ItemList()}</div>

          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <Link class="page-link ThemeText" href="#">
                  First
              </Link>
              </li>
              <li className="page-item">
                <Link class="page-link ThemeText" href="#">
                  Previous
              </Link>
              </li>
              <li className="page-item">
                <Link class="page-link ThemeText" href="#">
                  Next
              </Link>
              </li>
              <li className="page-item">
                <Link class="page-link ThemeText" href="#">
                  Last
              </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}
