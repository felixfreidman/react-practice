import React, { Component } from 'react'
import classes from './Drawer.module.css'
import { Backdrop } from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Quiz List' },
    { to: '/auth', label: 'Authentication' },
    { to: '/quiz-creator', label: 'Create Quiz' },
]

export default class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        className={({ isActive }) => {
                            const linkClasses = [classes.Drawer];
                            if (isActive) linkClasses.push(classes.active);
                            return linkClasses.join(" ");

                        }}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li >
            )
        })
    }

    render() {

        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>
        )
    }
}
