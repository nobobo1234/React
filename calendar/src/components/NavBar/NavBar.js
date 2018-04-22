import React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import { Add, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    }
};

const navBar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="title"
                        color="inherit"
                        className={classes.flex}>
                        Noah's planner
                    </Typography>
                    <IconButton component={Link} to="/" color="inherit">
                        <Home />
                    </IconButton>
                    <IconButton component={Link} to="/add" color="inherit">
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(navBar);
