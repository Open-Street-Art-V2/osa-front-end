/* eslint-disable */
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { AiFillDelete } from "react-icons/ai";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

type PicsFiles = {
  image1File: string;
  image2File: string;
  image3File: string;
};

function FileUpload(props: any) {
  const [images, setImages] = useState([]);
  const [imagesFiles, setImagesFiles] = useState<PicsFiles>({
    image1File: "",
    image2File: "",
    image3File: "",
  });

  const handleImagesChange = ({ target }: any) => {
    setImages([]);
    setImagesFiles({
      image1File: "",
      image2File: "",
      image3File: "",
    });

    setImages(target.files);
    props.getImages(target.files);
    console.log(target.files.length);
    if (target.files.length > 0) {
      setImagesFiles((prevState) => ({
        ...prevState,
        image1File: URL.createObjectURL(target.files[0]),
      }));
    }
    if (target.files.length > 1) {
      setImagesFiles((prevState) => ({
        ...prevState,
        image2File: URL.createObjectURL(target.files[1]),
      }));
    }
    if (target.files.length > 2) {
      setImagesFiles((prevState) => ({
        ...prevState,
        image3File: URL.createObjectURL(target.files[2]),
      }));
    }
  };

  const handleImagesChange1 = ({ target }: any) => {
    let newArr = [...images] as any;
    newArr[0] = target.files[0];
    setImages(newArr);
    props.updateImage(newArr);
    setImagesFiles((prevState) => ({
      ...prevState,
      image1File: URL.createObjectURL(target.files[0]),
    }));
  };

  const handleImagesChange2 = ({ target }: any) => {
    let newArr = [...images] as any;
    newArr[1] = target.files[1];
    setImages(newArr);
    props.updateImage(newArr);
    setImagesFiles((prevState) => ({
      ...prevState,
      image2File: URL.createObjectURL(target.files[0]),
    }));
  };

  const handleImagesChange3 = ({ target }: any) => {
    let newArr = [...images] as any;
    newArr[2] = target.files[2];
    setImages(newArr);
    props.updateImage(newArr);
    setImagesFiles((prevState) => ({
      ...prevState,
      image3File: URL.createObjectURL(target.files[0]),
    }));
  };

  const addImage = ({ target }: any) => {
    let imageState = [] as any;
    if (images.length === 1) {
      imageState[0] = images[0];
      imageState[1] = target.files[0];
      setImages(imageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: URL.createObjectURL(target.files[0]),
        image3File: "",
      });
      props.addImage(imageState);
    } else if (images.length === 2) {
      imageState[0] = images[0];
      imageState[1] = images[1];
      imageState[2] = target.files[0];
      setImages(imageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: imagesFiles.image2File,
        image3File: URL.createObjectURL(target.files[0]),
      });
      props.addImage(imageState);
    }
  };

  function removeImage1() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    if (ImageState.length === 1) {
      setImages([]);
      setImagesFiles({
        image1File: "",
        image2File: "",
        image3File: "",
      });
      props.removeImage(newImageState);
    } else if (ImageState.length === 2) {
      newImageState[0] = ImageState[1];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image2File,
        image2File: "",
        image3File: "",
      });
      props.removeImage(newImageState);
    } else if (ImageState.length === 3) {
      newImageState[0] = ImageState[1];
      newImageState[1] = ImageState[2];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image2File,
        image2File: imagesFiles.image3File,
        image3File: "",
      });
      props.removeImage(newImageState);
    }
  }
  function removeImage2() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    if (ImageState.length === 2) {
      newImageState[0] = ImageState[0];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: "",
        image3File: "",
      });
      props.removeImage(newImageState);
    } else if (ImageState.length === 3) {
      newImageState[0] = ImageState[0];
      newImageState[1] = ImageState[2];
      setImages(newImageState);
      setImagesFiles({
        image1File: imagesFiles.image1File,
        image2File: imagesFiles.image3File,
        image3File: "",
      });
      props.removeImage(newImageState);
    }
  }
  function removeImage3() {
    let ImageState = [...images] as any;
    let newImageState = [] as any;
    newImageState[0] = ImageState[0];
    newImageState[1] = ImageState[1];
    setImages(newImageState);
    setImagesFiles({
      image1File: imagesFiles.image1File,
      image2File: imagesFiles.image2File,
      image3File: "",
    });
    props.removeImage(newImageState);
  }
  return (
    <>
      <div className="flex justify-center ">
        {images.length === 0 && (
          <div className="rounded-full bg-gray-100 w-12 ">
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                onChange={handleImagesChange}
                type="file"
                multiple
                required
                hidden
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera sx={{ color: "#3a4551", fontSize: 23 }} />
              </IconButton>
            </label>
          </div>
        )}
        {(images.length === 1 || images.length === 2) && (
          <div className="rounded-full bg-gray-100 w-12">
            <label htmlFor="icon-add-file">
              <Input
                accept="image/*"
                onChange={addImage}
                hidden
                id="icon-add-file"
                type="file"
              />
              <IconButton aria-label="icon-add-file" component="span">
                <AddAPhotoRoundedIcon sx={{ color: "#3a4551", fontSize: 23 }} />
              </IconButton>
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-center grid-col-2 gap-2 content-around py-2">
        {imagesFiles.image1File && (
          <div>
            <Avatar
              variant={"rounded"}
              alt=""
              src={`${imagesFiles.image1File}`}
              sx={{ width: 180, height: 180 }}
            ></Avatar>
            <div className="text-center md:text-left m-0 bg-gray-100 rounded-b-lg">
              <div className="py-2">
                <label
                  htmlFor="icon-button-delelte-file1"
                  className="my-0 mr-4"
                >
                  <IconButton
                    aria-label="delelte picture"
                    component="span"
                    onClick={removeImage1}
                  >
                    <AiFillDelete className="fill-red-500" />
                  </IconButton>
                </label>
                <label htmlFor="icon-button-file1" className="my-0 ml-0">
                  <input
                    accept="image/*"
                    id="icon-button-file1"
                    onChange={handleImagesChange1}
                    type="file"
                    name="file1"
                    required
                    hidden
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        )}
        {imagesFiles.image2File && (
          <div>
            <Avatar
              variant={"rounded"}
              alt=""
              src={`${imagesFiles.image2File}`}
              sx={{ width: 180, height: 180 }}
            ></Avatar>
            <div className="text-center md:text-left m-0 bg-gray-100 rounded-b-lg">
              <div className="py-2">
                <label
                  htmlFor="icon-button-delelte-file1"
                  className="my-0 mr-4"
                >
                  <IconButton
                    aria-label="delelte picture"
                    component="span"
                    onClick={removeImage2}
                  >
                    <AiFillDelete className="fill-red-500" />
                  </IconButton>
                </label>
                <label htmlFor="icon-button-file2" className="my-0 ml-0">
                  <input
                    accept="image/*"
                    id="icon-button-file2"
                    onChange={handleImagesChange2}
                    type="file"
                    name="file1"
                    required
                    hidden
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center  content-around py-2">
        {imagesFiles.image3File && (
          <div>
            <Avatar
              variant={"rounded"}
              alt=""
              src={`${imagesFiles.image3File}`}
              sx={{ width: 180, height: 180 }}
            ></Avatar>
            <div className="text-center md:text-left m-0 bg-gray-100 rounded-b-lg">
              <div className="py-2">
                <label htmlFor="icon-button-delelte-file" className="my-0 mr-4">
                  <IconButton
                    aria-label="delelte picture"
                    component="span"
                    onClick={removeImage3}
                  >
                    <AiFillDelete className="fill-red-500" />
                  </IconButton>
                </label>
                <label htmlFor="icon-button-file3" className="my-0 ml-0">
                  <input
                    accept="image/*"
                    id="icon-button-file3"
                    onChange={handleImagesChange3}
                    type="file"
                    name="file1"
                    required
                    hidden
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUpload;
