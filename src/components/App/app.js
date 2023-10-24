import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
    BrowserRouter as HashRouter,
    Routes,
    Route,
} from "react-router-dom";

import { open } from '../../utils/indexdb';
import Home from '../Home';
import About from '../About';
import Settings from '../Settings';
import Statistics from '../Statistics';
import Header from '../Header';


import { Wrapper, GlobalStyle, Container } from './styles';



// const Statistics = lazy(() => import('../Statistics'));

function App() {
    const [loading, setLoading] = useState(true);
    const [headerData, setHeaderData] = useState(null);

    const handleHeaderDataChange = (data) => {
        // Оновлюємо дані з Header
        setHeaderData(data);
    }

    useEffect(() => {
        open()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                console.error('Помилка');
            });
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <HashRouter basename="budget">
            <Wrapper>
                <Container>
                    <GlobalStyle />
                    <Header
                        onChange={handleHeaderDataChange}//!
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                path="/"
                                element={<Home
                                    headerData={headerData}//!
                                    setHeaderData={setHeaderData}//!
                                />}
                            />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </Suspense>
                </Container>
            </Wrapper>
        </HashRouter>
    );
}

export default App;
/*
<Route path="/" element={<Home />} />
<Route path="statistics/*" element={<Statistics />} />
<Route path="about/*" element={<About />} />
<Route path="settings/*" element={<Settings />} />
*/