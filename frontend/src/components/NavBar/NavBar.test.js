import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
    it('renders navigation links', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );

        expect(screen.getByText('School Management')).toBeInTheDocument();
        expect(screen.getByText('Teachers')).toBeInTheDocument();
        expect(screen.getByText('Classes')).toBeInTheDocument();
    });

    it('contains the SchoolOutlined icon', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );

        // The icon is rendered as an SVG with a title "SchoolOutlined"
        expect(screen.getByTitle('SchoolOutlined')).toBeInTheDocument();
    });
});