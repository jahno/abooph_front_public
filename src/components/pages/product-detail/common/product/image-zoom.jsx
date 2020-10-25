import React, { Component } from 'react';
import { PUBLIC_ROUTE } from 'constants/api';

export default class ImageZoom extends Component {
    render() {
        const {image} = this.props;

        return (
            <img src={`${PUBLIC_ROUTE}/${image.chemin}`}  className="img-fluid image_zoom_cls-0" />
        );
    }
}