import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggler from '../../components/Navigation/MenuToggler/MenuToggler'
import Drawer from '../../components/Navigation/Drawer/Drawer'

export default class Layout extends Component {
    state = {
        menu: false
    }

    ToggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                />
                <MenuToggler
                    onToggle={this.ToggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}