import {describe, test, expect, afterEach} from "vitest";
import {render, screen, cleanup, fireEvent, renderHook, act} from "@testing-library/react";
import React from "react";
import {MemoryRouter, Route, Routes, useLocation} from "react-router-dom";
import {WeHeader} from "./WeHeader";
import {UserContextProvider, useUserContext} from "../../context/UserContext";
import {PATHS} from "../../config/paths";

function ShowLocation() {
    let location = useLocation();
    return <WeHeader key={location.pathname}/>
}

describe("WeHeader general tests", () => {

    afterEach(() => {
        cleanup();
    })

    test("Header renders", () => {
        render(
            <UserContextProvider>
                <MemoryRouter>
                    <WeHeader/>
                </MemoryRouter>
            </UserContextProvider>
        );

        const header = screen.getByTestId("header")
        expect(header).toBeDefined();
    });

    test("Default header renders properly", () => {
        render(
            <UserContextProvider>
                <MemoryRouter initialEntries={["/test-path"]}>
                    <Routes>
                        <Route path={"/test-path"} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
            </UserContextProvider>
        );

        const header = screen.getByTestId("header")
        expect(header).toBeDefined();
        expect(screen.queryByText(/Login/i)).toBeNull()
        expect(screen.queryByRole("button")).toBeNull()
    });

    test("Header renders login button on chat page and doesn't render back button", () => {
        render(
            <UserContextProvider>
                <MemoryRouter initialEntries={[PATHS.chat]}>
                    <Routes>
                        <Route path={PATHS.chat} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
            </UserContextProvider>
        );


        expect(screen.queryByText(/Login/i)).toBeDefined();
        expect(screen.queryByRole("svg")).toBeNull();
    });

    test("Header renders back button doesn't render login button on login page", () => {
        render(
            <UserContextProvider>
                <MemoryRouter initialEntries={[PATHS.login]}>
                    <Routes>
                        <Route path={PATHS.login} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
            </UserContextProvider>
        );

        expect(screen.queryByText(/Login/i)).toBeNull();
        expect(screen.queryByRole("svg")).toBeDefined();
    });

    test("Header redirect works correctly (chat -> login -> home)", () => {
        render(
            <UserContextProvider>
                <MemoryRouter initialEntries={[PATHS.chat]}>
                    <Routes>
                        <Route path={PATHS.login} element={<ShowLocation/>}/>
                        <Route path={PATHS.chat} element={<ShowLocation/>}/>
                        <Route path={PATHS.home} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
            </UserContextProvider>
        );

        // Chat page
        expect(screen.queryByText(/Login/i)).toBeDefined();
        expect(screen.queryByRole("svg")).toBeNull();
        const loginButton = screen.getByText(/Login/i);
        fireEvent.click(loginButton);

        // Login page
        expect(screen.queryByText(/Login/i)).toBeNull();
        expect(screen.queryByRole("svg")).toBeDefined();
        const backButton = screen.getByRole("button");
        fireEvent.click(backButton);

        // Home page
        expect(screen.queryByText(/Login/i)).toBeNull();
        expect(screen.queryByRole("svg")).toBeNull();
    });

    test("Header redirect works correctly (register -> login -> home)", () => {
        render(
            <UserContextProvider>
                <MemoryRouter initialEntries={[PATHS.signup]}>
                    <Routes>
                        <Route path={PATHS.login} element={<ShowLocation/>}/>
                        <Route path={PATHS.signup} element={<ShowLocation/>}/>
                        <Route path={PATHS.home} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
            </UserContextProvider>
        );

        // Register page
        expect(screen.queryByRole("svg")).toBeDefined();
        const backButton = screen.getByRole("button");
        fireEvent.click(backButton);

        // Login page
        expect(screen.queryByRole("svg")).toBeDefined();
        const backButton2 = screen.getByRole("button");
        fireEvent.click(backButton2);

        // Home page
        expect(screen.queryByText(/Login/i)).toBeNull();
        expect(screen.queryByRole("svg")).toBeNull();
    });


    test("Logout button works correctly", () => {

        const wrapper = ({children}: React.PropsWithChildren<{}>) => (
            <UserContextProvider>
                <MemoryRouter initialEntries={[PATHS.chat]}>
                    <Routes>
                        <Route path={PATHS.chat} element={<ShowLocation/>}/>
                        <Route path={PATHS.login} element={<ShowLocation/>}/>
                    </Routes>
                </MemoryRouter>
                {children}
            </UserContextProvider>
        )

        const {result} = renderHook(() => useUserContext(), {wrapper})

        act(() => {
            result.current.setIsLoggedIn(true)
        })
        expect(result.current.isLoggedIn).toBe(true);

        expect(screen.getByText(/Logout/i)).toBeDefined();
        const logoutButton = screen.getByText(/Logout/i);
        fireEvent.click(logoutButton);
        expect(result.current.isLoggedIn).toBe(false);
    });

});
