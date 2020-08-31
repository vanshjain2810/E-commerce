import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ShopPage from './pages/Shop/Shop.component';
import HomePage from './pages/homepage/homepage-compo';
import Header from './Components/Header/Header-Component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up-component'
import {auth, createUserProfileDocument} from './firebase/firebase.util';
import './App.css';
import {setCurrentUser} from './redux/user/user-actions';



class App extends React.Component {
  

unsubscribeFromAuth = null


componentDidMount() {

  
const {setCurrentUser} =this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
  if(userAuth) {
    const userRef = await createUserProfileDocument(userAuth);

    userRef.onSnapshot(snapShot => {
        setCurrentUser ({
          id: snapShot.id,
          ...snapShot.data()
        });
        
      });
     
    }
  
  setCurrentUser(userAuth);
});
}

componentWillUnmount(){
  this.unsubscribeFromAuth();
}
  render() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop/hats' component={ShopPage} />
        <Route exact
         path='/signin'
        render={()=> 
        this.props.currentUser ? (
        <Redirect to='/' />
        ): (
          <SignInSignUp />
        )}
        />
        
      </Switch>
      
    
    </div>
  );
}}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps 
  )(App);
