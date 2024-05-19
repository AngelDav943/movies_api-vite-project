import { createContext, useContext, useEffect, useState } from "react";

const infoContext = createContext()

export const useInfo = () => {
    return useContext(infoContext)
}

const API_KEY = import.meta.env["VITE_API_KEY"];

export function InfoProvider({ children }) {

    const exportUtils = {
        fetchWeb: async (path = "/", init = null) => {
            init = init || { method: "GET", headers: null, data: null }

            const { method, headers, data } = init;

            var fetchMethod = String(method).toUpperCase();
            const allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
            if (allowedMethods.indexOf(fetchMethod) == -1) fetchMethod = "GET"

            const body = data != null ? { body: JSON.stringify(data) } : null
            const contentType = data != null ? { "Content-Type": "application/json" } : null

            try {
                var fetchedData = await fetch(`https://api.themoviedb.org/3${path}&api_key=${API_KEY}`, {
                    method: fetchMethod,
                    headers: { ...contentType, ...headers },
                    ...body
                })

                const response = await fetchedData.json();
                /*if (response["msg"]) {
                    setErrorMessage(response["msg"])
                    return null;
                }*/

                return response;
            } catch (error) {
                setErrorMessage(`${String(error)}; client error`)
            }

            return null;
        },
    }

    return (
        <infoContext.Provider value={{ ...exportUtils }}>
            {children}
        </infoContext.Provider>
    )
}