import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import Markets from "./pages/Markets";
import News from "./pages/News";
import Profile from "./pages/Profile";
import NotFound from "./NotFound";
import TransactionHistory from "./pages/TransactionHistory";
import AiInsightsPage from "./pages/AiInsights";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/portfolio"
                    element={
                        <ProtectedRoute>
                            <Portfolio />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/watchlist"
                    element={
                        <ProtectedRoute>
                            <Watchlist />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/markets"
                    element={
                        <ProtectedRoute>
                            <Markets />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/news"
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai"
                    element={
                        <ProtectedRoute>
                            <AiInsightsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <TransactionHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;