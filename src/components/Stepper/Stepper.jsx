import React, { Component } from "react";
import "./Stepper.scss";
class Stepper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      steps: [],
      visited_step: [],
    };
  }
  //Common
  ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  trim(string) {
    return string.replace(/ /g, "");
  }
  componentDidMount() {
    const STEPS = [
      {
        name: "supplier",
        status: "unvisited",
      },
      {
        name: "basic information",
        status: "unvisited",
      },
      {
        name: "language",
        status: "unvisited",
      },
      {
        name: "sample",
        status: "unvisited",
      },
    ];
    this.setState({
      steps: STEPS,
    });
  }
  findIndexStep = (step, steps) =>
    steps.findIndex((step_i) => step_i.name === step.name);

  nextStep = (step) => {
    let { steps } = this.state;
    steps.forEach((step_i) => {
      step_i.status =
        this.findIndexStep(step, steps) > this.findIndexStep(step_i, steps)
          ? "visited"
          : "unvisited";
      if (step_i.name === step.name) {
        step_i.status = "actived";
      }
    });
    this.setState({ steps });
  };

  render() {
    let { steps } = this.state;
    if (Array.isArray(steps) && steps.length > 0) {
      var steps_map = steps.map((step, index) => {
        this[this.trim(step.name)] = React.createRef();
        let cls = step.status === "visited" ? "complete" : "";
        if (step.status === "actived") {
          cls = "active";
        }
        return (
          <li
            ref={(e) => (this[step] = e)}
            key={index}
            className={cls}
            onClick={() => this.nextStep(step)}
          >
            {this.ucfirst(step.name)}
          </li>
        );
      });
    }

    return (
      <React.Fragment>
        <ul className="progressbar">{steps_map ? steps_map : ""}</ul>
      </React.Fragment>
    );
  }
}

export default Stepper;
