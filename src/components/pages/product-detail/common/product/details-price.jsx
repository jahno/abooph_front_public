import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class DetailsWithPrice extends Component {

    constructor (props) {
        super (props)
        this.state = {
            open:false,
            quantity:1,
            stock: 'InStock',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({
            nav3: this.slider3
        });
    }

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        this.setState({quantity: this.state.quantity+1})
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render (){
        const {item, addToCartClicked, BuynowClicked} = this.props

        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.nom} </h2>
                    <h4><del>{item.prix_barre} F</del> {item.prix} F</h4>
                    <div className="product-description border-product">
                        <h6 className="product-title">couturier</h6>
                        <Link to={`${process.env.PUBLIC_URL}/couturier/${item.couturier_id}`} style={{color: 'red', cursor: 'pointer'}}>{item.couturier.nom} {item.couturier.prenom}</Link>
                        <br/><br/>

                        <h6 className="product-title">quantité</h6>
                        <div className="qty-box">
                            <div className="input-group">
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                     <i className="fa fa-angle-left"></i>
                                    </button>
                                </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                <i className="fa fa-angle-right"></i>
                                </button>
                               </span>
                            </div>
                        </div>
                    </div>
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => addToCartClicked(item, this.state.quantity)}>Ajouter au panier</a>
                        <Link to={`${process.env.PUBLIC_URL}/caisse`} className="btn btn-solid" onClick={() => BuynowClicked(item, this.state.quantity)} >acheter</Link>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">détail</h6>
                        <p>{item.description}</p>
                    </div>
                    </div>
            </div>
        )
    }
}


export default DetailsWithPrice;