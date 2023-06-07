import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex items-center justify-around">
        <img
          src={images[active]}
          alt="animal"
          className="h-[400px] w-[400px] rounded-[50%]"
        />
        <div className="flex flex-wrap">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              // className={index === active ? "active" : ""}
              className={`h-[150px] w-[150px] rounded-[50%] ${
                index === active
                  ? "cursor-not-allowed blur-[1px] grayscale-[50%]"
                  : ""
              }`}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
