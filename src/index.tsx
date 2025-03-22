import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      {/* <Router basename="/project/prime-estate"> */}
      <Router>
        <App />
      </Router>
      </QueryClientProvider>
  </React.StrictMode>
);