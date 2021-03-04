import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "../../../../css/Slideshow.css";
import {
  createCookie,
  imageUrlBuilder,
  onPosterError,
} from "../../../../lib/helper";

const Slideshow = ({
  data,
  setCurrentShowType,
  setHomePageLoaded,
  updateLocation,
}) => {
  let showData = [];
  console.log(data.length);
  for (let i = 0; i < data.length; i = i + 4) {
    const item = data[i];
    const secondItem = data[i + 1];
    const thirdItem = data[i + 2];
    const fourthItem = data[i + 3];
    const firstTitle = item.name || item.title;
    const secondTitle = secondItem.name || secondItem.title;
    const thirdTitle = thirdItem.name || thirdItem.title;
    const fourthTitle = fourthItem.name || fourthItem.title;
    showData.push({
      firstImage: imageUrlBuilder(item["poster_path"]),
      secondImage: imageUrlBuilder(secondItem["poster_path"]),
      thirdImage: imageUrlBuilder(thirdItem["poster_path"]),
      fourthImage: imageUrlBuilder(fourthItem["poster_path"]),
      firstId: item.id,
      secondId: secondItem.id,
      thirdId: thirdItem.id,
      fourthId: fourthItem.id,
      firstTitle,
      secondTitle,
      thirdTitle,
      fourthTitle,
    });
  }

  const SlideImage = ({ data }) => {
    const {
      firstImage,
      secondImage,
      thirdImage,
      fourthImage,
      firstId,
      secondId,
      thirdId,
      fourthId,
      firstTitle,
      secondTitle,
      thirdTitle,
      fourthTitle,
    } = data;
    const onClick = (id) => {
      createCookie("showId", id);
      setCurrentShowType();
      setHomePageLoaded(false);
      updateLocation("/");
    };

    const Image = ({ image, title, id }) => (
      <img
        src={image}
        alt={title}
        title={title}
        onError={onPosterError}
        className="slideshow_poster"
        key={title}
        onClick={() => onClick(id)}
      />
    );

    return (
      <section className="each-slide">
        <section className="four-images">
          <Image title={firstTitle} image={firstImage} id={firstId} />
          <Image title={secondTitle} image={secondImage} id={secondId} />
          <Image title={thirdTitle} image={thirdImage} id={thirdId} />
          <Image title={fourthTitle} image={fourthImage} id={fourthId} />
        </section>
      </section>
    );
  };
  return (
    <section className="slideshow">
      <Slide easing="ease" autoplay={true}>
        {showData.map((d) => (
          <SlideImage data={d} />
        ))}
      </Slide>
    </section>
  );
};

export default Slideshow;
