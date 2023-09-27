import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { open } from '../../utils/indexdb';
import Home from '../Home';
import About from '../About';
import Settings from '../Settings';
// import Statistics from '../Statistics';
import Header from '../Header';

import { Wrapper, GlobalStyle } from './styles';

const Statistics = lazy(() => import('../Statistics'));

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        open().then(() => {
            this.setState({
                loading: false
            })
        }).catch(() => {
            console.error('Помилка')
        });
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>
        };

        return (
            <Router basename='budget'>
                <Wrapper>
                    <GlobalStyle />

                    <Header />

                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </Suspense>
                </Wrapper>
            </Router>
        )
    }

}

export default App;
/*
<Route path="/" element={<Home />} />
<Route path="statistics/*" element={<Statistics />} />
<Route path="about/*" element={<About />} />
<Route path="settings/*" element={<Settings />} />
*/