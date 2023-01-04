import {describe, test, expect, afterEach} from "vitest";
import {render, screen, cleanup} from "@testing-library/react";
import React from "react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {WeHeader} from "./WeHeader";
import {UserContextProvider} from "../../context/UserContext";
import {PATHS} from "../../config/paths";

describe("WeButton general tests", () => {

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

});
