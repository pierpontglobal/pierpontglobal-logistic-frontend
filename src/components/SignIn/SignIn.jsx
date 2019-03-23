import React, { Component } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
    loginButton: {
      width: '100%',
      minWidth: '320px'
    },
  };

const SignInWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
`;

const LoginForm = styled.div`
    align-self: center;
    justify-self: center;
`;

class SignIn extends Component {
    render() {
        const { classes } = this.props;
        return(
            <SignInWrapper>
                <LoginForm>
                    <Card>
                        <CardContent>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                <span>Pierpont Logistics Login</span>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.loginButton} size='small'>Login</Button>
                        </CardActions>
                    </Card>
                </LoginForm>
            </SignInWrapper>
        );
    }
}

export default withStyles(styles)(SignIn);