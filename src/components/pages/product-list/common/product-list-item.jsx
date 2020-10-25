import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { PUBLIC_ROUTE } from 'constants/api';


class ProductItem extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image : img} );
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if(this.state.quantity > 1) {
            this.setState({stock: 'InStock'})
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    plusQty = () => {
        if(this.props.product.stock >= this.state.quantity) {
            this.setState({quantity: this.state.quantity+1})
        }else{
            this.setState({stock: 'Out of Stock !'})
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }

    render() {
        const {product, onAddToCartClicked } = this.props;
        
        return (
                <div className="product-box">
                    <div className="img-wrapper">
                        <div className="lable-block">
                            {/* <span className="lable3">new</span>
                            <span className="lable4">on sale</span> */}
                        </div>
                        <div className="front">
                            <Link to={`${process.env.PUBLIC_URL}/article/${product.id}`} >
                                <img
                                    src={`${PUBLIC_ROUTE}/${this.props.product.images[0].chemin}`}
                                    className="img-fluid"
                                    alt="" 
                                />
                            </Link>
                        </div>
                        <div className="cart-info cart-wrap">
                            <button title="Ajouter au panier" onClick={onAddToCartClicked}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </button>

                            {/* <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked}>
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a> */}

                            <a href="javascript:void(0)" data-toggle="modal"
                               data-target="#quick-view"
                               title="Aperçu rapide"
                               onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i>
                            </a>

                            {/* <Link to={`${process.env.PUBLIC_URL}/compare`} title="Compare" onClick={onAddToCompareClicked}>
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                            </Link> */}
                        </div>
                    </div>
                    <div className="product-detail">
                        <div>
                            <Link to={`${process.env.PUBLIC_URL}/article/${product.id}`}>
                                <h6>{product.nom}</h6>
                            </Link>
                            <h4>{product.prix} F
                                <del><span className="money">{product.prix} F</span></del>
                            </h4>
                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content quick-view-modal">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-6  col-xs-12">
                                            <div className="quick-view-img">
                                                <img 
                                                    src={`${PUBLIC_ROUTE}/${this.props.product.images[0].chemin}`}
                                                    alt="" className="img-fluid" 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 rtl-text">
                                            <div className="product-right">
                                                <h2>{product.nom} </h2>
                                                <h3>{product.prix} F</h3>
                                                
                                                <div className="border-product">
                                                    <h6 className="product-title">détail article</h6>
                                                    <p>{product.description}</p>
                                                </div>
                                                
                                                <div className="product-description border-product">
                                                    <h6 className="product-title">quantité</h6>
                                                    <div className="qty-box">
                                                        <div className="input-group">
                                                              <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                                                 <i className="fa fa-angle-left"></i>
                                                                </button>
                                                              </span>
                                                            <input type="text" name="quantity" value={this.state.quantity}  onChange={this.changeQty} className="form-control input-number" />
                                                                <span className="input-group-prepend">
                                                                <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                                                <i className="fa fa-angle-right"></i>
                                                                </button>
                                                               </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-buttons">
                                                    <button  className="btn btn-solid" onClick={() => onAddToCartClicked(product, this.state.quantity)} >panier</button>
                                                    <Link to={`${process.env.PUBLIC_URL}/article/${product.id}`} className="btn btn-solid">détail</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
        )
    }
}

export default ProductItem;