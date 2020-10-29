import React, {Component} from 'react';
import { connect } from 'react-redux'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { SlideToggle } from 'react-slide-toggle';


import {getBrands, getColors, getMinMaxPrice} from 'services';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            openFilter: false
        }
    }

    closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -365px";
    }
    
    clickBrandHendle(event, brands) {

        var index = brands.indexOf(event.target.value);
        if (event.target.checked)
            brands.push(event.target.value); // push in array checked value
        else
            brands.splice(index, 1); // removed in array unchecked value

        this.props.filterCategory(brands);
    }

    colorHandle(event, color){
        var elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function(el) {
            el.classList.remove("active");
        });
        event.target.classList.add('active');
        this.props.filterColor(color)
    }

    render (){

        const { 
            categories, 
            parentCategory,
            childCategories, 
            selectParentCategory, 
            selectChildCategories,
            minPrice, maxPrice,
            filterPrice,
            initMinPrice,
            initMaxPrice
        } = this.props
        
        return (
            <div className="collection-filter-block">
                {/*brand filter start*/}
                <div className="collection-mobile-back">
                    <span className="filter-back" onClick={(e) => this.closeFilter(e)} >
                        <i className="fa fa-angle-left" aria-hidden="true"></i> retour
                    </span>
                </div>
                
                {categories.map((category, index) => {
                    return(
                        <SlideToggle key={category.id}>
                            {({onToggle, setCollapsibleElement}) => {
                                const isSelected =  parentCategory.id === category.id
                                return(
                                    <div className="collection-collapse-block">
                                        <h3 
                                            className="collapse-block-title" 
                                            style={{
                                                color: isSelected ? 'rgb(255, 76, 59)' : "",
                                                fontWeight: isSelected ? 'bold' : "",
                                            }} 
                                            onClick={() => {
                                                selectParentCategory(category)
                                                // onToggle()
                                            }}
                                        >
                                            {category.nom}
                                        </h3>
                                        <div className="collection-collapse-block-content"  ref={setCollapsibleElement}>
                                            <div className="collection-brand-filter">
                                                {category.children.map((child, index) => {
                                                    return (
                                                        <div className="custom-control custom-checkbox collection-filter-checkbox" key={child.id}>
                                                            <input 
                                                                type="checkbox" 
                                                                onClick={(e) => selectChildCategories(child)} 
                                                                value={child.id} 
                                                                checked={childCategories.findIndex(cat => cat.id == child.id) != -1} 
                                                                className="custom-control-input" 
                                                                id={child.id} 
                                                                // disabled={child.parent_id!= parentCategory.id} 
                                                            />

                                                            <label className="custom-control-label" htmlFor={child.id}>
                                                                {child.nom}
                                                            </label>
                                                        </div> 
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                        </SlideToggle>
                    )
                })}
                
                {/*price filter start here */}
                <SlideToggle>
                    {({onToggle, setCollapsibleElement}) => (
                        <div className="collection-collapse-block open">
                            <h3 className="collapse-block-title" onClick={onToggle}>prix</h3>
                            <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                                <div className="collection-brand-filter">
                                    <div className="custom-control custom-checkbox collection-filter-checkbox">
                                        <InputRange
                                            maxValue={initMaxPrice}
                                            minValue={initMinPrice}
                                            value={{min: minPrice, max: maxPrice}}
                                            onChange={value => filterPrice({ value })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SlideToggle>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    prices: getMinMaxPrice(state.data.products),
})

export default connect(
    mapStateToProps
)(Filter);