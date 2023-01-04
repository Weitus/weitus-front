import {UserContextProvider, useUserContext} from "./UserContext";
import {describe, test, expect, afterEach} from "vitest";
import {cleanup, renderHook} from "@testing-library/react";
import React from "react";

describe("WeButton general tests", () => {

    afterEach(() => {
        cleanup();
    })

    test("App Context hook throws error without context provider", () => {
        expect(() => renderHook(useUserContext))
            .toThrow(Error("useAppContext used without AppContextProvider!"))
    });

});
