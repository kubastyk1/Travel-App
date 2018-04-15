import React from 'react'
import './styles.css'
import * as types from '../../constants/types'

var slideIndex = 1;

class ImageGallery extends React.Component {

  openModal() {
    this.refs.myModal.style.display = "block";
  }

  closeModal() {
    this.refs.myModal.style.display = "none";
  }

  plusSlides(n) {
    this.showSlides(slideIndex += n);
  }

  currentSlide(n) {
    this.openModal();
    this.showSlides(slideIndex = n);
  }

  showSlides(n) {
    var i;
    var slides = this.refs.mySlides;
    var dots = this.refs.demo;
    var captionText = this.refs.caption;
    if (n > slides.children.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.children.length}
    for (i = 0; i < slides.children.length; i++) {
        slides.children[i].style.display = "none";
    }
    slides.children[slideIndex-1].style.display = "block";
  }

  getMainPageImages() {
    var images = [];
    if (this.props.images) {
      images.push(
        <div key={0} className="column">
          <a onClick={() => {this.currentSlide(1)}} >
            {this.props.images[0] ? <img src={this.props.images[0].imageUrl} className="hover-shadow cursor big-image" alt="Foto"/> :
            <img src={types.DEFAULT_IMAGE} className="hover-shadow cursor big-image" alt="Foto"/>}
          </a>
        </div>
      )
    }
    return images;
  }

  getSmallMainPageImages() {
    var images = [];
    if (this.props.images) {
      this.props.images.forEach(function(image, index) {
        images.push(
          <div key={index} className="column">
            <a onClick={() => {this.currentSlide(index+1)}} >
              {index !== 0 ? (<img src={image.imageUrl} className="hover-shadow cursor small-image" alt="Foto"/>) : (null)}
            </a>
          </div>
        )
      }.bind(this));
    }
    return images;
  }

  getModalImages() {
    var images = [];
    if (this.props.images) {
      if(this.props.images.length != 0) {
        this.props.images.forEach(function(image, index) {
          images.push(
            <div className="mySlides" key={index}>
              <div className="numbertext">{index+1} / {this.props.images.length}</div>
                <img src={image.imageUrl} alt="Foto"/>
            </div>
          )
        }.bind(this));
      } else {
        images.push(
          <div className="mySlides">
            <div className="numbertext">1</div>
              <img src={types.DEFAULT_IMAGE} alt="Foto"/>
          </div>
        )
      }
    }
    return images;
  }

  getDemoImages() {
    var images = [];
    if (this.props.images) {
      this.props.images.forEach(function(image, index) {
        images.push(
          <div className="miniature" key={index}>
            <img className="demo" src={image} onClick={() => {this.currentSlide(1)}} alt="Image description"/>
          </div>
        )
      }.bind(this));
    }
    return images;
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

export default ImageGallery
