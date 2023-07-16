import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe('<Greeting /> component', () => {
    test('renders My My My as a text', () => {
        // arrange
        render(<Greeting />);
    
        // Act
        // nothing at the moment
    
        // Assert
        const greetingElement = screen.getByText(/my my my/i);
        expect(greetingElement).toBeInTheDocument();
    });
    test('renders "Not Changed" if button was not clicked', () => {
        // arrange
        render(<Greeting />);
    
        // Act
        // nothing at the moment
    
        // Assert
        const notChangedElement = screen.getByText('Not Changed', {exact: false});
        expect(notChangedElement).toBeInTheDocument();
    });
    test('renders "Changed" if button was clicked', () => {
        // arrange
        render(<Greeting />);
    
        // Act
        const buttonClickElement = screen.getByRole('button');
        userEvent.click(buttonClickElement)
    
        // Assert
        const notChangedElement = screen.getByText('Changed', {exact: false});
        expect(notChangedElement).toBeInTheDocument();
    });
    test('does not render "Not Changed" if button was clicked', () => {
        // arrange
        render(<Greeting />);
    
        // Act
        const buttonClickElement = screen.getByRole('button');
        userEvent.click(buttonClickElement)
    
        // Assert
        const ChangedElement = screen.queryByText('Not Changed', {exact: false});
        expect(ChangedElement).toBeNull();
    });
});
