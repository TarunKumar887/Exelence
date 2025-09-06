import React, { useState } from 'react';
import Loading from './loading';
import { useTheme } from '../Context/themeContext';
import api from "../utils/api"; // ✅ axios instance pointing to your backend

const AIresponse = ({ data }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { isDark } = useTheme();

    // Format markdown-like AI response text into HTML
    const formatSummaryText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic
            .replace(/^\d+\.\s+(.*$)/gm, '<li>$1</li>') // numbered list
            .replace(/^-\s+(.*$)/gm, '<li>$1</li>') // bullet list
            .split('\n\n')
            .map(paragraph => {
                if (paragraph.startsWith('<li>') || paragraph.includes('<li>')) {
                    return `<ul>${paragraph}</ul>`;
                }
                return `<p>${paragraph}</p>`;
            })
            .join('');
    };

    const generateSummary = async () => {
        if (!data || Object.keys(data).length === 0) {
            setError('No data provided for analysis');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSummary('');

        try {
            // ✅ Send parsed data to backend API
            const res = await api.post("/files/summary", {
                text: JSON.stringify(data, null, 2),
            });

            if (res.data && res.data.summary) {
                setSummary(res.data.summary);
                setIsPanelOpen(true);
            } else {
                setError('Unexpected response from backend');
            }
        } catch (error) {
            console.error('Summary generation error:', error);
            setError(error.response?.data?.error || error.message || 'Failed to generate summary');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Floating action button */}
            <button
                onClick={togglePanel}
                className={`px-6 py-3 md:text-xl text-lg fixed left-2 bottom-2 z-30 rounded-lg shadow-lg transition-all duration-300 ${
                    isPanelOpen 
                        ? isDark 
                            ? 'bg-gray-600 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        : isDark 
                            ? 'bg-blue-700 text-white hover:bg-blue-800' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                {isPanelOpen ? "Hide Summary" : "Summarize by AI"}
            </button>

            {/* Slide-up panel */}
            <div
                className={`fixed left-0 w-screen bottom-0 shadow-xl rounded-t-2xl transition-all duration-300 transform ${
                    isPanelOpen ? 'translate-y-0' : 'translate-y-full'
                } ${isDark ? 'bg-gray-700/90 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'}`}
                style={{ height: '65vh' }}
            >
                <div className="h-full flex flex-col">
                    {/* Panel header */}
                    <div
                        className={`p-4 border-b flex justify-between items-center ${
                            isDark ? 'border-gray-600' : 'border-gray-200'
                        }`}
                    >
                        <h3
                            className={`text-lg font-semibold ${
                                isDark ? 'text-white' : 'text-gray-800'
                            }`}
                        >
                            AI Data Summary
                        </h3>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 pb-20">
                        {!summary && !isLoading && !error && (
                            <div
                                className={`h-full flex flex-col items-center justify-center text-center ${
                                    isDark ? 'text-gray-200' : 'text-gray-700'
                                }`}
                            >
                                <p className="mt-2 text-sm">
                                    Click the button below to generate insights from your data
                                </p>
                                <button
                                    className={`mt-4 px-6 py-2 rounded-lg transition-colors disabled:bg-gray-400 ${
                                        isDark ? 'bg-green-700 text-white' : 'bg-green-600 text-white'
                                    }`}
                                    onClick={generateSummary}
                                    disabled={!data || Object.keys(data).length === 0}
                                >
                                    Generate Summary
                                </button>
                            </div>
                        )}

                        {isLoading && (
                            <div className="h-full flex items-center justify-center">
                                <Loading />
                                <span className="ml-2">Generating summary...</span>
                            </div>
                        )}

                        {error && (
                            <div
                                className={`p-4 rounded-lg ${
                                    isDark
                                        ? 'bg-red-900/50 text-red-200'
                                        : 'bg-red-50 text-red-600'
                                }`}
                            >
                                <p>{error}</p>
                                <button
                                    className={`mt-2 px-4 py-1 rounded ${
                                        isDark
                                            ? 'bg-red-800/50 hover:bg-red-800'
                                            : 'bg-red-100 hover:bg-red-200'
                                    }`}
                                    onClick={generateSummary}
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {summary && (
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h2
                                        className={`text-xl font-bold ${
                                            isDark ? 'text-white' : 'text-gray-800'
                                        }`}
                                    >
                                        Analysis Results
                                    </h2>
                                    <button
                                        onClick={generateSummary}
                                        className={`px-3 py-1 rounded text-sm ${
                                            isDark
                                                ? 'bg-gray-600 text-gray-200'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        Regenerate
                                    </button>
                                </div>
                                <div
                                    className={`prose max-w-none flex-1 overflow-y-auto ${
                                        isDark ? 'text-gray-200' : 'text-gray-800'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: formatSummaryText(summary),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIresponse;
