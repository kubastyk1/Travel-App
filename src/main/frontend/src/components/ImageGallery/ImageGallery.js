import React, { Component } from 'react'
import { string, object, number, bool, array, oneOfType } from 'prop-types'

import './styles.css'
import * as types from '../../constants/types'

var slideIndex = 1;
export default class ImageGallery extends Component {

  static propTypes = {
    images: array
  }

  openModal = (e) => {
    this.refs.myModal.style.display = "block";
  }

  closeModal = (e) => {
    this.refs.myModal.style.display = "none";
  }

  plusSlides = (n) => {
    this.showSlides(slideIndex += n);
  }

  currentSlide = (n) => {
    this.openModal();
    this.showSlides(slideIndex = n);
    this.showSlides();
  }

  showSlides = (n) =>  {
    var i;
    var slides = this.refs.mySlides;
    var dots = this.refs.demo;
    var captionText = this.refs.caption;
    if (n > slides.children.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.children.length}
    for (i = 0; i < slides.children.length; i++) {
        slides.children[i].style.display = "none";
    }
    slides.children[slideIndex - 1].style.display = "block";
  }

  getMainPageImages = (e) => {
    const { images } = this.props

    var mainImages = [];
    if (images) {
      mainImages.push(
        <div key={0} className="column">
          <a onClick={() => {this.currentSlide(1)}} >
            {images[0] ? <img src={images[0].imageUrl} className="hover-shadow cursor big-image" alt="Foto"/> :
            <img src={types.DEFAULT_IMAGE} className="hover-shadow cursor big-image" alt="Foto"/>}
          </a>
        </div>
      )
    }
    return mainImages;
  }

  getSmallMainPageImages = (e) => {
    const { images } = this.props

    var smallImages = [];
    if (images) {
      images.forEach(function(image, index) {
        smallImages.push(
          <div key={index} className="column">
            <a onClick={() => {this.currentSlide(index+1)}} >
              {index !== 0 ? (<img src={image.imageUrl} className="hover-shadow cursor small-image" alt="Foto"/>) : (null)}
            </a>
          </div>
        )
      }.bind(this));
    }
    return smallImages;
  }

  getModalImages = (e) => {
    const { images } = this.props

    var modalImages = [];
    if (images) {
      if(images.length != 0) {
        images.forEach(function(image, index) {
          modalImages.push(
            <div className="mySlides" key={index}>
              <div className="numbertext">{index+1} / {images.length}</div>
                <img src={image.imageUrl} alt="Foto"/>
            </div>
          )
        }.bind(this));
      } else {
        modalImages.push(
          <div className="mySlides">
            <div className="numbertext">1</div>
              <img src={types.DEFAULT_IMAGE} alt="Foto"/>
          </div>
        )
      }
    }
    return modalImages;
  }

  getDemoImages = () => {
    const { images } = this.props

    var demoImages = [];
    if (images) {
      images.forEach(function(image, index) {
        demoImages.push(
          <div className="miniature" key={index}>
            <img className="demo" src={image} onClick={() => {this.currentSlide(1)}} alt="Image description"/>
          </div>
        )
      }.bind(this));
    }
    return demoImages;
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.getMainPageImages()}
          <div className="icons">
            {this.getSmallMainPageImages()}
          </div>
        </div>

        <div ref="myModal" className="modal">
          <div className="imagelightbox-overlay"></div>
          <span className="close cursor" onClick={() => {this.closeModal()}}>&times;</span>
          <div className="modal-content">
            <div ref="mySlides">
              {this.getModalImages()}
            </div>
          </div>
          <a className="prev" onClick={() => {this.plusSlides(-1)}}>&#10094;</a>
          <a className="next" onClick={() => {this.plusSlides(1)}}>&#10095;</a>
        </div>
      </div>
    );
  };
}
