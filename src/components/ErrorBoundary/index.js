import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Оновлюємо стан, щоб наступний рендер показав запасний UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Ви також можете передати помилку в службу звітування про помилки
        console.log('Error: ' + error);
    }

    render() {
        if (this.state.hasError) {
            // Ви можете відрендерити будь-який власний запасний UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
