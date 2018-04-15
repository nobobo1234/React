import React, { Component } from "react";

import Order from "./../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    async componentDidMount() {
        const response = await axios
            .get("/orders.json")
            .catch(() => this.setState({ loading: false }));
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    );
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
