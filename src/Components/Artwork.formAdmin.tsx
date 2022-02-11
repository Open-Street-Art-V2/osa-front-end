/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import IconButton from "@material-ui/core/IconButton";

const schema = yup.object().shape({
  title: yup.string().required(),
  artist: yup.string().required(),
  description: yup.string().required(),
  pictures: yup
    .mixed()
    .test("required", "You need to provide a file", (value) => {
      return value && value.length;
    })
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test("type", "We only support jpeg/png", function (value) {
      return (
        value &&
        value[0] &&
        (value[0].type === "image/jpeg" || value[0].type === "image/png")
      );
    }),
});

function CreateArtWork() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const CHARACTER_LIMIT = 300;
  const [values, setValues] = React.useState({
    name: "",
  });
  const handleChange = (name: any) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className="flex items-center justify-center pt-8">
      <div className="text-center">
        <p className="pb-14 pt-12 font-sans text-2xl font-bold ">
          Ajouter une oeuvre
        </p>
        <form onSubmit={onSubmit}>
          <div className="px-9 pb-4">
            <input
              {...register("title")}
              type="text"
              id="title"
              name="title"
              className=" block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm drop-shadow-lg "
              placeholder="Nom de l'oeuvre*"
            />
            {errors.title && (
              <div className="mr-52 pt-1 text-red-600">Enter a title</div>
            )}
          </div>

          <div className="px-9 pb-4">
            <input
              {...register("artist")}
              type="text"
              id="artist"
              name="artist"
              className="@error('artist') @enderror block w-80 rounded-lg border  border-gray-300 bg-gray-50 p-2.5  text-sm drop-shadow-lg  "
              placeholder="Artiste*"
            />
            {errors.artist && (
              <div className="mr-48 pt-1 text-red-600">Enter an artiste</div>
            )}
          </div>

          <div className="px-9 pb-4">
            <textarea
              {...register("description")}
              name="description"
              id="description"
              maxLength={CHARACTER_LIMIT}
              className="@error('description') @enderrorblock h-32 w-80  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm drop-shadow-lg "
              placeholder="Description de l'oeuvre*"
              onChange={handleChange("name")}
            />
            <div className="grid-cols-2">
              {errors.description && (
                <div className="mr-44 pt-1 text-red-600">
                  Enter a description
                </div>
              )}
              <p className="pl-64 pt-1 text-sm text-gray-400 ">
                {values.name.length}/{CHARACTER_LIMIT}
              </p>
            </div>
          </div>

          <Divider variant="middle" />
          <div>
            <p className=" pb-2 pr-20 pt-4 font-sans text-xl font-semibold ">
              Ajouter des photos
            </p>
          </div>

          <div>
            <div className="pb-1">
              <input
                {...register("pictures")}
                accept="image/*"
                id="icon-button-file"
                type="file"
                multiple
                style={{ display: "none" }}
              />

              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <ImageIcon sx={{ fontSize: 35 }} />
                </IconButton>
              </label>

              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <ImageIcon sx={{ fontSize: 35 }} />
                </IconButton>
              </label>

              <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span">
                  <ImageIcon sx={{ fontSize: 35 }} />
                </IconButton>
              </label>

              {errors.pictures && (
                <div className="text-red-600">{errors.pictures.message}</div>
              )}
            </div>
          </div>

          <div className="px-9 pb-3">
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "#3a4551",
                padding: "12px 40px",
                fontSize: "13px",
                color: "white",
              }}
              variant="contained"
              endIcon={<MyLocationIcon />}
            >
              Saisir la position
            </Button>
          </div>

          <Divider variant="middle" />

          <div className="px-9 pb-3 pt-4">
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "#00ab55",
                padding: "12px 70px",
                fontSize: "13px",
                color: "white",
              }}
              type="submit"
              variant="contained"
            >
              Valider
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArtWork;
