import React, {Component} from 'react';

class FilterBar extends Component {

    //List Layout View
    listLayout(){
        document.querySelector(".collection-grid-view").style = "opacity:0";
        document.querySelector(".product-wrapper-grid").style = "opacity:0.2";
        document.querySelector(".product-wrapper-grid").classList.add("list-view");
        var elems = document.querySelector(".infinite-scroll-component .row").childNodes;
        [].forEach.call(elems, function(el) {
            el.className = '';
            el.classList.add('col-lg-12');
        });
        setTimeout(function(){
            document.querySelector(".product-wrapper-grid").style = "opacity: 1";
        }, 500);
    }

    //Grid Layout View
    gridLayout(){
        document.querySelector(".collection-grid-view").style = "opacity:1";
        document.querySelector(".product-wrapper-grid").classList.remove("list-view");
        var elems = document.querySelector(".infinite-scroll-component .row").childNodes;
        [].forEach.call(elems, function(el) {
            el.className = '';
            el.classList.add('col-lg-3');
        });
    }

    // Layout Column View
    LayoutView = (colSize) =>{
        if(!document.querySelector(".product-wrapper-grid").classList.contains("list-view")) {
            var elems = document.querySelector(".infinite-scroll-component .row").childNodes;
            [].forEach.call(elems, function(el) {
                el.className = '';
                el.classList.add('col-lg-'+colSize);
            });
        }

        this.props.onLayoutViewClicked(colSize);
    }

    render (){
        return (
            <div className="product-filter-content">
                <div className="search-count">
                    <h5>Affichage des produits 1-{this.props.products.length} Résultat</h5>
                </div>
                {/* <div className="collection-view">
                    <ul>
                        <li><i
                            className="fa fa-th grid-layout-view" onClick={this.gridLayout}></i>
                        </li>
                        <li><i
                            className="fa fa-list-ul list-layout-view" onClick={this.listLayout}></i>
                        </li>
                    </ul>
                </div>
                <div className="collection-grid-view">
                    <ul>
                        <li>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/2.png`}
                                alt=""
                                className="product-2-layout-view" onClick={() => this.LayoutView(6)} />
                        </li>
                        <li>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/3.png`}
                                alt=""
                                className="product-3-layout-view" onClick={() => this.LayoutView(4)} />
                        </li>
                        <li>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/4.png`}
                                alt=""
                                className="product-4-layout-view" onClick={() => this.LayoutView(3)} />
                        </li>
                        <li>
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon/6.png`}
                                alt=""
                                className="product-6-layout-view" onClick={() => this.LayoutView(2)} />
                        </li>
                    </ul>
                </div>
                <div className="product-page-filter">
                    <select>
                        {this.props.products.map(product => {
                            return (
                                <option 
                                    key={product.id} 
                                    value={product.id}
                                >
                                    {product.nom} ({product.prix} F)
                                </option>
                            )
                        })}
                    </select>
                </div>
             */}
            </div>
        )
    }
}

export default FilterBar;