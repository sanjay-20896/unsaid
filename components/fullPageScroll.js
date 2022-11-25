import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
// import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true

const originalColors = ["white", "white", "white"];

var numberOfSections;
class App extends React.Component {
    
  constructor(props) {
    super(props);
    
    numberOfSections = Array.from(Array(this.props.numberOfSections).keys())
    
    this.state = {
      sectionsColor: [...originalColors],
      fullpages: [
        {
          text: "section 1"
        },
        {
          text: "section 2"
        }
      ]
    };
  }

  onLeave(origin, destination, direction) {
    // console.log("onLeave", { origin, destination, direction });
    this.props.currentSection(destination.index);
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }


  render() {
    const { fullpages } = this.state;

    if (!fullpages.length) {
      return null;
    }

    const Menu = () => (
      <div
        className="menu"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 100
        }}
      >
      </div>
    );

    return (
      <div className="App">
        <Menu />
        <ReactFullpage
          onLeave={this.onLeave.bind(this)}
          sectionsColor={this.state.sectionsColor}
          render={comp =>
            console.log() || (
              <ReactFullpage.Wrapper>
                {numberOfSections.map(({ text }) => (
                  <div key={text} className="section">
                    <h1></h1>
                  </div>
                ))}
              </ReactFullpage.Wrapper>
            )
          }
        />
      </div>
    );
  }
}

export default App;
