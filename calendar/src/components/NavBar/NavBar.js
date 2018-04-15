import React from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import { Add } from "@material-ui/icons";

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    }
};

const onClickHandler = () => {
    console.log("test");
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
                    <IconButton color="inherit" onClick={onClickHandler}>
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(navBar);
