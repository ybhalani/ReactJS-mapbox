import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "../src/index";
import route from "./route.json";
import config from "./config.json";

const { accessToken, style } = config;

const containerStyle = {
  height: "100vh",
  width: "100%"
};

const polygonCoords = [[
  [37.774929512,-122.41941550000001],
  [37.774929534,-122.41941550001000],
  [38.77492954534,-123.41941550002001],
  [38.77492956789,-123.41941550003001],
  [39.774929587767,-124.41941550004001],
  [39.7749295432,-124.41941550005001]
]];

const multiPolygonCoords = [
  [[
  [37.774929512,-122.41941550000001],
  [37.774929534,-122.41941550001000],
  [38.77492954534,-123.41941550002001],
  [38.77492956789,-123.41941550003001],
  [39.774929587767,-124.41941550004001],
  [39.7749295432,-124.41941550005001]
  ]],
  [[

  [37.774929512,-122.41941550000001],
  [37.774929534,-122.41941550001000],
  [38.77492954534,-123.41941550002001],
  [38.77492956789,-123.41941550003001],
  [39.774929587767,-124.41941550004001],
  [39.7749295432,-124.41941550005001]  ]]
];

const markerCoord = [
  37.7749295,
  -122.41941550000001
];

const mappedRoute = route.points.map(point => [ point.lat, point.lng ]);

export default class AllShapes extends Component {

  state = {
    popup: null,
    center: [0.2174037, 51.6476704],
    circleRadius: 30,
    routeIndex: 0
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        center: [-0.120736, 51.5118219],
        circleRadius: 10
      });
    }, 6000);

    setInterval(() => {
      this.setState({
        routeIndex: this.state.routeIndex + 1
      });
    }, 8000);
  }

  _onClickMarker = ({ feature }) => {
    this.setState({
      center: feature.geometry.coordinates
    });
  };

  _onClickMap(map) {
    console.log("Clicked on the map : ", map);
  }

  _onStyleLoad(map) {
    console.log("Style loaded: ", map);
  }

  _onHover({ map }) {
    map.getCanvas().style.cursor = "pointer";
  }

  _onEndHover({ map }) {
    map.getCanvas().style.cursor = "";
  }

  _polygonClicked = ({ feature }) => {
    console.log("Polygon clicked", feature.geometry.coordinates);
  };

  render() {
    return (
      <ReactMapboxGl
        style={style}
        onClick={this._onClickMap}
        onStyleLoad={this._onStyleLoad}
        accessToken={accessToken}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={containerStyle}>
        <Layer
          type="symbol"
          layout={{ "icon-image": "harbor-15" }}>
          <Feature
            coordinates={markerCoord}
            onHover={this._onHover}
            onEndHover={this._onEndHover}
            onClick={this._onClickMarker}/>
        </Layer>

        <Layer
          type="line"
          layout={{ "line-cap": "round", "line-join": "round" }}
          paint={{ "line-color": "#4790E5", "line-width": 12 }}>
          <Feature coordinates={mappedRoute}/>
        </Layer>

        <Layer
          type="circle"
          paint={{ "circle-radius": this.state.circleRadius, "circle-color": "#E54E52", "circle-opacity": .8 }}>
          <Feature coordinates={mappedRoute[this.state.routeIndex]}/>
        </Layer>

        <Layer
          type="fill"
          paint={{ "fill-color": "#6F788A", "fill-opacity": .7 }}>
          <Feature
            onClick={this._polygonClicked}
            coordinates={polygonCoords}/>
        </Layer>

        <Layer
          type="fill"
          paint={{ "fill-color": "#3bb2d0", "fill-opacity": .5 }}>
          <Feature
            onClick={this._polygonClicked}
            coordinates={multiPolygonCoords}/>
        </Layer>

      </ReactMapboxGl>
    );
  }
}
