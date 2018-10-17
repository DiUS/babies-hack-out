import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Train from './Train'
import Play from './Play'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
function Main(props) {
  console.log(props.classifier);
  return (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/train' component={Train} classifier={props.classifier} />
      <Route path='/play' component={Play} classifier={props.classifier} />
    </Switch>
  </main>
  );
}

export default Main
