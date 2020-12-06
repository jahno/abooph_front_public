import React, { Component } from 'react';
import { IntlActions } from 'react-redux-multilingual'
import Pace from 'react-pace-progress'

// Import custom components
import store from 'store';
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import CartContainer from "containers/CartContainer";
import TopBar from "./common/topbar";
import LogoImage from "./common/logo";
import {changeCurrency, logout} from 'actions'
import {connect} from "react-redux";

class HeaderOne extends Component {

    constructor(props) {
        super(props);

		this.state = {
			isLoading:false
		}
    }
    /*=====================
         Pre loader
         ==========================*/
    componentDidMount() {
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);

        this.setState({ open: true });
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll);
	}
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let number = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number >= 300) {
            if (window.innerWidth < 576) {
                document.getElementById("sticky").classList.remove('fixed');
            }else
            	document.getElementById("sticky").classList.add('fixed');
        } else {
            document.getElementById("sticky").classList.remove('fixed');
        }
    }

    changeLanguage(lang) {
        store.dispatch(IntlActions.setLocale(lang))
	}

    openNav() {
        var openmyslide = document.getElementById("mySidenav");
        if(openmyslide){
            openmyslide.classList.add('open-side')
		}
    }
    openSearch() {
        document.getElementById("search-overlay").style.display = "block";
    }

    closeSearch() {
        document.getElementById("search-overlay").style.display = "none";
    }

	load = ()=>{
		this.setState({isLoading: true});
		fetch().then(()=>{
			// deal with data fetched
			this.setState({isLoading: false})
		})
	};
    
    onSearchSubmit = (e) => {
        e.preventDefault()
        this.closeSearch()
        console.log(this.searchValue)
        this.props.history.push('/galerie', {searchValue: this.searchValue})
    }

    onSearchChange = (e) => {
        const { value } = e.target
        this.searchValue = value
    }
    
	render() {
        console.log('history', this.props)

		return (
			<div>
				<header id="sticky" className="sticky">
					{this.state.isLoading ? <Pace color="#27ae60"/> : null}
					<div className="mobile-fix-option"></div>
					{/*Top Header Component*/}
					<TopBar auth={this.props.auth} logout={this.props.logout}/>

					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="main-menu">
									<div className="menu-left">
										<div className="navbar">
											<a href="javascript:void(0)" onClick={this.openNav}>
												<div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
											</a>
											{/*SideBar Navigation Component*/}
											<SideBar categories={this.props.categories}/>
										</div>
										<div className="brand-logo">
											<LogoImage logo={this.props.logoName} />
										</div>
									</div>
									<div className="menu-right pull-right">
										{/*Top Navigation Bar Component*/}
										<NavBar/>

										<div>
											<div className="icon-nav">
												<ul>
                                                    <li className="onhover-div mobile-search">
														<div>
                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`} 
                                                                onClick={this.openSearch} className="img-fluid" alt="" 
                                                            />
															<i className="fa fa-search" onClick={this.openSearch}></i>
                                                        </div>
													</li>
													{/*Header Cart Component */}
													<CartContainer/>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <form onSubmit={this.onSearchSubmit}>
                                            <div className="form-group">
                                                <input type="text" onChange={this.onSearchChange} className="form-control" id="exampleInputPassword1" placeholder="Recherche" />
                                            </div>
                                            
                                            {/* <div className="form-group">
                                                <select className="form-control">
                                                    <option>Veuilez choisir la categorie</option>
                                                    <option>Abidjan</option>
                                                    <option>Yamoussoukro</option>
                                                </select>
                                            </div> */}
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { changeCurrency, logout })(HeaderOne);
