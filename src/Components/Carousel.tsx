type Props = {
  pictures: [];
  nbPictures: number;
};

function Carousel(props: Props) {
  const { pictures, nbPictures } = props;

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        {nbPictures !== 1 &&
          pictures.map((pic: any, index: any) => {
            if (index === 0) {
              return (
                <button
                  type="button"
                  key={pic.position}
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={index}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
              );
            }
            return (
              <button
                type="button"
                key={pic.position}
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                aria-label="Slide 1"
              />
            );
          })}
      </div>

      <div className="carousel-inner relative w-full overflow-hidden">
        {pictures.map((pic: any, index: any) => {
          if (index === 0) {
            return (
              <div
                key={pic.position}
                className="carousel-item active relative float-left w-full"
              >
                <div className="relative overflow-hidden bg-no-repeat bg-cover">
                  <img
                    src={`/${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                    className="block w-full"
                    alt="Failed to load"
                  />
                  <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
                </div>
              </div>
            );
          }
          return (
            <div
              key={pic.position}
              className="carousel-item relative float-left w-full"
            >
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img
                  src={`/${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                  className="block object-fill w-full"
                  alt="Failed to load"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
          );
        })}
      </div>

      {nbPictures !== 1 && (
        <div>
          <button
            id="btnPrevImg"
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            id="btnNextImg"
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
