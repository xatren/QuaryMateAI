import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCloudSun, faNewspaper, faChartLine, faComments } from '@fortawesome/free-solid-svg-icons';


const AppLayout = ({ activeTab, handleKeyPress ,setActiveTab, inputValue, setInputValue, handleSend, renderPage }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <h1 className="text-2xl font-bold text-center mb-4">AI Assistant for API Integration</h1>
                <div className="flex justify-between mb-4">
                    <button 
                        onClick={() => setActiveTab('Chat')} 
                        className={`flex-1 py-2 px-4 text-center rounded-l-lg ${activeTab === 'Chat' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faComments} /> Chat
                    </button>
                    <button 
                        onClick={() => setActiveTab('Weather')} 
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'Weather' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faCloudSun} /> Weather
                    </button>
                    <button 
                        onClick={() => setActiveTab('News')} 
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'News' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faNewspaper} /> News
                    </button>
                    <button 
                        onClick={() => setActiveTab('Stocks')} 
                        className={`flex-1 py-2 px-4 text-center rounded-r-lg ${activeTab === 'Stocks' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faChartLine} /> Stocks
                    </button>
                </div>
                <div className="flex-1 overflow-auto border rounded-lg bg-gray-50 p-4 mb-4">
                    {renderPage()}
                </div>
                <div className="flex items-center mt-4">
                    
                    
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}  // Trigger handleSend on Enter key press
                        placeholder="Ask about weather, news, or stocks..." 
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-orange-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AppLayout;
