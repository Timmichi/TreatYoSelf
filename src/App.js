import React, { Component } from "react";
import { render } from "react-dom";

// react alerts: https://www.npmjs.com/package/react-alert
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Using HashRouter so reloading don't look into backend
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Portal } from "react-portal";
import Cookies from "js-cookie"
import axios from "axios";

import './App.css';
import Navbar from "./components/navbar/Navbar";
import Landing from "./components/home/home_components/Landing/Landing";
import Overview from "./components/home/home_components/Overview/Overview";
import Register from "./components/register/Register";
import Total from "./components/total/Total";
import All_Transactions from "./components/all_transactions/All_Transactions"
import Create_Transaction from "./components/create_transaction/Create_Transaction";
import Update_Transaction from "./components/update_transaction/Update_Transaction";
import Category from "./components/category/Category";
import Analytics from "./components/analytics/Analytics";
import RightComponent from "./components/rightComponent/RightComponent";
import UserForm from "./components/userForm/userForm";
import Contact from "./components/contact/Contact";



// Notes: Need to figure out how to login in before rendering components.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      isLoggedIn: false,
      loadPage: null,
      totalAmount: 0,


      totalObject: "",
      monthlySpent: "",
      monthlyGained: "",
      monthYearDate: "",
      categoryObj: "",
    };
    this.options = {
      // you can also just use 'bottom center'
      position: positions.TOP_CENTER,
      timeout: 5000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.SCALE
    }
    this.nextPath = this.nextPath.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.deleteLogin = this.deleteLogin.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

  }

  nextPath = (path) => {
    this.props.history.push(path);
  };

  setLogin = (res) => {
    this.setState({
      username: res.data.user.username,
      firstname: res.data.user.first_name,
      lastname: res.data.user.last_name,
      isLoggedIn: true
    })
  };

  deleteLogin = () => {
    this.setState({
      username: "",
      firstname: "",
      lastname: "",
      isLoggedIn: false
    })
  };

  getName = () => {
    axios.get("/api/auth/user", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${Cookies.get("token")}`
      }
    })
      .then(res => {
        console.log("this get name is called")
        this.setState({
          username: res.data.username,
          firstname: res.data.first_name,
          lastname: res.data.last_name,
        });
      })
      .catch(err => {
        console.log("getName" + err)
      })
  }

  getCatRightComponent = () => {
    if (Cookies.get("token")) {
      console.log("getCatRightComponent is being called")
      axios.get(`/api/total/get`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("token")}`
        }
      })
        .then(res => {
          let profileObj = res.data[0];
          //figure out how to get monthly to object
          let date = new Date();
          let thisMonthYear = `${date.getMonth() + 1}${date.getFullYear()}`;
          //let rep = profileObj.monthly_data.replace(/\'/g, "\"");
          //let monthData = JSON.parse(profileObj.monthly_data);
          this.setState({
            totalObject: profileObj,
            totalAmount: profileObj.total_amount,
            monthlySpent: profileObj.monthly_data[thisMonthYear]['monthly_spent'],
            monthlyGained: profileObj.monthly_data[thisMonthYear]['monthly_gained'],
            monthYearDate: parseInt(thisMonthYear),
          });
        })
        .catch(err => {
          console.log("total get error: " + err)
        })
      // get categories
      axios.get("budget/category/get/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("token")}`
        }
      })
        .then(res => {
          this.setState({
            categoryObj: res.data[0],
            loading: false,
          });
        })
        .catch(err => {
          console.log("category get error: " + err)
        })
    }

  }


  checkLogin = () => {
    if (Cookies.get("token") && !this.state.isLoggedIn) {
      console.log("Cookie has been found and User is not logged in")
      axios.get("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("token")}`
        }
      })
        .then(res => {
          this.setState({
            username: res.data.username,
            firstname: res.data.first_name,
            lastname: res.data.last_name,
            isLoggedIn: true,
            loadPage: true
          });
          console.log("CheckLogin: User has Logged In (App)")
        })
        .catch(err => {
          console.log("Checking Logged In Error" + err)
          this.setState({
            loadPage: true,
            isLoggedIn: false
          })
        })
    } else {
      this.setState({
        loadPage: true
      })
    }
  };

  getTotalAmount = () => {
    if (Cookies.get("token")) {
      console.log("getTotalAmount")
      axios.get(`/api/total/get`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${Cookies.get("token")}`
        }
      })
        .then(res => {
          let profileObj = res.data[0];
          this.setState({
            totalAmount: profileObj.total_amount,
          });
        })
        .catch(err => {
          console.log("total get error: " + err)
        })
    }

  }

  componentDidMount = () => {
    console.log("App Component componentDidMount");
    this.checkLogin();
    this.getTotalAmount();
    this.getCatRightComponent()
  };


  // Maybe we can use private routes
  render() {
    console.log("App Rendering")
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let monthName = monthNames[month];


    // fix this, when reload page, component did mount does not get called
    // so the page stays blank
    if (!this.state.loadPage) {
      return <div>Loading . . .</div>
    }
    return (
      <AlertProvider template={AlertTemplate} {...this.options}>
        <Router>
          <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet"></link>
          {console.log("App Component Render")}
          {this.state.isLoggedIn === false ?
            <React.Fragment>
              <Switch>
                <Route exact path="/" render={props => (
                  <Landing {...props} />
                )} />
                <Route exact path="/register" render={props => (
                  <Register {...props}
                    setLogin={this.setLogin}
                  />
                )} />
                <Route exact path="/login" render={props => (
                  <Login {...props}
                    setLogin={this.setLogin}
                  />
                )} />
                <Route exact path="/contact" render={props => (
                  <Contact {...props}
                    isLoggedIn={this.state.isLoggedIn}
                  />
                )} />
              </Switch>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="appWrapper">
                <Navbar
                  {...this.props}
                  isLoggedIn={this.state.isLoggedIn}
                  username={this.state.username}
                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  nextPath={this.nextPath}
                  deleteLogin={this.deleteLogin}
                  totalAmount={this.state.totalAmount}
                />
                <RightComponent
                  {...this.props}
                  monthName={monthName}
                  totalObject={this.state.totalObject}
                  monthlySpent={this.state.monthlySpent}
                  monthlyGained={this.state.monthlyGained}
                  monthYearDate={this.state.monthYearDate}
                  categoryObj={this.state.categoryObj}

                />
                <div className="main_container">

                  <Switch>
                    <Route exact path="/" render={props => (
                      <Overview {...props}
                        username={this.state.username}
                        isLoggedIn={this.state.isLoggedIn}
                        checkLogin={this.checkLogin}
                        monthName={monthName} />
                    )} />
                    <Route exact path="/budget/all_transactions" render={props => (
                      <All_Transactions {...props}
                        getTotalAmount={this.getTotalAmount}
                        getCatRightComponent={this.getCatRightComponent} />
                    )} />

                    <Route exact path="/budget/create" render={props => (
                      <Create_Transaction {...props}
                        getTotalAmount={this.getTotalAmount}
                        getCatRightComponent={this.getCatRightComponent} />
                    )} />

                    <Route exact path="/budget/update" render={props => (
                      <Update_Transaction {...props}
                        isLoggedIn={this.state.isLoggedIn}
                        getTotalAmount={this.getTotalAmount}
                        getCatRightComponent={this.getCatRightComponent} />
                    )} />

                    <Route path="/register" render={props => (
                      <Register {...props}
                        setLogin={this.setLogin}
                      />
                    )} />

                    <Route path="/total" render={props => (
                      <Total {...props}
                        getTotalAmount={this.getTotalAmount}
                      />
                    )} />
                    <Route path="/analytics" render={props => (
                      <Analytics {...props}
                        year={year}
                      />
                    )} />
                    <Route path="/category" render={props => (
                      <Category {...props}
                        getCatRightComponent={this.getCatRightComponent}
                      />
                    )} />
                    <Route path="/account" render={props => (
                      <UserForm {...props}
                        getName={this.getName}
                      />
                    )} />
                    <Route exact path="/contact" render={props => (
                      <Contact {...props}
                        isLoggedIn={this.state.isLoggedIn}
                      />
                    )} />
                  </Switch>
                </div>
              </div>
            </React.Fragment>
          }
        </Router>
      </AlertProvider >

    )
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
