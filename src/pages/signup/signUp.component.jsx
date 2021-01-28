import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth, currentUserProfile } from '../../firebase/firebase.utilis';
import { connect } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selector';
import { Redirect } from 'react-router';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ user }) => {
    const [userCredentials, setUserCredentials] = useState({ firstName: '', lastName: '', email: '', password: '', confirmedPassword: '', grade: '', group: '' });
    const { firstName, lastName, email, password, confirmedPassword, grade, group } = userCredentials;
    const [signUp, setsignUp] = useState(false);
    const classes = useStyles();


    const handleChange = e => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            alert("passwords don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await currentUserProfile(user, { firstName, lastName, grade, group });

            setUserCredentials({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmedPassword: '',
                grade: '',
                group: ''
            });
        } catch (error) {
            setsignUp(false)
            console.error(error);
        }

    }
    if (user) {
        console.log(user)
        return <Redirect to='/' />
    }


    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='firstName'
                                    autoComplete="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name='lastName'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="lname"
                                    value={lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='email'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='password'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='confirmedPassword'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="confirmed Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={confirmedPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='grade'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="grade"
                                    label="Grade"
                                    autoFocus
                                    value={grade}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name='group'
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="grade"
                                    label="Group"
                                    autoFocus
                                    value={group}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => setsignUp(true)}
                        >
                            {signUp ? 'creating account...' : 'sign up'}
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container >
        </>
    );
}

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})

export default connect(mapStateToProps)(SignUp);