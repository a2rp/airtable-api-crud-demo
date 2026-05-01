import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Lazy Pages */
const Home = lazy(() => import("./pages/home"));

/* Loader */
const Loader = () => {
    return (
        <div className="appLoader">
            <div className="spinner"></div>
        </div>
    );
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {/* Main */}
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
