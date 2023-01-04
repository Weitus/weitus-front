import {describe, test, expect, beforeEach, afterEach} from "vitest";
import {render, screen, cleanup, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import {WeLinkButton} from "./WeLinkButton";
import {PATHS} from "../../config/paths";
import {MemoryRouter} from "react-router-dom";

describe("WeButton general tests", () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <WeLinkButton linkProps={{to: PATHS.home}}>Click me</WeLinkButton>
            </MemoryRouter>
        );
    })

    afterEach(() => {
        cleanup();
    })

    test("Child text renders", () => {
        expect(screen.getByText(/Click me/i)).toBeDefined();
    });

});
