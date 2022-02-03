import React, { PureComponent } from "react";

type info = {
  cluster: boolean;
  oeuvreId: number;
  name: string;
  artist: string;
};

export default class ArtMap extends PureComponent<{ data: info }> {
  render() {
    const { data } = this.props;

    return (
      <div className="popupCard">
        <label className="title" htmlFor="title">
          Oeuvre : {data.name}
        </label>
        <p className="street">Artiste : {data.artist}</p>
      </div>
    );
  }
}
