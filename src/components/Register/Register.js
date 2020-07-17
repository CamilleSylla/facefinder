import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <article class="pa4 black-80">
    <div action="sign-up_submit" method="get" accept-charset="utf-8">
        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
        <div class="mt3">
            <label class="db fw4 lh-copy f6" htmlFor="name">Name</label>
            <input 
            onChange={this.onNameChange}
            class="b pa2 input-reset ba bg-transparent" 
            type="text" 
            name="name"  
            id="name"/>
        </div>
        <div class="mt3">
            <label class="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
            <input 
            onChange={this.onEmailChange}
            class="pa2 input-reset ba bg-transparent w-100 measure" 
            type="email" 
            name="email-address"  
            id="email-address" />
        </div>
        <div class="mt3">
            <label class="db fw4 lh-copy f6" htmlFor="password">Password</label>
            <input 
            onChange={this.onPasswordChange}
            class="b pa2 input-reset ba bg-transparent" 
            type="password" 
            name="password"  
            id="password"/>
        </div>
        </fieldset>
        <div class="mt3"><input onClick={this.onSubmitSignIn} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" /></div>
    </div>
    </article>
    </article>
    );
    }
    
} 

export default Register;