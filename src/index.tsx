import React from 'react';
import ReactDOM from 'react-dom/client';

import 'styles/tailwind.css';
import 'styles/global.css';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		},
	},
});
root.render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</QueryClientProvider>
);
