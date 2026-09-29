import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.js";



const Providers = ({ children }) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers;
