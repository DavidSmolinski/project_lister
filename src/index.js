import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import react_logo from './assets/react_logo.png';
import vue_logo from './assets/vue_logo.png';
import head from './assets/head.png';
import * as serviceWorker from './serviceWorker';
import { main_state } from './main_state';
import { numpy as np } from './python.js';


class Skill extends Component {
  render() {
    const { name, on } = this.props.skill
    const on_skill_style = { backgroundColor: '#e67244' }
    const off_skill_style = { backgroundColor: 'white' }
    const skill_style = on ? on_skill_style : off_skill_style
    return (
      <span
        className="checkbox"
        style={skill_style}
        onClick={() => this.props.onClick()}
      >
        <label className="task-label">
          {name}
        </label>
      </span>
    )
  }
}


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = main_state
    this.state.projects_to_show = []
    // In this array, Indices correspond to projects, and elements are the
    // number of "on skills" (skills chosen by the user) for each project.
    this.state.projects_on = Array(this.state.skills_projects[0].length).fill(0)
  }

  handleClick(i) {
    const skills = this.state.skills.slice()
    let projects_on = this.state.projects_on.slice();
    const skills_projects = this.state.skills_projects.slice();
    let projects_to_show = this.state.projects_to_show.slice();

    skills[i].on = !skills[i].on;
    if (skills[i].on) {
      projects_on = np.add(projects_on, skills_projects[i])
    } else {
      projects_on = np.subtract(projects_on, skills_projects[i])
    }

    let make_projects_to_show = (projects_on) => (
      // Return an arr of project indices in the order that they will be shown.
      projects_on
        .map((e, i) => [e, i])
        .filter(e => e[0] !== 0)
        .sort((a, b) => b[0] - a[0])
        .map((e) => e[1])
    )

    projects_to_show = make_projects_to_show(projects_on)

    this.setState({
      skills: skills, projects_on: projects_on,
      projects_to_show: projects_to_show
    });
  }

  renderSkill(i) {
    return (
      <Skill
        skill={this.state.skills[i]}
        projects_to_show={this.state.projects_to_show}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderSkills() {
    return this.state.skills.map((e, i) => this.renderSkill(i))
  }

  renderProj(i) {
    let { name, } = this.state.projects[i]
    let projects_to_show = this.state.projects_to_show
    let projects_on = this.state.projects_on

    let max_skills_proj = projects_to_show[0]
    let min_skills_proj = projects_to_show[projects_to_show.length - 1]

    let max_skills = projects_on[max_skills_proj]
    let min_skills = projects_on[min_skills_proj]
    let delta_skills = max_skills - min_skills
    let proj_skills = projects_on[i]

    let color_inc = delta_skills === 0 ? 255 : 255 / delta_skills
    let proj_color = 255 - Math.floor(color_inc * (proj_skills - min_skills))
    let style = { backgroundColor: `rgb(${proj_color}, 255, ${proj_color})` }
    return (
      <span
        className="checkbox"
        style={style}
      >
        <label className="task-label">
          {proj_skills}: {name}
        </label>
      </span>
    );
  }

  renderProjs() {
    let projs_arr = this.state.projects_to_show
    return projs_arr.map((e) => this.renderProj(e))
  }

  render() {
    return (
      <>
        <div className="container">

          <div className="title text-center">
            <h2>
              <img src={head} className="App-logo" alt="head" />
              Portfolio Lister
              <img src={react_logo} className="App-logo" alt="logo" />
            </h2>
          </div>
          <div className="jumbo-heading">
            <h6 className="date">by David Smolinski</h6>
          </div>
          {/* <div className="jumbotron">
            <p>
              This app is made with ReactJS and JavaScript. It will allow users to select code skills
              (languages, modules, etc.) in my portfolio,
              and view projects that use those skills. For now, I'm using dummy data for skills and projects. <a
                href="https://github.com/DavidSmolinski/portfolio/tree/master/table%20of%20contents">
                View my code portfolio here.</a>
            </p>
            <p>Instructions:</p>
            <p>
              Click on skills to select or unselect them. Selected skills are highlighted orange. A list of projects
              with at least one of the selected skills will be shown. The number of selected skills (n.s. skills)
              a project uses is listed before its name. The list is ordered by the n.s. skills each project uses.
              When there is a difference in the n.s. skills per project, these differences are shown with green
              highlighting. Projects with more selected skills are greener.
            </p>
          </div> */}
          
          
          <div className="jumbotron">
            This app is made with ReactJS and JavaScript. It will allow users to
            select code skills (languages, modules, etc.) in my portfolio, and view
            projects that use those skills. For now, I'm using dummy data for skills
            and projects.
          </div>

          <div className="jumbo-heading">
            <h6 className="date">Links</h6>
          </div>

          <div className="jumbotron links">
            <a
              className="checkbox_link"
              href="https://davidsmolinski.github.io/project_lister_vue/"
            >
              <span>
                <label>
                  <img
                    src={vue_logo}
                    className="App-logo-still"
                    alt="vue_logo"
                  />
                  Vue version
                </label>
              </span>
            </a>
            <a
              className="checkbox_link"
              href="https://github.com/DavidSmolinski/project_lister_vue/tree/master"
            >
              <span>
                <label>
                  <img
                    src={vue_logo}
                    className="App-logo-still"
                    alt="vue_logo"
                  />
                  Vue code
                </label>
              </span>
            </a>
            <a
              className="checkbox_link"
              href="https://github.com/DavidSmolinski/portfolio/tree/master/table%20of%20contents"
            >
              <span>
                <label>
                  my code portfolio
                </label>
              </span>
            </a>
          </div>

          <div className="jumbo-heading">
            <h6 className="date">Instructions</h6>
          </div>
          <div className="jumbotron">
            Click on skills to select or unselect them. Selected skills are
            highlighted orange. A list of projects with at least one of the selected
            skills will be shown. The number of selected skills (n.s. skills) a
            project uses is listed before its name. The list is ordered by the n.s.
            skills each project uses. When there is a difference in the n.s. skills
            per project, these differences are shown with green highlighting.
            Projects with more selected skills are greener.
          </div>
          
          

          <div className="jumbo-heading">
            <h6 className="date">code skills</h6>
          </div>
          <div className="jumbotron">
            {this.renderSkills()}
          </div>

          <div className="jumbo-heading">
            <h6 className="date">projects with the selected skills</h6>
          </div>
          <div className="jumbotron">
            {this.renderProjs()}
          </div>

        </div>
      </>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
